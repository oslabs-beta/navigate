import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';
import kDeploymentLive from './kDeploymentLive';
import getFiles from './yamlParser'

const root = './navigate_logs';

// export default function getPodDeployFiles(): any{
//   const raw: string[] = [];
//   fs.readdirSync(root).forEach(file => {
//     if(file.match(/js?on/)) 
//       raw.push(file);
//   });
//   const jsonObjs: Array<object> = [];
//   raw.forEach(file => {
//     jsonObjs.push(YAML.loadAll(fs.readFileSync(path.join(root, file), 'utf-8')));
//   })
//   return parsePodInformation(jsonObjs);
// }

// getFiles(/js?on/)

function parsePodInformation(jsonObjs: any): Array<kDeploymentLive>{
    const podsInfoObjs:  Array<kDeploymentLive> = [];
    for(let i = 0; i < jsonObjs.length; i++){
      const ele = jsonObjs[i][0];
        if(ele.kind === 'Deployment'){
            const infoObject = new kDeploymentLive(
              ele.metadata.namespace,
              ele.kind,
              ele.metadata.name,
              ele.metadata.creationTimestamp,
              ele.metadata.resourceVersion,
              ele.metadata.uid,
              ele.spec.strategy.type,
              ele.spec.strategy.rollingUpdate.maxSurge,
              ele.spec.strategy.rollingUpdate.maxUnavailable,
              ele.spec.template.spec.containers[0].env,
              ele.spec.template.spec.dnsPolicy,
              ele.spec.template.spec.restartPolicy,
              ele.spec.template.spec.schedulerName,
            )
            podsInfoObjs.push(infoObject)
          }
  }
  return podsInfoObjs;
}