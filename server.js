const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { LiveChat } = require('youtube-chat');
const tmi = require('tmi.js');
const fs = require('fs');
const path = require('path');

// Local modules
const db = require('./lib/db');
const ratelimit = require('./lib/ratelimit');
const profanity = require('./lib/profanity');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ============================================
// Multi-Language Trigger Words ("idea" in 30+ languages)
// ============================================
const TRIGGER_WORDS = [
    'idea', 'fikir', 'idée', 'idee', 'ideia', 'идея', 'ідея',
    'アイデア', '아이디어', '想法', 'فكرة', 'विचार', 'ایده',
    'pomysł', 'pomysl', 'idé', 'ide', 'nápad', 'napad',
    'ötlet', 'otlet', 'ιδέα', 'ιδεα', 'ไอเดีย',
    'ýtưởng', 'ideya', 'wazo', 'רעיון', 'ধারণা', 'خیال',
    'იდეა', 'fikr', 'санаа', 'gaghapar',
];
const TRIGGER_SET = new Set(TRIGGER_WORDS.map(w => w.toLowerCase()));

/**
 * Extract idea text from a chat message (multi-language trigger)
 */
function extractIdea(message) {
    const lower = message.toLowerCase();
    if (!lower.startsWith('/')) return null;
    const spaceIdx = lower.indexOf(' ');
    if (spaceIdx === -1) return null;
    const command = lower.substring(1, spaceIdx);
    if (TRIGGER_SET.has(command)) {
        const ideaText = message.substring(spaceIdx + 1).trim();
        return ideaText.length > 0 ? ideaText : null;
    }
    return null;
}

// ============================================
// State
// ============================================
let pendingIdeas = [];
let acceptedIdeas = [];
let postitPositions = {};
let seenMessages = new Set();
let nextId = 1;

// Active connections
let liveChat = null;      // YouTube
let twitchClient = null;  // Twitch
let kickWs = null;        // Kick

// Current session
let currentSessionId = null;

// IDEAS FILE (backup)
const ideasFile = path.join(__dirname, 'ideas.txt');

// ============================================
// Unified Idea Processing Pipeline
// ============================================
function processIncomingIdea(message, author, authorImage, platform) {
    const ideaText = extractIdea(message);
    if (!ideaText) return null;

    // 1) Deduplicate
    const msgKey = `${author}:${ideaText}`;
    if (seenMessages.has(msgKey)) return null;

    // 2) Rate limit
    const rl = ratelimit.canSend(author);
    if (!rl.allowed) {
        console.log(`⏱️ Rate limit: @${author} (${rl.resetIn}s kaldı)`);
        return null;
    }

    // 3) Profanity filter
    if (!profanity.isClean(ideaText)) {
        console.log(`🚫 Küfür filtresi: @${author}: "${ideaText}"`);
        return null;
    }

    // All checks passed
    seenMessages.add(msgKey);
    ratelimit.recordMessage(author);

    const idea = {
        id: nextId++,
        author,
        authorImage: authorImage || '',
        text: ideaText,
        platform,
        time: new Date().toLocaleTimeString('tr-TR'),
        status: 'pending'
    };

    // Save to database
    if (currentSessionId) {
        const dbIdea = db.addIdea(currentSessionId, author, authorImage, ideaText, platform, 'pending');
        idea.dbId = dbIdea.id;
    }

    pendingIdeas.push(idea);
    console.log(`💡 [${platform.toUpperCase()}] Yeni fikir: @${author}: ${ideaText}`);
    io.emit('new-idea', idea);

    return idea;
}

// ============================================
// YouTube Chat Connection
// ============================================
async function connectToYouTube(channelIdOrLiveId, isLiveId = false) {
    try {
        if (liveChat) {
            liveChat.stop();
        }

        const options = isLiveId
            ? { liveId: channelIdOrLiveId }
            : { channelId: channelIdOrLiveId };

        liveChat = new LiveChat(options, 250);

        liveChat.on('start', (liveId) => {
            console.log(`✅ YouTube Chat bağlandı! Live ID: ${liveId}`);
            currentSessionId = db.createSession('youtube', liveId, `YouTube Stream`);
            io.emit('status', { connected: true, platform: 'youtube', liveId });
        });

        liveChat.on('end', (reason) => {
            console.log(`❌ YouTube Chat bağlantısı kesildi: ${reason}`);
            if (currentSessionId) db.endSession(currentSessionId);
            io.emit('status', { connected: false, platform: 'youtube', reason });
        });

        liveChat.on('chat', (chatItem) => {
            const message = chatItem.message?.map(m => m.text || '').join('') || '';
            const author = chatItem.author?.name || 'Anonim';
            const authorImage = chatItem.author?.thumbnail?.url || '';
            processIncomingIdea(message, author, authorImage, 'youtube');
        });

        liveChat.on('error', (err) => {
            console.error('YouTube Chat hatası:', err.message);
            io.emit('status', { connected: false, platform: 'youtube', error: err.message });
        });

        const started = await liveChat.start();
        if (!started) {
            console.log('⚠️ Canlı yayın bulunamadı. Test modunda devam ediliyor.');
            io.emit('status', { connected: false, platform: 'youtube', error: 'Canlı yayın bulunamadı' });
        }
    } catch (err) {
        console.error('YouTube bağlantı hatası:', err.message);
        io.emit('status', { connected: false, platform: 'youtube', error: err.message });
    }
}

// ============================================
// Twitch Chat Connection
// ============================================
async function connectToTwitch(channel) {
    try {
        if (twitchClient) {
            await twitchClient.disconnect();
        }

        twitchClient = new tmi.Client({
            options: { debug: false },
            connection: { reconnect: true, secure: true },
            channels: [channel]
        });

        twitchClient.on('connected', () => {
            console.log(`✅ Twitch Chat bağlandı! Kanal: ${channel}`);
            currentSessionId = db.createSession('twitch', channel, `Twitch: ${channel}`);
            io.emit('status', { connected: true, platform: 'twitch', channel });
        });

        twitchClient.on('disconnected', (reason) => {
            console.log(`❌ Twitch Chat bağlantısı kesildi: ${reason}`);
            if (currentSessionId) db.endSession(currentSessionId);
            io.emit('status', { connected: false, platform: 'twitch', reason });
        });

        twitchClient.on('message', (channel, tags, message, self) => {
            if (self) return;
            const author = tags['display-name'] || tags.username || 'Anonim';
            const authorImage = ''; // Twitch doesn't provide avatar in chat
            processIncomingIdea(message, author, authorImage, 'twitch');
        });

        await twitchClient.connect();
    } catch (err) {
        console.error('Twitch bağlantı hatası:', err.message);
        io.emit('status', { connected: false, platform: 'twitch', error: err.message });
    }
}

// ============================================
// Kick Chat Connection (WebSocket / Pusher)
// ============================================
async function connectToKick(channelSlug) {
    try {
        if (kickWs) {
            kickWs.close();
            kickWs = null;
        }

        // Step 1: Get channel info to find chatroom ID
        const channelRes = await fetch(`https://kick.com/api/v2/channels/${channelSlug}`);
        if (!channelRes.ok) {
            throw new Error(`Kick kanal bulunamadı: ${channelSlug}`);
        }
        const channelData = await channelRes.json();
        const chatroomId = channelData.chatroom?.id;

        if (!chatroomId) {
            throw new Error('Chatroom ID bulunamadı');
        }

        console.log(`🟢 Kick chatroom ID: ${chatroomId}`);

        // Step 2: Connect via Pusher WebSocket
        const WebSocket = require('ws');
        const wsUrl = 'wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=7.6.0&flash=false';

        kickWs = new WebSocket(wsUrl);

        kickWs.on('open', () => {
            console.log(`✅ Kick WebSocket bağlandı!`);

            // Subscribe to chatroom channel
            const subscribeMsg = JSON.stringify({
                event: 'pusher:subscribe',
                data: { auth: '', channel: `chatrooms.${chatroomId}.v2` }
            });
            kickWs.send(subscribeMsg);

            currentSessionId = db.createSession('kick', channelSlug, `Kick: ${channelSlug}`);
            io.emit('status', { connected: true, platform: 'kick', channel: channelSlug });
        });

        kickWs.on('message', (raw) => {
            try {
                const data = JSON.parse(raw.toString());
                if (data.event === 'App\\Events\\ChatMessageEvent') {
                    const msgData = JSON.parse(data.data);
                    const author = msgData.sender?.username || 'Anonim';
                    const message = msgData.content || '';
                    processIncomingIdea(message, author, '', 'kick');
                }
            } catch (e) {
                // Ignore parse errors for non-chat events
            }
        });

        kickWs.on('close', () => {
            console.log(`❌ Kick WebSocket bağlantısı kesildi`);
            if (currentSessionId) db.endSession(currentSessionId);
            io.emit('status', { connected: false, platform: 'kick' });
        });

        kickWs.on('error', (err) => {
            console.error('Kick WebSocket hatası:', err.message);
            io.emit('status', { connected: false, platform: 'kick', error: err.message });
        });

    } catch (err) {
        console.error('Kick bağlantı hatası:', err.message);
        io.emit('status', { connected: false, platform: 'kick', error: err.message });
    }
}

// ============================================
// API Routes
// ============================================

// Connect to YouTube
app.post('/api/connect', (req, res) => {
    const { channelId, liveId } = req.body;
    if (liveId) {
        connectToYouTube(liveId, true);
        res.json({ ok: true, message: 'YouTube Live ID ile bağlanılıyor...' });
    } else if (channelId) {
        connectToYouTube(channelId, false);
        res.json({ ok: true, message: 'YouTube Channel ID ile bağlanılıyor...' });
    } else {
        res.json({ ok: false, message: 'channelId veya liveId gerekli' });
    }
});

// Connect to Twitch
app.post('/api/connect-twitch', (req, res) => {
    const { channel } = req.body;
    if (!channel) {
        return res.json({ ok: false, message: 'Twitch kanal adı gerekli' });
    }
    connectToTwitch(channel.replace('#', '').trim());
    res.json({ ok: true, message: `Twitch kanalına bağlanılıyor: ${channel}` });
});

// Connect to Kick
app.post('/api/connect-kick', (req, res) => {
    const { channel } = req.body;
    if (!channel) {
        return res.json({ ok: false, message: 'Kick kanal slug gerekli' });
    }
    connectToKick(channel.trim());
    res.json({ ok: true, message: `Kick kanalına bağlanılıyor: ${channel}` });
});

// Send test idea
app.post('/api/test-idea', (req, res) => {
    const { author, text } = req.body;
    const idea = {
        id: nextId++,
        author: author || 'TestKullanıcı',
        authorImage: '',
        text: text || 'Bu bir test fikridir!',
        platform: 'test',
        time: new Date().toLocaleTimeString('tr-TR'),
        status: 'pending'
    };

    // Save to DB
    if (currentSessionId) {
        const dbIdea = db.addIdea(currentSessionId, idea.author, '', idea.text, 'test', 'pending');
        idea.dbId = dbIdea.id;
    }

    pendingIdeas.push(idea);
    io.emit('new-idea', idea);
    res.json({ ok: true, idea });
});

// Accept idea
app.post('/api/accept/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = pendingIdeas.findIndex(i => i.id === id);
    if (idx !== -1) {
        const idea = pendingIdeas.splice(idx, 1)[0];
        idea.status = 'accepted';
        acceptedIdeas.push(idea);

        // Save to file (backup)
        const line = `[${idea.time}] [${idea.platform || 'unknown'}] @${idea.author}: ${idea.text}\n`;
        fs.appendFileSync(ideasFile, line, 'utf8');

        // Update DB
        if (idea.dbId) db.updateStatus(idea.dbId, 'accepted');

        io.emit('idea-accepted', idea);
        console.log(`✅ Fikir kabul edildi: ${idea.text}`);
        res.json({ ok: true, idea });
    } else {
        res.json({ ok: false, message: 'Fikir bulunamadı' });
    }
});

// Reject idea
app.post('/api/reject/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = pendingIdeas.findIndex(i => i.id === id);
    if (idx !== -1) {
        const idea = pendingIdeas.splice(idx, 1)[0];
        idea.status = 'rejected';

        // Update DB
        if (idea.dbId) db.updateStatus(idea.dbId, 'rejected');

        io.emit('idea-rejected', idea);
        console.log(`❌ Fikir reddedildi: ${idea.text}`);
        res.json({ ok: true });
    } else {
        res.json({ ok: false, message: 'Fikir bulunamadı' });
    }
});

// Change idea status (in_progress, completed)
app.post('/api/idea/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const validStatuses = ['in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
        return res.json({ ok: false, message: 'Geçersiz durum. Geçerli: in_progress, completed' });
    }

    // Find in accepted ideas
    const idea = acceptedIdeas.find(i => i.id === id);
    if (idea) {
        idea.status = status;

        // Update DB
        if (idea.dbId) db.updateStatus(idea.dbId, status);

        io.emit('idea-status-changed', { id, status });
        console.log(`🔄 Fikir durumu değişti: #${id} → ${status}`);
        res.json({ ok: true, idea });
    } else {
        res.json({ ok: false, message: 'Fikir bulunamadı' });
    }
});

// Get all ideas (current session)
app.get('/api/ideas', (req, res) => {
    res.json({ pending: pendingIdeas, accepted: acceptedIdeas });
});

// Remove accepted post-it
app.post('/api/remove-postit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    acceptedIdeas = acceptedIdeas.filter(i => i.id !== id);
    io.emit('postit-removed', { id });
    console.log(`🗑️ Post-it silindi: #${id}`);
    res.json({ ok: true });
});

// ============================================
// Dashboard API Routes
// ============================================

// Get all sessions
app.get('/api/sessions', (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const sessions = db.getSessionsPaged(limit, offset);
    res.json({ ok: true, sessions });
});

// Get ideas for a session
app.get('/api/sessions/:id/ideas', (req, res) => {
    const sessionId = parseInt(req.params.id);
    const status = req.query.status || null;
    const ideas = db.getIdeasBySession(sessionId, status);
    res.json({ ok: true, ideas });
});

// Get overall stats
app.get('/api/stats', (req, res) => {
    const stats = db.getStats();
    const topAuthors = db.getTopAuthors(10);
    res.json({ ok: true, stats, topAuthors });
});

// Search ideas
app.get('/api/search', (req, res) => {
    const q = req.query.q || '';
    if (q.length < 2) {
        return res.json({ ok: false, message: 'En az 2 karakter gerekli' });
    }
    const results = db.searchIdeas(q, 50);
    res.json({ ok: true, results });
});

// ============================================
// Socket.IO
// ============================================
io.on('connection', (socket) => {
    console.log('🔌 Client bağlandı');
    socket.emit('sync', { pending: pendingIdeas, accepted: acceptedIdeas, positions: postitPositions });

    socket.on('postit-move', (data) => {
        postitPositions[data.id] = postitPositions[data.id] || {};
        postitPositions[data.id].left = data.left;
        postitPositions[data.id].top = data.top;
        socket.broadcast.emit('postit-moved', data);
    });

    socket.on('postit-resize', (data) => {
        postitPositions[data.id] = postitPositions[data.id] || {};
        postitPositions[data.id].width = data.width;
        postitPositions[data.id].height = data.height;
        socket.broadcast.emit('postit-resized', data);
    });
});

// ============================================
// Start Server
// ============================================
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║     🎬 /fikir Overlay System v2 (Multi-Platform)      ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  Overlay:    http://localhost:${PORT}/overlay.html            ║
║  Panel:      http://localhost:${PORT}/panel.html              ║
║  Dashboard:  http://localhost:${PORT}/dashboard.html          ║
║                                                       ║
║  Platforms:  YouTube · Twitch · Kick                  ║
║  Trigger:    /idea /fikir /idée /идея /アイデア ...    ║
║  Features:   SQLite · Rate Limit · Profanity Filter   ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`);
});
