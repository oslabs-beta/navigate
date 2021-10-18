export default class kDeploymentLive {
  namespace: string;
  kind: string
  name: string;

  created: string;
  resourceVersion: string;
  uid: string;
  strategyType: string;
  rollingUpdateMaxSurge: string | number;
  rollingUpdateMaxUnavailable: string | number;
  env: Array<object>;
  dnsPolicy: string;
  restartPolicy: string;
  schedulerName: string;
  
  constructor(namespace = "", kind: string, name: string, created: string, resourceVersion: string,uid: string, 
  strategyType: string, rollingUpdateMaxSurge: string | number, rollingUpdateMaxUnavailable: string | number, env: Array<object>, dnsPolicy: string,
  restartPolicy: string, schedulerName: string )
  {
    this.namespace = namespace;
    this.kind = kind;
    this.name = name;

    this.created = created;
    this.resourceVersion = resourceVersion;
    this.uid = uid;
    this.strategyType = strategyType;
    this.rollingUpdateMaxSurge = rollingUpdateMaxSurge;
    this.rollingUpdateMaxUnavailable = rollingUpdateMaxUnavailable;
    this.env = env;
    this.dnsPolicy = dnsPolicy;
    this.restartPolicy = restartPolicy;
    this.schedulerName = schedulerName;
  }
}