const vscode = require('vscode');
const yamlParser = require('./yaml-parser');
const copyPaste = require('copy-paste');

const { commands, window } = vscode;
const { parseYaml } = yamlParser;
const { copy } = copyPaste;

function getParsedFullKey() {
  const editor = window.activeTextEditor;
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

      return Object.keys(parsed).reduce((result, key) => {
        result += !result ? parsed[key] : '.' + parsed[key];
        return result;
      }, '');
    }
}

function activate(context) {
  console.log('yaml-key-viewer is active!');

  const parseYamlCommand = commands.registerCommand('cybai.parseYaml', function () {
    const result = getParsedFullKey();
    if (result) {
      window.showInformationMessage(result);
    }
  });

  const copyToClipboardCommand = commands.registerCommand('cybai.parseYaml.copyToClipboard', function () {
    const parsedResult = getParsedFullKey();
    atom.clipboard.write(parsedResult);

    window.showInformationMessage(`${parsedResult} has been copied to clipboard.`);
  });

  context.subscriptions.push(parseYamlCommand);
  context.subscriptions.push(copyToClipboardCommand);
}
exports.activate = activate;

function deactivate() {
  console.log('yaml-key-viewer deactivated.');
}
exports.deactivate = deactivate;
