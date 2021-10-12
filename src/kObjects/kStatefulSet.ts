import type {kObject} from './kObject';
import statefulContainer from './statefulContainer'
import volumeClaimTemplates from './volumeClaimTemplates';
export class kStatefulSet implements kObject {
  //name: redis-stateful-set
  namespace: string;
  kind :string;
  label: string;
  replicas: number;
  serviceName: string;
  container: statefulContainer;
  volumeClaimTemplates: volumeClaimTemplates;
  //points to namespace and namespace points to statefulset
  constructor(namespace= "",kind: string, label: string, replicas: number, serviceName: string, container: statefulContainer, volumeClaimTemplates: volumeClaimTemplates)
  {
    this.namespace = namespace;
    this.kind = kind;
    this.label = label;
    this.replicas = replicas;
    this.serviceName = serviceName;
    this.container = container;
    this.volumeClaimTemplates = volumeClaimTemplates;
  }
  getLabel(): string
  {
    return this.label;
  }
}