/* global suite, test */

const assert = require('assert');

const { window } = require('vscode');
const editor = window.activeTextEditor;
const { parseYaml } = require('../src/yaml-parser');

suite("YAML Parser Tests", function () {
  test("Parse YAML function", function () {
    assert.equal(false, parseYaml(editor));
  });
});