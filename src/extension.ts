import * as vscode from 'vscode';
import * as E from 'fp-ts/lib/Either';

import { parseYaml } from './yaml-parser';
import { Error } from './constants';

function getParsedFullKey(editor: vscode.TextEditor): E.Either<Error, string> {
    const document = editor.document;

    switch (document.languageId) {
        case 'yaml': 
        case 'ansible':
        {
            const parsedE = parseYaml(editor);

            return E.map(parsed =>
                Object.keys(parsed).reduce((result, key) => {
                    result += !result ? parsed[key] : '.' + parsed[key];
                    return result;
                }, '')
            )(parsedE);
        }
        default:
            return E.left(Error.InvalidExtension);
    }
}

function activate(context: vscode.ExtensionContext) {
    console.log('yaml-key-viewer is active!');

    const parseYamlCommand = vscode.commands.registerCommand(
        'cybai.parseYaml',
        function() {
            const result = getParsedFullKey(vscode.window.activeTextEditor);

            E.bimap<Error, void, string, void>(
                err => {
                    switch (err) {
                        case Error.InvalidExtension:
                            vscode.window.showInformationMessage(
                                'Please use this extension with yaml files.'
                            );
                    }
                },
                res => vscode.window.showInformationMessage(res)
            )(result);
        }
    );

    const copyToClipboardCommand = vscode.commands.registerCommand(
        'cybai.parseYaml.copyToClipboard',
        function() {
            const result = getParsedFullKey(vscode.window.activeTextEditor);

            E.bimap<Error, void, string, void>(
                err => {
                    switch (err) {
                        case Error.InvalidExtension:
                            vscode.window.showInformationMessage(
                                'Please use this extension with yaml files.'
                            );
                    }
                },
                res => {
                    vscode.env.clipboard.writeText(res);
                    vscode.window.showInformationMessage(
                        `${result} has been copied to clipboard.`
                    );
                }
            )(result);
        }
    );

    context.subscriptions.push(parseYamlCommand);
    context.subscriptions.push(copyToClipboardCommand);
}

function deactivate() {
    console.log('yaml-key-viewer deactivated.');
}

export { activate, deactivate };
