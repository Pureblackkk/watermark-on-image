export function isBrowser() {
    return !!(typeof window !== 'undefined'
    && document);
}

export function isNode() {
    return !!(typeof module !== 'undefined' 
    && module.exports
    && typeof process === 'object'
    && typeof process.versions === 'object');
}