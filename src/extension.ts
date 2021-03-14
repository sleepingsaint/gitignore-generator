// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from "axios";
import * as fs from "fs";
import supported_files from "./supported_files";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("gitignore-generator.generate", async () => {
		let result = await vscode.window.showQuickPick(supported_files, { placeHolder: "Select Program", canPickMany: true });
		if (result && result.length && vscode.workspace.workspaceFolders) {
			let workspace_folder = vscode.workspace.workspaceFolders[0].uri.path;
			axios.get(`https://www.toptal.com/developers/gitignore/api/${result.join(',')}`)
				.then(res => {
					fs.writeFileSync(`${workspace_folder}/.gitignore`, res.data);
					vscode.window.showInformationMessage("gitignore added successfully");
				})
				.catch(err => vscode.window.showErrorMessage("Oops! something went wrong"));
		}
	}))
}

// this method is called when your extension is deactivated
export function deactivate() { }
