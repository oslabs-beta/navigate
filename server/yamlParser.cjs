"use strict";
exports.__esModule = true;
var fs = require("fs");
var YAML = require("js-yaml");
var path = require("path");
var root = '../yaml_files';
var raw = [];
fs.readdirSync(root).forEach(function (file) {
    if (file.match(/ya?ml/))
        raw.push(file);
});
var yamlObjs = [];
raw.forEach(function (file) {
    yamlObjs.push(YAML.load(fs.readFileSync(path.join(root, file))));
});
fs.writeFileSync('./yaml.json', JSON.stringify(yamlObjs, null, 2));
