import * as vscode from 'vscode';
import * as E from 'fp-ts/lib/Either';

import { FIND_KEY_REGEX, Error } from './constants';
import {
    isKey,
    isCommentLine,
    textIndentations,
    isUnnecessaryLine,
    findLineOfClosestKey,
} from './util';

function parseYaml({
    document,
    selection,
}: vscode.TextEditor): E.Either<Error, unknown> {
    const selectedLine = document.lineAt(selection.active);

    if (selectedLine.isEmptyOrWhitespace) {
        return E.left(Error.BlankLine);
    }

    if (isCommentLine(selectedLine.text)) {
        return E.left(Error.CommentLine);
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

    let checkDone = false;

    return E.right(
        lines.filter(isUnnecessaryLine).reduce((result, line) => {
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
        }, {})
    );
}

export { parseYaml };
