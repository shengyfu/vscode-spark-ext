'use strict';
import * as path from 'path';

import * as fs from 'fs';

import { workspace, window, commands, ExtensionContext, StatusBarAlignment, TextEditor, Disposable } from 'vscode';


// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sparkext-01" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

export function createConfigFile(filePath : string, content : string) : void {
    
    
    if (fs.existsSync(filePath)) {
		fs.appendFile(filePath, content,  { encoding: 'utf8' })
    }
    else {
        fs.writeFileSync(filePath, content, { encoding: 'utf8' });
    }
		
}

// this method is called when your extension is deactivated
export function deactivate() {
}