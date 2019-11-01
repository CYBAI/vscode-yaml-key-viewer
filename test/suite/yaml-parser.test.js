/* global suite, test */

const assert = require('assert');
const path = require('path');

const vscode = require('vscode');
const { parseYaml } = require('../../src/yaml-parser');

suite("YAML Parser Tests", function () {
  test("Parse YAML function", function () {
    vscode.workspace.openTextDocument(path.join(__dirname, './test.yml'))
      .then(doc => vscode.window.showTextDocument(doc)
        .then(editor => editor.edit(te => {
          te.insert(doc.positionAt(Infinity), ' ');
        })))
      .then(editor => {
        assert.equal(false, parseYaml(editor));
      });
  });
});
