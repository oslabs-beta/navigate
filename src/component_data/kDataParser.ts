import * as kObjects from '../kObjects/__index';
import {kObject} from "../kObjects/kObject";

const kObjArray: kObject[] = [];

export function parseData(relevantData: kObjects.anyObject[]): kObject[]
{
    for(let i = 0; i < relevantData.length; i++){
    // Since each YAML file can have multiple objects, [0] assumes that there is only one object per file.
    let ele = relevantData[i][0];
    // Checks to see if kubernetes object is a deployment 
    if(ele.kind === 'Deployment') {
      const newEnv = new kObjects.env(
        ele.spec.template.spec.containers[0].env[0].name,
        ele.spec.template.spec.containers[0].env[0].value,
      );
      const newContainer = new kObjects.container(
        ele.spec.template.spec.containers[0].name,
        ele.spec.template.spec.containers[0].image,
        newEnv,
        ele.spec.template.spec.containers[0].ports[0].containerPort,
      );
      const newDeployment = new kObjects.kDeployment(
        ele.metadata.namespace,
        ele.kind,
        ele.metadata.name,
        ele.spec.template.metadata.labels.name,
        ele.spec.replicas,
        newContainer,
      );
      kObjArray.push(newDeployment);
    }
    else if(ele.kind === 'StatefulSet') {
      const newVolumeMount = new kObjects.volumeMount(
        ele.spec.template.spec.containers[0].volumeMounts[0].mountPath,
        ele.spec.template.spec.containers[0].volumeMounts[0].name,
      )
      const newStatefulContainer = new kObjects.statefulContainer(
        ele.spec.template.spec.containers[0].name,
        ele.spec.template.spec.containers[0].image,
        ele.spec.template.spec.containers[0].ports[0].containerPort,
        newVolumeMount
      )
      const newVolumeClaimTemplates = new kObjects.volumeClaimTemplates(
        ele.spec.volumeClaimTemplates[0].metadata.name,
        ele.spec.volumeClaimTemplates[0].spec.accessModes,
        ele.spec.volumeClaimTemplates[0].spec.resources.requests.storage
      )
      const newKStatefulSet = new kObjects.kStatefulSet(
        ele.metadata.namespace,
        ele.kind,
        ele.metadata.name,
        ele.spec.replicas,
        ele.spec.serviceName,
        newStatefulContainer,
        newVolumeClaimTemplates
      )
      kObjArray.push(newKStatefulSet)
    }
    else if(ele.kind === 'Service'){
      // console.log(ele)
      const newkSerivce = new kObjects.kService(
        ele.metadata.namespace,
        ele.metadata.name,
        ele.kind,
        ele.spec.ports[0].port,
        ele.spec.ports[0].targetPort,
        ele.spec.selector.name ? ele.spec.selector.name : ele.spec.selector['app.kubernetes.io/name'],
        ele.spec.type,
      )
      kObjArray.push(newkSerivce)
    }
    else{
      console.log("ele: ",ele)
    }
  }
  return kObjArray;
}