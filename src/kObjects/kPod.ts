import type {kObject} from './kObject';

export default class kPod implements kObject {
  label: string;
  identifier: string;
  currentHealthState: HealthState;

  constructor(label: string, identifier: string){
    this.label = label;
    this.identifier = identifier;
    this.currentHealthState = HealthState.Healthy;
  }

  getLabel = (): string => {
    return this.label;
  }

}

export enum HealthState {
  Healthy,
  Unhealty
}