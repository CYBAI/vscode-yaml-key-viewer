const vscode = require('vscode');
const yamlParser = require('./yaml-parser');

const { commands, window } = vscode;
const { parseYaml } = yamlParser;

function activate(context) {
  console.log('yaml-key-viewer is active!');

  var disposable = commands.registerCommand('cybai.parseYaml', function () {
    var editor = window.activeTextEditor;
    if (!editor) {
      return;
    }

    const doc = editor.document;

    if (!doc) return;

    if (doc.languageId === 'yaml') {
      const parsed = parseYaml(editor);
      if (!parsed) {
        return;
      }

      window.showInformationMessage(
        Object.keys(parsed).reduce((result, key) => {
          result += !result ? parsed[key] : '.' + parsed[key];
          return result;
        }, '')
      );
    }
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
  console.log('yaml-key-viewer deactivated.');
}
exports.deactivate = deactivate;
