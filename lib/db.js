const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists (project root → data/)
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'fikir.db'));

// Enable WAL mode for better concurrent performance
db.pragma('journal_mode = WAL');

// ============================================
// Create Tables
// ============================================
db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT NOT NULL DEFAULT 'youtube',
        platform_id TEXT,
        title TEXT,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ended_at DATETIME
    );

    CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER,
        author TEXT NOT NULL,
        author_image TEXT DEFAULT '',
        text TEXT NOT NULL,
        platform TEXT NOT NULL DEFAULT 'youtube',
        status TEXT NOT NULL DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (session_id) REFERENCES sessions(id)
    );

    CREATE INDEX IF NOT EXISTS idx_ideas_session ON ideas(session_id);
    CREATE INDEX IF NOT EXISTS idx_ideas_status ON ideas(status);
    CREATE INDEX IF NOT EXISTS idx_ideas_author ON ideas(author);
`);

// ============================================
// Prepared Statements
// ============================================
const stmts = {
    createSession: db.prepare(`
        INSERT INTO sessions (platform, platform_id, title) VALUES (?, ?, ?)
    `),
    endSession: db.prepare(`
        UPDATE sessions SET ended_at = CURRENT_TIMESTAMP WHERE id = ?
    `),
    addIdea: db.prepare(`
        INSERT INTO ideas (session_id, author, author_image, text, platform, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `),
    updateStatus: db.prepare(`
        UPDATE ideas SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `),
    getIdea: db.prepare(`
        SELECT * FROM ideas WHERE id = ?
    `),
    getIdeasBySession: db.prepare(`
        SELECT * FROM ideas WHERE session_id = ? ORDER BY created_at DESC
    `),
    getIdeasByStatus: db.prepare(`
        SELECT * FROM ideas WHERE session_id = ? AND status = ? ORDER BY created_at DESC
    `),
    getAllSessions: db.prepare(`
        SELECT s.*, 
            COUNT(i.id) as total_ideas,
            SUM(CASE WHEN i.status = 'accepted' OR i.status = 'in_progress' OR i.status = 'completed' THEN 1 ELSE 0 END) as accepted_ideas
        FROM sessions s
        LEFT JOIN ideas i ON s.id = i.session_id
        GROUP BY s.id
        ORDER BY s.started_at DESC
    `),
    getSessionsPaged: db.prepare(`
        SELECT s.*, 
            COUNT(i.id) as total_ideas,
            SUM(CASE WHEN i.status = 'accepted' OR i.status = 'in_progress' OR i.status = 'completed' THEN 1 ELSE 0 END) as accepted_ideas
        FROM sessions s
        LEFT JOIN ideas i ON s.id = i.session_id
        GROUP BY s.id
        ORDER BY s.started_at DESC
        LIMIT ? OFFSET ?
    `),
    searchIdeas: db.prepare(`
        SELECT i.*, s.platform as session_platform, s.started_at as session_date
        FROM ideas i
        LEFT JOIN sessions s ON i.session_id = s.id
        WHERE i.text LIKE ? OR i.author LIKE ?
        ORDER BY i.created_at DESC
        LIMIT ?
    `),
    getStats: db.prepare(`
        SELECT 
            COUNT(*) as total_ideas,
            SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted,
            SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
            SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
        FROM ideas
    `),
    getTopAuthors: db.prepare(`
        SELECT author, COUNT(*) as idea_count,
            SUM(CASE WHEN status IN ('accepted','in_progress','completed') THEN 1 ELSE 0 END) as accepted_count
        FROM ideas
        GROUP BY author
        ORDER BY accepted_count DESC
        LIMIT ?
    `),
    getSessionCount: db.prepare(`
        SELECT COUNT(*) as count FROM sessions
    `),
};

// ============================================
// Public API
// ============================================
module.exports = {
    /**
     * Create a new stream session
     */
    createSession(platform, platformId, title) {
        const result = stmts.createSession.run(platform, platformId, title || `${platform} Stream`);
        return result.lastInsertRowid;
    },

    /**
     * End a session
     */
    endSession(sessionId) {
        stmts.endSession.run(sessionId);
    },

    /**
     * Add a new idea
     */
    addIdea(sessionId, author, authorImage, text, platform, status = 'pending') {
        const result = stmts.addIdea.run(sessionId, author, authorImage || '', text, platform, status);
        return { id: result.lastInsertRowid, session_id: sessionId, author, author_image: authorImage, text, platform, status };
    },

    /**
     * Update idea status: pending → accepted → in_progress → completed (or rejected)
     */
    updateStatus(ideaId, newStatus) {
        const validStatuses = ['pending', 'accepted', 'rejected', 'in_progress', 'completed'];
        if (!validStatuses.includes(newStatus)) {
            throw new Error(`Invalid status: ${newStatus}`);
        }
        stmts.updateStatus.run(newStatus, ideaId);
        return stmts.getIdea.get(ideaId);
    },

    /**
     * Get a single idea
     */
    getIdea(ideaId) {
        return stmts.getIdea.get(ideaId);
    },

    /**
     * Get all ideas for a session
     */
    getIdeasBySession(sessionId, status = null) {
        if (status) {
            return stmts.getIdeasByStatus.all(sessionId, status);
        }
        return stmts.getIdeasBySession.all(sessionId);
    },

    /**
     * Get all sessions (with idea counts)
     */
    getAllSessions() {
        return stmts.getAllSessions.all();
    },

    /**
     * Get sessions with pagination
     */
    getSessionsPaged(limit = 20, offset = 0) {
        return stmts.getSessionsPaged.all(limit, offset);
    },

    /**
     * Search ideas by text or author
     */
    searchIdeas(query, limit = 50) {
        const pattern = `%${query}%`;
        return stmts.searchIdeas.all(pattern, pattern, limit);
    },

    /**
     * Get overall statistics
     */
    getStats() {
        const stats = stmts.getStats.get();
        const sessionCount = stmts.getSessionCount.get();
        return { ...stats, total_sessions: sessionCount.count };
    },

    /**
     * Get top contributing authors
     */
    getTopAuthors(limit = 10) {
        return stmts.getTopAuthors.all(limit);
    },

    /**
     * Close database connection
     */
    close() {
        db.close();
    }
};
