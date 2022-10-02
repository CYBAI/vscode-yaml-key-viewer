import * as assert from 'assert';
import * as path from 'path';

import * as vscode from 'vscode';
import * as E from 'fp-ts/lib/Either';
import { Error } from '../../src/constants';

import { parseYaml } from '../../src/yaml-parser';

async function moveCursorAt(x, y) {
    await vscode.commands.executeCommand("cursorMove", {
        to: "up",
        by: "line",
        value: 9000
    });
    await vscode.commands.executeCommand("cursorMove", {
        to: "down",
        by: "line",
        value: y,
    });
    await vscode.commands.executeCommand("cursorMove", {
        to: "right",
        by: "character",
        value: x,
    });
}

async function getParsedResult(parsed: E.Either<Error, unknown>) {
    let result = E.map(parsed =>
        Object.keys(parsed).reduce((result, key) => {
            result += !result ? parsed[key] : '.' + parsed[key];
            return result;
        }, '')
    )(parsed);

    return new Promise((ok, nok) => {
        E.bimap<Error, void, string, void>(
            err => {
                nok(err);
            },
            res => {
                ok(res);
            }
        )(result);
    });
}

let relativeToCurrentFolder = file => path.join(__dirname.replace("/out", "/"), "..", file); 

suite('YAML Parser Tests', function () {
    test('Parse YAML function', function () {
        vscode.workspace
            .openTextDocument(path.join(__dirname, './test.yml'))
            .then(doc =>
                vscode.window.showTextDocument(doc).then(editor => {
                    editor.edit(te => {
                        te.insert(doc.positionAt(Infinity), ' ');
                    });

                    return editor;
                })
            )
            .then(editor => {
                assert.equal(false, parseYaml(editor));
            });
    });

    test('Read line 84 should equals to "canonical"', async () => {
        let doc = await vscode.workspace.openTextDocument(relativeToCurrentFolder('./test.yml'))

        let editor = await vscode.window.showTextDocument(doc);
        await moveCursorAt(9, 83);

        let parsed = parseYaml(editor);
        let result = await getParsedResult(parsed);
        assert.strictEqual(result, "float.canonical");
    });

    test('Read line 83 (without ---) should equals to "canonical"', async () => {
        let doc = await vscode.workspace.openTextDocument(relativeToCurrentFolder('./test-headless.yml'))

        let editor = await vscode.window.showTextDocument(doc);
        await moveCursorAt(9, 82);

        let parsed = parseYaml(editor);
        let result = await getParsedResult(parsed);
        assert.strictEqual(result, "float.canonical");
    });
});
