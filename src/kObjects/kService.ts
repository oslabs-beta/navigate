export default class kService {
  type: serviceType;
  name: string;
  port: number;
  targetPort: number;
  selectorName: string;

  constructor(metadataName: string, port: number, targetPort: number, selectorName: string, type = serviceType.clusterIP){
    this.type = type;
    this.name = metadataName;
    this.port = port;
    this.targetPort = targetPort;
    this.selectorName = selectorName;
  }
}

export enum serviceType {
  clusterIP, loadBalancer, nodePort
}