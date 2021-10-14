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
  return parsePodInformation(jsonObjs);
}

function parsePodInformation(jsonObjs: any){
  try {
    const podsInfoObjs: any = [];
    for(let i = 0; i < jsonObjs.length; i++){
      for(let j = 0; j < jsonObjs[i][0].status.conditions.length; j++){
        let infoObject: any = {};
        infoObject.name = jsonObjs[i][0].metadata.name;
        infoObject.kind = jsonObjs[i][0].kind;
        infoObject.namespace = jsonObjs[i][0].namespace;
        infoObject.uid = jsonObjs[i][0].metadata.uid;
        if(jsonObjs[i][0].kind === 'Deployment'){
        try {
          infoObject.env = jsonObjs[i][0].spec.template.spec.containers[0].env;
          infoObject.dnsPolicy = jsonObjs[i][0].spec.template.spec.dnsPolicy;
          infoObject.strategy = jsonObjs[i][0].spec.strategy;
          }
        catch (error) {
          console.log('Error inside deployment conditional of parseSchedulerInformation: ', error);
        }
      }
        else if(jsonObjs[i][0].kind === 'Pod'){
          try {
            infoObject.owner = jsonObjs[i][0].metadata.ownerReferences;
            infoObject.env = jsonObjs[i][0].spec.containers[0].env;
            infoObject.image = jsonObjs[i][0].spec.containers[0].image;
            infoObject.imagePullPolicy = jsonObjs[i][0].spec.containers[0].imagePullPolicy;
            infoObject.containerPort = jsonObjs[i][0].spec.containers[0].ports[0].containerPort;
            infoObject.portProtocol = jsonObjs[i][0].spec.containers[0].ports[0].protocol;
            infoObject.volumeMount = jsonObjs[i][0].spec.containers[0].volumeMounts[0];
            infoObject.dnsPolicy = jsonObjs[i][0].spec.dnsPolicy;
            infoObject.restartPolicy = jsonObjs[i][0].spec.restartPolicy;
          } catch (error) {
            console.log('Error in pod conditional of parseSchedulerInformation: ', error)
          }
        }
        podsInfoObjs.push(infoObject)
      }
    }
    return podsInfoObjs;
  } catch (error) {
      console.log('Error in parseSchedulerInformation', error)
  }
}