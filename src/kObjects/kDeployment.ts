import container from './container';
import type {kObject} from './kObject';

export default class kDeployment implements kObject {
  namespace: string;
  kind: string
  label: string;
  podLabel: string;
  replicas: number;
  container: container;

  
  constructor(namespace = "", kind: string, label: string, podLabel: string, replicas: number, container: container)
  {
    this.namespace = namespace;
    this.kind = kind;
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