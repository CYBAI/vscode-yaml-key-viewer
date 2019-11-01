import * as vscode from 'vscode';

import { FIND_KEY_REGEX } from './constants';
import {
    isKey,
    isCommentLine,
    textIndentations,
    isUnnecessaryLine,
    findLineOfClosestKey,
} from './util';

function parseYaml({ document, selection }: vscode.TextEditor) {
    let checkDone = false;

    const selectedLine = document.lineAt(selection.active);
    if (selectedLine.isEmptyOrWhitespace || isCommentLine(selectedLine.text)) {
        return false;
    }

    const range = new vscode.Range(
        0,
        0,
        selection.end.line,
        selectedLine.text.length
    );

    const lines = document.getText(range).split('\n');

    // Remove the first line of `---`
    lines.shift();

    const expectedIndentationLine = isKey(selectedLine.text)
        ? selectedLine.text
        : findLineOfClosestKey(selectedLine.text, lines);
    const expectedLineSpace = textIndentations(expectedIndentationLine);

    return lines.filter(isUnnecessaryLine).reduce((result, line) => {
        if (!checkDone) {
            if (line === expectedIndentationLine) {
                checkDone = true;
            }
            const spaces = textIndentations(line);
            if (expectedLineSpace >= spaces) {
                result[spaces] = line
                    .replace(FIND_KEY_REGEX, '$1')
                    .replace(/^\s*/, '');
            }
        }

        return result;
    }, {});
}

export { parseYaml };
