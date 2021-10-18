import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';

const root = './yaml_files';

let data: object[];

function getFiles(fileType: RegExp): Array<object> {
  console.log('line 10')
  const raw: string[] = [];
  fs.readdirSync(root).forEach(file => {
    if(file.match(fileType)) 
      raw.push(file);
  });
  const fileObjs: object[] = [];
  raw.forEach(file => {
    fileObjs.push(YAML.loadAll(fs.readFileSync(path.join(root, file), 'utf-8')));
  })
  return fileObjs;
}


function getYAMLData(): object[] {
  try{
      data = getFiles(/ya?m/);
    }
  catch (error) {
    console.log(error);
  }
  return data;
}

const yamlParser = {
  getFiles,
  getYAMLData
}

export default yamlParser;