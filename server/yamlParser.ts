import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';

const root = './yaml_files';

let data: object;

function getYAMLFiles(): object {
  const raw: string[] = [];
  fs.readdirSync(root).forEach(file => {
    if(file.match(/ya?ml/)) 
      raw.push(file);
  });
  const yamlObjs: any[] = [];
  raw.forEach(file => {
    yamlObjs.push(YAML.loadAll(fs.readFileSync(path.join(root, file), 'utf-8')));
  })
  return yamlObjs;
}

export default function getYAMLData(): object {
  try{
      data =  getYAMLFiles();
    }
  catch (error) {
    console.log(error);
  }
  return data;
}