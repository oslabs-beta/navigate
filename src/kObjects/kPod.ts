import type {kObject} from './kObject';

export class kPod implements kObject {
  label: string;
  identifier: string;
  currentHealthState: HealthState;
  ownerLabel: ownerRef;

  constructor(label: string, identifier: string){
    this.label = label;
    this.identifier = identifier;
    this.currentHealthState = HealthState.Healthy;
  }

  getLabel = (): string => {
    return this.label;
  }

  setOwner = (reference: ownerRef): void => {
    this.ownerLabel = reference;
  }
}

export class ownerRef {
  name: string; 
  UID: string;
}

export enum HealthState {
  Healthy,
  Unhealty
}