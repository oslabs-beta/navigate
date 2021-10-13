import getYAMLData from '../yamlParser.js';
import runCommand from '../runCommand';
import * as fs from 'fs';
import * as path from 'path';

const deployments = getElements('Deployment');
const namespaces = getElements('Namespace');

export default function getElements(kind: string): string[] {
  const data = getYAMLData();
  const output = [];
  data.forEach(ele => {
      if(ele[0].kind === kind) output.push(ele);
  });
  return output;
}

export function parsePodNames (filePath = path.join(__dirname, `../navigate_logs/${exportObj.fileName}`)): string {
  try{
      fs.readFile(filePath, 'utf-8', (err, result) => {
          return result.split(' ');
      });
  }
  catch(error) {
      console.log(error);
      return error;
  }
}

export function getAllPods(cmd: string, namespace: string): void {
  exportObj.runCommand(`${cmd} -n ${namespace} &> ../navigate_logs/${exportObj.fileName}`);
}




