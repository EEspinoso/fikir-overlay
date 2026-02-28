/**
 * Profanity Filter — English + Turkish custom word lists
 * Self-contained, no external dependencies
 */

// English bad words list (common profanity)
const EN_BAD_WORDS = [
    'fuck', 'fucking', 'fucked', 'fucker', 'fucks',
    'shit', 'shitty', 'shitting', 'bullshit',
    'ass', 'asshole', 'asses',
    'bitch', 'bitches', 'bastard',
    'damn', 'dammit', 'dick', 'dicks',
    'crap', 'cunt', 'cock', 'pussy',
    'piss', 'whore', 'slut', 'nigger', 'nigga',
    'retard', 'retarded', 'faggot', 'fag',
    'stfu', 'wtf', 'gtfo', 'lmfao',
];

// Turkish bad words list (common profanity)
const TR_BAD_WORDS = [
    'amk', 'aq', 'amına', 'amina', 'siktir', 'siktirgit', 'sikeyim',
    'piç', 'pic', 'orospu', 'oç', 'oc', 'pezevenk', 'gavat',
    'yavşak', 'yavsak', 'göt', 'got', 'haysiyetsiz', 'şerefsiz',
    'serefsiz', 'dangalak', 'gerizekalı', 'gerizekali',
    'salak', 'bok', 'sikik', 'yarrak', 'taşak', 'tasak',
    'kaltak', 'fahişe', 'fahise', 'ibne',
    'hassiktir', 'amcık', 'amcik',
];

// Build a Set for fast O(1) lookup
const BAD_WORDS_SET = new Set([
    ...EN_BAD_WORDS.map(w => w.toLowerCase()),
    ...TR_BAD_WORDS.map(w => w.toLowerCase()),
]);

/**
 * Clean a word by removing common punctuation
 */
function cleanWord(word) {
    return word.toLowerCase().replace(/[.,!?;:'"()@#$%^&*\[\]{}]/g, '');
}

/**
 * Check if text contains profanity
 * @param {string} text
 * @returns {boolean} true if text is CLEAN (no profanity)
 */
function isClean(text) {
    const words = text.split(/\s+/);
    for (const word of words) {
        const cleaned = cleanWord(word);
        if (cleaned && BAD_WORDS_SET.has(cleaned)) return false;
    }
    return true;
}

/**
 * Clean/censor profanity from text (replace with ***)
 * @param {string} text
 * @returns {string} censored text
 */
function clean(text) {
    const words = text.split(/\s+/);
    return words.map(word => {
        const cleaned = cleanWord(word);
        if (cleaned && BAD_WORDS_SET.has(cleaned)) return '***';
        return word;
    }).join(' ');
}

module.exports = { isClean, clean };
