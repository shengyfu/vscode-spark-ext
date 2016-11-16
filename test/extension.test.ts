//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import * as fs from 'fs';
import * as path from 'path';
import { workspace } from 'vscode';
// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    // Defines a Mocha unit test
    test("createConfigFile", () => {
        var fileName : string = "test.json";
        var content : string = "{\"typescript.tsdk\": \"./node_modules/typescript/lib\"}";
        let configFile = path.join("C:/Source/Repos/vscode-spark-ext/.vscode",  fileName);
        myExtension.createConfigFile(configFile, content);
        assert.equal(fs.readFileSync(configFile), content);
        fs.truncateSync(configFile);
    });
});