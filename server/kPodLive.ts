export default class kPodLive {
    namespace: string;
    kind: string

    //metadata
    name: string;
    created: string;
    ownerReferences: Array<object>;
    resourceVersion: string | number;
    uid: string;

    //spec


    
    
    constructor(namespace = "", kind: string, name: string, created: string,ownerReferences: Array<object>,
     resourceVersion: string,uid: string)
    {
      this.namespace = namespace;
      this.kind = kind;
      this.name = name;
  
      this.created = created;
      this.ownerReferences = ownerReferences;
      this.resourceVersion = resourceVersion;
      this.uid = uid;
    }
    
  }