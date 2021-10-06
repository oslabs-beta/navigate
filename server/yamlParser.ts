import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';

const root = '../yaml_files';
const outputFilePath = './yaml.json';

export let data: string;

function getYAMLFiles(): void {
  const raw: string[] = [];
  fs.readdirSync(root).forEach(file => {
    if(file.match(/ya?ml/)) 
      raw.push(file);
  });

  const yamlObjs: string[] = [];
  raw.forEach(file => {
    yamlObjs.push(YAML.load(fs.readFileSync(path.join(root, file))));
  })

  fs.writeFileSync('./yaml.json', JSON.stringify(yamlObjs, null, 2));
}

function getYAMLData(): string {
  try{
    data = fs.readFileSync(outputFilePath, 'utf-8');
    if(data === "")
    {
      getYAMLFiles();
      data = fs.readFileSync(outputFilePath, 'utf-8');
    }
  } catch{
    getYAMLFiles();
    data = fs.readFileSync(outputFilePath, 'utf-8');
  }
  return data;
}

getYAMLData();
