export default class volumeClaimTemplates {
  name: string;
  accessMode: string[];
  //storage type; metadata?.spec.volumeClainTemplates.metadata?.spec.resources.requests.storage
  storage: any;
  
  constructor(name: string, accessMode: string[], storage: any){
    this.name = name;
    this.accessMode = accessMode;
    this.storage = storage;
  }
}
