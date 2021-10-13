import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';

const root = './navigate_logs';

export default function getJSONFiles(): Array<object> {
  const raw: string[] = [];
  fs.readdirSync(root).forEach(file => {
    if(file.match(/js?on/)) 
      raw.push(file);
  });
  const jsonObjs: object[] = [];
  raw.forEach(file => {
    jsonObjs.push(YAML.loadAll(fs.readFileSync(path.join(root, file), 'utf-8')));
  })
  return parseSchedulerInformation(jsonObjs);
}

function parseSchedulerInformation(jsonObjs): any {
  try {
    const statusConditions: any = [];
    // jsonObjs.forEach((obj: Object) => {
    for(let i = 0; i < jsonObjs.length; i++){
      console.log(`jsonObjs ${[i]}`,jsonObjs[i])
      statusConditions.push({
        name: jsonObjs[i].metadata.name,
      //   namespace: jsonObjs[0][i].namespace,
      //   // lastTransitionTime: jsonObjs[0][i].status.conditions.lastTransitionTime,
      });
    }
    // })
    return statusConditions;
  } catch (error) {
      console.log('Error in parseSchedulerInformation', error)
  }
}

