import type {kObject} from './kObject';

export class kDaemonSet implements kObject {
  label: string;
  
  constructor(label: string)
  {
    this.label = label;
  }
  getLabel(): string
  {
    return this.label;
  }
}