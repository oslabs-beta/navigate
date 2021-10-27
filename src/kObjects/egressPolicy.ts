export default class EgressPolicy{ 
  ipBlock: string;
  protocol: string;
  port: number;
  
  constructor(ipBlock: string, protocol: string, port: number){
    this.ipBlock = ipBlock;
    this.protocol = protocol;
    this.port = port;
  }

}