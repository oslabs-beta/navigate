"use strict";
exports.__esModule = true;
var fs = require("fs");
var YAML = require("js-yaml");
var path = require("path");
var root = './yaml_files';
var data;
function getYAMLFiles() {
    var raw = [];
    fs.readdirSync(root).forEach(function (file) {
        if (file.match(/ya?ml/))
            raw.push(file);
    });
    var yamlObjs = [];
    raw.forEach(function (file) {
        yamlObjs.push(YAML.loadAll(fs.readFileSync(path.join(root, file), 'utf-8')));
    });
    return yamlObjs;
}
function getYAMLData() {
    try {
        data = getYAMLFiles();
    }
    catch (error) {
        console.log(error);
    }
    return data;
}
exports["default"] = getYAMLData;
