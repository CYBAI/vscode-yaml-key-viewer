import * as vscode from 'vscode';
import { parseYaml } from './yaml-parser';

function getParsedFullKey() {
    const editor = vscode.window.activeTextEditor;
    const doc = editor.document;

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

function activate(context: vscode.ExtensionContext) {
    console.log('yaml-key-viewer is active!');

    const parseYamlCommand = vscode.commands.registerCommand(
        'cybai.parseYaml',
        function() {
            const result = getParsedFullKey();
            if (result) {
                vscode.window.showInformationMessage(result);
            }
        }
    );

    const copyToClipboardCommand = vscode.commands.registerCommand(
        'cybai.parseYaml.copyToClipboard',
        function() {
            const parsedResult = getParsedFullKey();

            vscode.env.clipboard.writeText(parsedResult);

            vscode.window.showInformationMessage(
                `${parsedResult} has been copied to clipboard.`
            );
        }
    );

    context.subscriptions.push(parseYamlCommand);
    context.subscriptions.push(copyToClipboardCommand);
}

function deactivate() {
    console.log('yaml-key-viewer deactivated.');
}

export { activate, deactivate };
