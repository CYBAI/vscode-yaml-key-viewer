import * as assert from 'assert';
import * as path from 'path';

import * as vscode from 'vscode';

import { parseYaml } from '../../src/yaml-parser';

suite('YAML Parser Tests', function() {
    test('Parse YAML function', function() {
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
});
