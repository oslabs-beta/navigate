import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';

const root = '/Users/hemwatie/OSP/navigate/yaml_files';
const outputFilePath = './server/yaml.json';

let data: string;

function getYAMLFiles(): void {
  console.log('inside getYAMLFiles;')
  const raw: string[] = [];
  console.log('raw',raw);
  // fs.readdirSync(root).forEach(file => {
  //   console.log('fs.readdirSync')
  //   if(file.match(/ya?ml/)){
  //     console.log('inside if of readdirSync')
  //     raw.push(file);
  //   }
  // });
  // console.log('finished filling raw');
  console.log('line 22');
  const yamlObjs: any[] = [];
  console.log('yamlObjs', yamlObjs);
  // raw.forEach(file => {
  //   console.log('inside raw.forEach');
    // yamlObjs.push(YAML.load(fs.readFileSync(root, 'utf-8')));
  // })

  const plsbestring  = fs.readdirSync(root, 'utf8');
  console.log('plsbestring', plsbestring);

  try {
    plsbestring.forEach(filename => {
      yamlObjs.push(YAML.loadAll(filename))
    })
  } catch (error) {
    console.log('yaml.load why no work-y :C',error)
  }

  console.log('before the writeFileSync of getYAMLFiles;')
  console.log('yamlObjs', yamlObjs)
  fs.writeFileSync(outputFilePath, JSON.stringify(yamlObjs, null, 2));
}

export default function getYAMLData(): string {
  console.log('inside of getYAMLData function');
  try{
    console.log('try block data line  34',data)
    if(data === undefined)
    {
      console.log('if statement')
      getYAMLFiles();
      data = fs.readFileSync(outputFilePath, 'utf-8');
      console.log('data in if', data)
    }
    data = fs.readFileSync(outputFilePath, 'utf-8');
  } catch{
    console.log('catch block line  45',data)
    getYAMLFiles();
    data = fs.readFileSync(outputFilePath, 'utf-8');
    console.log('catch',data)
  }
  console.log('line 50',data)
  return data;
}
