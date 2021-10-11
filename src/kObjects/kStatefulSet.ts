import type {kObject} from './kObject';

export class kStatefulSet implements kObject {
  label: string;
  replicas: number;
  //points to namespace and namespace points to statefulset
  //namespace
  //service name(under spec)
  //container {
  // name,image,port,targetport,volumeMount:{mountPath(string), name(string)} 
  //}
  //volumeClaimTemplates:{metadata:name,spec:accessModes(string[]),resources:requests:storage(string)}
  constructor(label: string, replicas: number)
  {
    this.label = label;
    this.replicas = replicas;
  }
  getLabel(): string
  {
    return this.label;
  }
}