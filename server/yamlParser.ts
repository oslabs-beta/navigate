import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';

const root = '../yaml_files';

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