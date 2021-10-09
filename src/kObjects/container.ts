export default class Container {
  name: string;
  image: string;
  env: env;
  containerPort: number;

  constructor(name: string, image: string, env: env, port: number){
    this.name = name;
    this.image = image;
    this.env = env;
    this.containerPort = port;
  }
}

export class env {
  name: string;
  value: string;

  constructor(name: string, value: string){
    this.name = name; 
    this.value = value;
  }
}
