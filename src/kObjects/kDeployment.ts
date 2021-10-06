import type {kObject} from './kObject';

export class kDeployment implements kObject {
  label: string;
  podLabel: string;
  replicas: number;
  
  constructor(label: string, podLabel: string, replicas: number)
  {
    this.label = label;
    this.replicas = replicas;
    this.podLabel = podLabel;
  }
  
  getLabel(): string
  {
    return this.label;
  }
}