export default class statefulContainer {
  name: string;
  image: string;
  containerPort: number;
  volumeMount: volumeMount;

  constructor(name: string, image: string, port: number, volumeMount:volumeMount){
    this.name = name;
    this.image = image;
    this.containerPort = port;
    this.volumeMount = volumeMount;
  }
}

export class volumeMount {
  mountPath: string;
  name: string;
  
  constructor(mountPath: string, name: string){
    this.mountPath = mountPath;
    this.name = name; 
  }
}
