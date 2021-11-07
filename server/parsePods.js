// import kPodLive from './kPodLive'
const kPodLive = require('./kPodLive');

function parsePodInformation(jsonObjs){
    const podsInfoObjs = [];
    for(let i = 0; i < jsonObjs.length; i++){
      const ele = jsonObjs[i][0];
      if(ele.kind === 'Pod'){
        const infoObject = new kPodLive(
            ele.metadata.namespace,
            ele.kind,
            ele.metadata.name,
            ele.metadata.creationTimestamp,
            ele.metadata.ownerReferences,
            ele.metadata.resourceVersion,
            ele.metadata.uid,
            ele.metadata.labels,
            ele.spec.containers[0].name,
            ele.spec.containers[0].env,
            ele.spec.containers[0].image,
            ele.spec.containers[0].imagePullPolicy,
            ele.spec.dnsPolicy,
            ele.spec.nodeName,
            ele.spec.premptionPolicy,
            ele.spec.restartPolicy,
            ele.spec.schedulerName,
            ele.spec.serviceAccount,
            ele.spec.serviceAccountName,
            ele.spec.containers[0].volumeMounts[0].name,
            ele.spec.containers[0].volumeMounts[0].mountPath,
            ele.spec.containers[0].volumeMounts[0].readOnly,
            ele.status.containerStatuses[0].containerID,
            ele.status.containerStatuses[0].imageID,
            ele.status.containerStatuses[0].state.running.startedAt,
            ele.status.hostIP,
            ele.status.phase,
            ele.status.podIP
        )
        podsInfoObjs.push(infoObject)
    }
  }
  return podsInfoObjs;
}

module.exports = parsePodInformation;