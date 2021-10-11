const {spawn} = require('child_process');

//default command
const command = `kubectl`;

export default function runCommand(command: string): void {
  //command: the shell command we want to run
  const scheduler = spawn(command);

  scheduler.stdout.on("data", (data: any) => {
    console.log(`stdout: ${data}`);
  });
  
  scheduler.stderr.on("data", (data: any) => {
    console.log(`stderr: ${data}`);
  });
  
  scheduler.on("error", (err: any) => {
    console.log(`error: ${err}`);
  });
  
  scheduler.on("close", (closeCode: number) => {
    console.log(`process exited with code ${closeCode}`);
  });
  
}

import getYAMLData from './yamlParser';

export function getDeploymentNames(): void//metadata[]
{
  runCommand(command);
  // const output: metadata[] = [];
  // let data = getYAMLData();
  // data.forEach((json: any) => {
    // if(json.kind === "Deployment"){
      // output.push(new metadata(json[0].metadata.name, json[0].metadata.namespace));
    // }
  // });

  // for(let i = 0; i < output.length; i++){
    // runCommand(`kubectl >> SomeFile.txt`)//get pod --namespace=${output[i].namespace} &>> SomeFile.txt`);
  // }

  // return output;
}

class metadata {
  name: string;
  namespace: string;

  constructor(name: string, namespace: string){
    this.name = name;
    this.namespace = namespace;
  }
}
