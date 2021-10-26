import * as kObjects from "../kObjects/__index";
import { kObject } from "../kObjects/kObject";
import { appendFile } from "fs";
import IngressPolicy from "../kObjects/ingressPolicy";
import EgressPolicy from "../kObjects/egressPolicy";

const kObjArray: kObject[] = [];

export function parseData(relevantData: any[]): kObject[] {
  for (let i = 0; i < relevantData.length; i++) {
    let eleArr = relevantData[i];
    for (let j = 0; j < eleArr.length; j++) {
      let ele = eleArr[j];
      if (ele.kind === "Deployment") {
        const newEnv = new kObjects.env(
          ele.spec.template.spec.containers[0].env 
            ? ele.spec.template.spec.containers[0].env[0].name
            : "none",
          ele.spec.template.spec.containers[0].env
            ? ele.spec.template.spec.containers[0].env[0].value
            : "none",
        );
        const newContainer = new kObjects.container(
          ele.spec.template.spec.containers[0].name,
          ele.spec.template.spec.containers[0].image,
          newEnv,
          ele.spec.template.spec.containers[0].ports
            ? ele.spec.template.spec.containers[0].ports[0].containerPort
            : "not specified" 
        );
        const newDeployment = new kObjects.kDeployment(
          ele.metadata.namespace ? ele.metadata.namespace : "default",
          ele.kind,
          ele.metadata.name,
          //placeholder offline podname
          ele.metadata.name,
          ele.spec.replicas 
            ? ele.spec.replicas 
            : 1,
          newContainer,
          ele.metadata.labels
            ? ele.metadata.labels
            : ele.spec.selector.matchLabels,
        );
        kObjArray.push(newDeployment);
      } else if (ele.kind === "StatefulSet") {
        const newVolumeMount = new kObjects.volumeMount(
          ele.spec.template.spec.containers[0].volumeMounts[0].mountPath,
          ele.spec.template.spec.containers[0].volumeMounts[0].name
        );
        const newStatefulContainer = new kObjects.statefulContainer(
          ele.spec.template.spec.containers[0].name,
          ele.spec.template.spec.containers[0].image,
          ele.spec.template.spec.containers[0].ports[0].containerPort,
          newVolumeMount
        );
        const newVolumeClaimTemplates = new kObjects.volumeClaimTemplates(
          ele.spec.volumeClaimTemplates[0].metadata.name,
          ele.spec.volumeClaimTemplates[0].spec.accessModes,
          ele.spec.volumeClaimTemplates[0].spec.resources.requests.storage
        );
        const newKStatefulSet = new kObjects.kStatefulSet(
          ele.metadata.namespace ? ele.metadata.namespace : "default",
          ele.kind,
          ele.metadata.name,
          ele.spec.replicas ? ele.spec.replicas : 1,
          ele.spec.serviceName,
          newStatefulContainer,
          newVolumeClaimTemplates
        );
        kObjArray.push(newKStatefulSet);
      } else if (ele.kind === "Service") {
        const newkSerivce = new kObjects.kService(
          ele.metadata.namespace ? ele.metadata.namespace : "default",
          ele.metadata.name,
          ele.kind,
          ele.spec.ports[0].port,
          ele.spec.ports[0].targetPort,
          ele.spec.selector,
          ele.spec.type,
        );
        kObjArray.push(newkSerivce);
      } else if(ele.kind === "DaemonSet"){
        const newkDaemonSet = new kObjects.kDaemonSet(
          ele.metadata.name,
          ele.metadata.namespace ? ele.metadata.namespace : "default",
          ele.kind,
          //want more info?
        );
        kObjArray.push(newkDaemonSet);
      } else if(ele.kind === "NetworkPolicy"){
        console.log(ele)
        const newIngressPolicy = new IngressPolicy(
          ele.spec.ingress[0].from[0].ipBlock.cidr,
          ele.spec.ingress[0].from[0].ipBlock.except[0],
          ele.spec.ingress[0].from[1].namespaceSelector.matchLabels,
          ele.spec.ingress[0].from[2].podSelector.matchLabels,
          ele.spec.ingress[0].ports[0].protocol,
          ele.spec.ingress[0].ports[0].port,
        )
        const newEgressPolicy = new EgressPolicy(
          ele.spec.egress[0].to[0].ipBlock.cidr,
          ele.spec.egress[0].ports[0].protocol,
          ele.spec.egress[0].ports[0].port,
        )
        const newNetworkPolicy = new kObjects.NetworkPolicy(
          ele.metadata.namespace,
          ele.kind,
          ele.metadata.name,
          ele.spec.podSelector.matchLabels,
          ele.spec.policyTypes,
          newIngressPolicy,
          newEgressPolicy,
        )
        console.log('network',newNetworkPolicy)
        kObjArray.push(newNetworkPolicy)
      } else {
        console.log("rejected: "); //ele
      }
    }
  }
  return kObjArray;
}
