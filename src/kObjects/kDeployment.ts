import container from './container';
import type {kObject} from './kObject';

export default class kDeployment implements kObject {
  namespace: string;
  kind: string
  label: string;
  podLabel: string;
  replicas: number;
  container: container;
  selectorName: string;

  
  constructor(namespace = "", kind: string, label: string, podLabel: string, replicas: number, container: container, selectorName: string)
  {
    this.namespace = namespace;
    this.kind = kind;
    this.label = label;
    this.podLabel = podLabel;
    this.replicas = replicas;
    this.container = container;
    this.selectorName = selectorName;

  }
  
  getLabel(): string
  {
    return this.label;
  }
}