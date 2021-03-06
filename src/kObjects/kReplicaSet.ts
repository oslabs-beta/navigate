import type {kObject} from './kObject';

export class kReplicaSet implements kObject {
  label: string;
  replicas: number;
  
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