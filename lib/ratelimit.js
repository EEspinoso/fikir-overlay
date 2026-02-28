/**
 * Rate Limiter — Max N messages per user per time window
 */

const DEFAULT_MAX_MESSAGES = 3;
const DEFAULT_WINDOW_MS = 60 * 1000; // 1 minute
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// Map: author → [timestamp1, timestamp2, ...]
const userTimestamps = new Map();

/**
 * Check if user can send a message
 * @param {string} author - Username
 * @param {number} maxMessages - Max messages allowed in window
 * @param {number} windowMs - Time window in ms
 * @returns {{ allowed: boolean, remaining: number, resetIn: number }}
 */
function canSend(author, maxMessages = DEFAULT_MAX_MESSAGES, windowMs = DEFAULT_WINDOW_MS) {
    const now = Date.now();
    const timestamps = userTimestamps.get(author) || [];

    // Filter to only recent timestamps within the window
    const recent = timestamps.filter(t => now - t < windowMs);
    userTimestamps.set(author, recent);

    if (recent.length >= maxMessages) {
        const oldestInWindow = recent[0];
        const resetIn = Math.ceil((oldestInWindow + windowMs - now) / 1000);
        return { allowed: false, remaining: 0, resetIn };
    }

    return { allowed: true, remaining: maxMessages - recent.length, resetIn: 0 };
}

/**
 * Record a message sent by user
 * @param {string} author
 */
function recordMessage(author) {
    const timestamps = userTimestamps.get(author) || [];
    timestamps.push(Date.now());
    userTimestamps.set(author, timestamps);
}

/**
 * Cleanup old entries to prevent memory leaks
 */
function cleanup() {
    const now = Date.now();
    for (const [author, timestamps] of userTimestamps.entries()) {
        const recent = timestamps.filter(t => now - t < DEFAULT_WINDOW_MS * 2);
        if (recent.length === 0) {
            userTimestamps.delete(author);
        } else {
            userTimestamps.set(author, recent);
        }
    }
}

// Auto-cleanup every 5 minutes
setInterval(cleanup, CLEANUP_INTERVAL_MS);

module.exports = { canSend, recordMessage };
