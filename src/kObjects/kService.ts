import type {kObject} from './kObject'
export default class kService implements kObject {
  namespace: string;
  label: string;
  kind: string;
  port: number;
  targetPort: number;
  selectors: object;
  type: serviceType;

  constructor(namespace: string,label: string, kind:string, port: number, targetPort: number, selectors: object, type = serviceType.ClusterIP){
    this.namespace = namespace;
    this.label = label;
    this.kind = kind;
    this.port = port;
    this.targetPort = targetPort;
    this.selectors = selectors;
    this.type = type;
  }
  getLabel(): string
  {
    return this.label;
  }
}

export enum serviceType {
  ClusterIP, LoadBalancer, NodePort
}