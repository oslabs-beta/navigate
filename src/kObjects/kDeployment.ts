import container from './container';
import type {kObject} from './kObject';

export default class kDeployment implements kObject {
  namespace: string;
  kind: string
  label: string;
  podLabel: string;
  replicas: number;
  container: container;

  created: string;
  uid: string;
  stragetyType: string;
  rollingUpdateMaxSurge: string | number;
  rollingUpdateMaxUnavailable: string | number;
  env: Array<object>;
  dnsPolicy: string;
  restartPolicy: string;
  schedulerName: string;
  
  constructor(namespace = "", kind: string, label: string, podLabel: string, replicas: number, container: container, created: string, uid: string, 
  stragetyType: string, rollingUpdateMaxSurge: string | number, rollingUpdateMaxUnavailable: string | number, env: Array<object>, dnsPolicy: string,
  restartPolicy: string, schedulerName: string )
  {
    this.namespace = namespace;
    this.kind = kind;
    this.label = label;
    this.replicas = replicas;
    this.podLabel = podLabel;
    this.container = container;

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
  
  getLabel(): string
  {
    return this.label;
  }
}