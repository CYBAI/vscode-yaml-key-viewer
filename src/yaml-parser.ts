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

    if (lines[0] == '---') {
        lines.shift();
    }

    const expectedIndentationLine = isKey(selectedLine.text)
        ? selectedLine.text
        : findLineOfClosestKey(selectedLine.text, lines);

    const expectedLineSpace = textIndentations(expectedIndentationLine);

    return E.right(
        lines.filter(isUnnecessaryLine).reduce((result, line) => {
            const spaces = textIndentations(line);

            if (expectedLineSpace.length >= spaces.length) {
                result[spaces] = line.replace(FIND_KEY_REGEX, '$1').trim();
            }

            return result;
        }, {})
    );
}

export { parseYaml };
