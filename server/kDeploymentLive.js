
export default class kDeploymentLive {
  namespace;
  kind
  name;

  created;
  resourceVersion;
  uid;
  strategyType;
  rollingUpdateMaxSurge;
  rollingUpdateMaxUnavailable;
  env;
  dnsPolicy;
  restartPolicy;
  schedulerName;
  
  constructor(namespace = "", kind, name, created, resourceVersion,uid, 
  strategyType, rollingUpdateMaxSurge, rollingUpdateMaxUnavailable, env, dnsPolicy,
  restartPolicy, schedulerName){
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