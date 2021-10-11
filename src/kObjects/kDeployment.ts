import container from './container';
import type {kObject} from './kObject';

export class kDeployment implements kObject {
  label: string;
  podLabel: string;
  replicas: number;
  container: container;
  
  constructor(label: string, podLabel: string, replicas: number, container: container)
  {
    this.label = label;
    this.replicas = replicas;
    this.podLabel = podLabel;
    this.container = container;
  }
  
  getLabel(): string
  {
    return this.label;
  }
}