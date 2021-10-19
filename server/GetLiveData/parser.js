"use strict";
exports.__esModule = true;
var fs = require("fs");
var YAML = require("js-yaml");
var path = require("path");
var data;
function getFiles(fileType, root) {
    var raw = [];
    fs.readdirSync(root).forEach(function (file) {
        if (file.match(fileType))
            raw.push(file);
    });
    var fileObjs = [];
    raw.forEach(function (file) {
        fileObjs.push(YAML.loadAll(fs.readFileSync(path.join(root, file), 'utf-8')));
    });
    return fileObjs;
}
function getYAMLFiles() {
    try {
        var root = path.join(__dirname, '../../yaml_files');
        data = getFiles(/\.ya?ml/, root);
    }
    catch (error) {
        console.log('Error with getYAMLData funciton: ', error);
    }
    return data;
}
function getJSONFiles() {
    try {
        var root = path.join(__dirname, '../../navigate_logs');
        data = getFiles(/\.json/, root);
    }
    catch (error) {
        console.log('Error with getJSONData funciton: ', error);
    }
    return data;
}
var parser = {
    getYAMLFiles: getYAMLFiles,
    getJSONFiles: getJSONFiles
};
module.exports = parser;
