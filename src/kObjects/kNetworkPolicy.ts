import EgressPolicy from './egressPolicy';
import IngressPolicy from './ingressPolicy';
import type {kObject} from './kObject';

export default class kNetworkPolicy implements kObject {
  namespace: string;
  kind: string
  label: string;
  podSelectors: object;
  policyTypes: Array<string>;
  ingressPolicy: IngressPolicy;
  egressPolicy: EgressPolicy;
  
  constructor(namespace: string, kind: string, label: string, podSelectors: object, policyTypes: Array<string>, ingressPolicy: IngressPolicy, egressPolicy: EgressPolicy)
  {
    this.namespace = namespace;
    this.kind = kind;
    this.label = label;
    this.podSelectors = podSelectors;
    this.policyTypes = policyTypes;
    this.ingressPolicy = ingressPolicy;
    this.egressPolicy= egressPolicy;
  }
  
  getLabel(): string
  {
    return this.label;
  }
}