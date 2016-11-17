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

let ROOT_PATH = 'c:/temp'
// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    // Defines a Mocha unit test
    test("createConfigFile", () => {
        var fileName : string = "test.json";
        var content : string = "{\"typescript.tsdk\":\"./node_modules/typescript/lib\"}";        
        let configFile = path.join(ROOT_PATH,  fileName);
        myExtension.createOrUpdateFile(configFile, content);
        assert.equal(fs.readFileSync(configFile, 'utf8'), content);
        fs.truncateSync(configFile);
    });

    test("createConfigFile2", () => {
        var fileName : string = "test.json";
        var content : string = '{"a":"1"}';
        let configFile = path.join(ROOT_PATH,  fileName);
        myExtension.createOrUpdateFile(configFile, content);
        var content2 : string = '{"a":"2","b":"1"}';
        myExtension.createOrUpdateFile(configFile, content2);
        assert.equal(fs.readFileSync(configFile, 'utf8'), content2);
        fs.truncateSync(configFile);
    });
});