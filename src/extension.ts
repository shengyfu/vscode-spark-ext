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
    console.log('Congratulations, your Spark development extension is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.saySpark', () => {
        // The code you place here will be executed every time your command is executed
        if (!workspace.rootPath) {
			window.showErrorMessage('Spark extension only works if VS Code is opened on a folder.');
		}
        else {
            // Display a message box to the user
            vscode.window.showInformationMessage('Welcome to Spark development!');
            createSettingsFile("/Users/ying/spark-2.0.1-bin-hadoop2.7");
        }
        
        
    });

    context.subscriptions.push(disposable);
}

function settingsTemplate(sparkHome: string) {
    var settings = '{\n\"python.autoComplete.extraPaths\":\[\n'+
           '"' + sparkHome + '/python",\n' +
           '"' + sparkHome + '/python/pyspark",\n' +
           '"' + sparkHome + '/python/lib/py4j-0.10.3-src.zip"\n' +
            '\]\n}';
    return settings;
}

export function createSettingsFile(sparkHome : string) : void {
     let content : string = settingsTemplate(sparkHome);
     let configPath = path.join(workspace.rootPath, ".vscode/");
     if (!fs.existsSync(configPath)){
         fs.mkdirSync(configPath);
     }
     let configFile = path.join(configPath, "Settings.json");
     createOrUpdateFile(configFile, content);     

}

export function createOrUpdateFile(filePath : string, content : string) : void {    
    
    if (fs.existsSync(filePath)) {
        let input = JSON.parse(content);
        let currentStr = fs.readFileSync(filePath, 'utf8');
        if (currentStr.trim().length > 0) {
            let current = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            for (var key in input) {
                current[key] = input[key];
            }
            content = JSON.stringify(current, null, 2);
        }        
    }
    
    fs.writeFileSync(filePath, content, { encoding: 'utf8' });   
		
}


// this method is called when your extension is deactivated
export function deactivate() {
}