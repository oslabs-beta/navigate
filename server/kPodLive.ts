import * as kObjects from '../src/kObjects/__index';
export default class kPodLive {
    namespace: string;
    kind: string

    //metadata
    name: string;
    created: string;
    ownerReferences: Array<object>;
    resourceVersion: string | number;
    uid: string;

    //container
    container: string;
    env: Array<kObjects.anyObject>;
    image: string;
    imagePullPolicy: string;

    //spec
    dnsPolicy: string;
    nodeNode: string;
    premptionPolicy: string;
    restartPolicy: string;
    schedulerName: string;
    serviceAccount: string;
    serviceAccountName: string;

    //volume
    volumeNames: Array<string>;
    volumeMountPath: Array<string>;
    volumeReadOnly: Array<boolean>;

    //containerStatus
    containerID: string;
    imageID: string;
    containerRunStarted: string;
    
    //IP
    hostIP: string;
    phase: string;
    podIP: string;

    
    constructor(namespace = "", kind: string, name: string, created: string,ownerReferences: Array<object>,
     resourceVersion: string,uid: string, container: string, env: Array<object>, image: string, imagePullPolicy: string,
     dnsPolicy: string, nodeNode: string, premptionPolicy: string, restartPolicy: string, schedulerName: string,
     serviceAccount: string, serviceAccountName: string, volumeNames: Array<string>, volumeMountPath: Array<string>,
     volumeReadOnly: Array<boolean>, containerID: string, imageID: string, containerRunStarted: string, hostIP: string,
     phase: string, podIP: string){
      this.namespace = namespace;
      this.kind = kind;
      this.name = name;
      this.created = created;
      this.ownerReferences = ownerReferences;
      this.resourceVersion = resourceVersion;
      this.uid = uid;

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