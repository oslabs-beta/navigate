// import * as kObjects from '../src/kObjects/__index';
class kPodLive {
    namespace;
    kind

    //metadata
    name;
    created;
    ownerReferences;
    resourceVersion;
    uid;
    labelForMatching;

    //container
    container;
    env;
    image;
    imagePullPolicy;

    //spec
    dnsPolicy;
    nodeNode;
    premptionPolicy;
    restartPolicy;
    schedulerName;
    serviceAccount;
    serviceAccountName;

    //volume
    volumeNames;
    volumeMountPath;
    volumeReadOnly;

    //containerStatus
    containerID;
    imageID;
    containerRunStarted;
    
    //IP
    hostIP;
    phase;
    podIP;

    
    constructor(namespace = "", kind, name, created,ownerReferences,
     resourceVersion,uid, labelForMatching, container, env, image, imagePullPolicy,
     dnsPolicy, nodeNode, premptionPolicy, restartPolicy, schedulerName,
     serviceAccount, serviceAccountName, volumeNames, volumeMountPath,
     volumeReadOnly, containerID, imageID, containerRunStarted, hostIP,
     phase, podIP){
      this.namespace = namespace;
      this.kind = kind;
      this.name = name;
      this.created = created;
      this.ownerReferences = ownerReferences;
      this.resourceVersion = resourceVersion;
      this.uid = uid;
      this.labelForMatching = labelForMatching;

      this.container = container;
      this.env = env;
      this.image = image;
      this.imagePullPolicy = imagePullPolicy;
      this.dnsPolicy = dnsPolicy;
      this.nodeNode = nodeNode;
      this.premptionPolicy = premptionPolicy;
      this.restartPolicy = restartPolicy;
      this.schedulerName  = schedulerName;
      this.serviceAccount = serviceAccount;
      this.serviceAccountName = serviceAccountName;

      this.volumeNames = volumeNames;
      this.volumeMountPath = volumeMountPath;
      this.volumeReadOnly = volumeReadOnly;

      this.containerID = containerID;
      this.imageID = imageID;
      this.containerRunStarted = containerRunStarted;

      this.hostIP = hostIP;
      this.phase = phase;
      this.podIP = podIP;
    }
  }

  module.exports = kPodLive;