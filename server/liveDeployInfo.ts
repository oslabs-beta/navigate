export default class kDeploymentLive {
  namespace: string;
  kind: string
  name: string;

  created: string;
  uid: string;
  stragetyType: string;
  rollingUpdateMaxSurge: string | number;
  rollingUpdateMaxUnavailable: string | number;
  env: Array<object>;
  dnsPolicy: string;
  restartPolicy: string;
  schedulerName: string;
  
  constructor(namespace = "", kind: string, name: string, created: string, uid: string, 
  stragetyType: string, rollingUpdateMaxSurge: string | number, rollingUpdateMaxUnavailable: string | number, env: Array<object>, dnsPolicy: string,
  restartPolicy: string, schedulerName: string )
  {
    this.namespace = namespace;
    this.kind = kind;
    this.name = name;

    this.created = created;
    this.uid = uid;
    this.stragetyType = stragetyType;
    this.rollingUpdateMaxSurge = rollingUpdateMaxSurge;
    this.rollingUpdateMaxUnavailable = rollingUpdateMaxUnavailable;
    this.env = env;
    this.dnsPolicy = dnsPolicy;
    this.restartPolicy = restartPolicy;
    this.schedulerName = schedulerName;
  }
  
}