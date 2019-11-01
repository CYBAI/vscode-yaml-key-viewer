const { FIND_KEY_REGEX } = require('./constants');

/**
 * Check if the line is empty string or only whitespace(s) or not
 */
function isEmptyOrWhitespace(str: string) {
    const spaces = str.match(/\s/g) || '';
    return str === '' || spaces.length === str.length;
}

/**
 * Check if the line is a comment line or not
 */
function isCommentLine(str: string) {
    return !!str.match(/^\s*#/);
}

/**
 * Check if the line contains a key or not
 */
function isKey(str: string) {
    return !!str.match(FIND_KEY_REGEX);
}

/**
 * Find the closet key
 */
function findLineOfClosestKey(selectedLineText: string, lines: Array<string>) {
    return lines.filter(line => !isCommentLine(line) && isKey(line)).pop();
}

/**
 * Get the spaces of the string, if it doesn't contain
 * spaces, it will return an array with empty string.
 */
function textIndentations(str: string) {
    return (str.match(/^\s*/) || [''])[0];
}

/**
 * Function to filter unnecessary lines, including empty line,
 * line with only whitespace(s) and comment line
 */
function isUnnecessaryLine(line: string) {
    return !isEmptyOrWhitespace(line) && !isCommentLine(line);
}

export {
    isKey,
    isCommentLine,
    findLineOfClosestKey,
    textIndentations,
    isEmptyOrWhitespace,
    isUnnecessaryLine,
};
