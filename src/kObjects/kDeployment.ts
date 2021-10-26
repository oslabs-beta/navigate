import container from './container';
import type {kObject} from './kObject';

export default class kDeployment implements kObject {
  namespace: string;
  kind: string
  label: string;
  podLabel: string;
  replicas: number;
  container: container;
  selectors: object;

  
  constructor(namespace = "", kind: string, label: string, podLabel: string, replicas: number, container: container, selectors: object)
  {
    this.namespace = namespace;
    this.kind = kind;
    this.label = label;
    this.podLabel = podLabel;
    this.replicas = replicas;
    this.container = container;
    this.selectors = selectors;
  }
  
  getLabel(): string
  {
    return this.label;
  }
}