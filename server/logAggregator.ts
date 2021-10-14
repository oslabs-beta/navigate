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
    for(let i = 0; i < jsonObjs.length; i++){
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
          console.log('Error inside deployment conditional of parseSchedulerInformation: ', error);
        }
      }
        else if(jsonObjs[i][0].kind === 'Pod'){
          try {
            conditionObject.time = jsonObjs[i][0].status.conditions[j].lastTransitionTime;
            conditionObject.event = `Pod deployment status: ${jsonObjs[i][0].status.conditions[j].type}`
          } catch (error) {
            console.log('Error in pod conditional of parseSchedulerInformation: ', error)
          }
        }
        statusConditions.push(conditionObject)
      }
    }
    return sortStatusConditions(statusConditions);
  } catch (error) {
      console.log('Error in parseSchedulerInformation', error)
  }
}

function sortStatusConditions(statusConditions: any){
  try {
    statusConditions.sort(function(a: any,b: any){
      return a.time.localeCompare(b.time)
    })
  } catch (error) {
    console.log('Error in sortStatusConditions: ', error)
  }
}