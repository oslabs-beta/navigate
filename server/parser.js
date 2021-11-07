// import * as fs from 'fs';
// import * as YAML from 'js-yaml';
// import * as path from 'path';

const fs = require('fs');
const YAML = require('js-yaml');
const path = require('path');

let data = [];

function getFiles(fileType, root) {
  const raw= [];
  fs.readdirSync(root).forEach(file => {
    if(file.match(fileType)) 
      raw.push(file);
  });
  const fileObjs= [];
  raw.forEach(file => {
    fileObjs.push(YAML.loadAll(fs.readFileSync(path.join(root, file), 'utf-8')));
  })
  return fileObjs;
}

function readFile(file){
  return YAML.loadAll(file);
}

function getYAMLFiles(localPath = '../yaml_files') {
  try{
      const root = path.join(__dirname, localPath);
      data = getFiles(/\.ya?ml/, root);
    }
  catch (error) {
    console.log('Error with getYAMLData funciton: ', error);
  }
  return data;
}

function getJSONFiles(localPath= '../navigate_logs') {
  try {
    const root = path.join(__dirname, localPath);
    data = getFiles(/\.json/, root)
  } catch (error) {
    console.log('Error with getJSONData funciton: ', error)
  }
  return data;
}

const parser = {
  getYAMLFiles,
  getJSONFiles, 
  readFile, 
}

module.exports = parser;
