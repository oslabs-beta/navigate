export default class IngressPolicy { 
  ipBlock: string;
  except: string;
  namespaceSelectors: Array<string>;
  podSelectors: Array<string>;
  protocol: string;
  port: number;
  
  constructor(ipBlock: string, except: string, namespaceSelectors: Array<string>, podSelectors: Array<string>, protocol: string, port: number){
    this.ipBlock = ipBlock;
    this.except = except;
    this.namespaceSelectors = namespaceSelectors;
    this.podSelectors = podSelectors;
    this.protocol = protocol;
    this.port = port;
  }
}