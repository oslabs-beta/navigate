import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';

const root = './navigate_logs';

export default function getJSONFiles(): any {
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

function parseSchedulerInformation(jsonObjs: any){
  try {
    const statusConditions: any = [];
    // jsonObjs.forEach((obj: Object) => {
    for(let i = 0; i < jsonObjs.length; i++){
      // console.log(`jsonObjs ${[i]}`,jsonObjs[i][0]) // represents each file object
      console.log('line 27  condition: ', jsonObjs[i][0].status.conditions.length)
      for(let j = 0; j < jsonObjs[i][0].status.conditions.length; j++){
        let conditionObject: any = {};
        conditionObject.name = jsonObjs[i][0].metadata.name;
        conditionObject.kind = jsonObjs[i][0].kind;
        if(jsonObjs[i][0].kind === 'Deployment'){
        try {
          conditionObject.time = jsonObjs[i][0].status.conditions[j].lastTransitionTime;
          conditionObject.event = jsonObjs[i][0].status.conditions[j].message;
          conditionObject.reason = jsonObjs[i][0].status.conditions[j].reason;
          conditionObject.type = jsonObjs[i][0].status.conditions[j].type;
          }
        catch (error) {
          console.log('failure inside  deployment conditional: ', error);
        }
      }
        else if(jsonObjs[i][0].kind === 'Pod'){
          try {
            conditionObject.time = jsonObjs[i][0].status.conditions[j].lastTransitionTime;
            conditionObject.event = `Pod deployment status: ${jsonObjs[i][0].status.conditions[j].type}`
          } catch (error) {
            console.log('error in pod conditional: ', error)
          }
        }
        statusConditions.push(conditionObject)
      }
    }
    // })
    return sortStatusConditions(statusConditions);
  } catch (error) {
      console.log('Error in parseSchedulerInformation', error)
  }
}

function sortStatusConditions(statusConditions: any){
  // console.log(statusConditions)
  statusConditions.sort(function(a: any,b: any){
    // return new Date(a.time) - new Date(b.time)
    return a.time.localeCompare(b.time)
  })
  console.log(statusConditions);
}