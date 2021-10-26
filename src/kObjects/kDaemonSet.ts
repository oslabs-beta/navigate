import type {kObject} from './kObject';

export class kDaemonSet implements kObject {
  label: string;
  namespace: string;
  kind: string;
  
  constructor(label: string, namespace: string, kind: string)
  {
    this.label = label;
    this.namespace= namespace;
    this.kind = kind;
  }
  getLabel(): string
  {
    return this.label;
  }
}