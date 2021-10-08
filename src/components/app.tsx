import * as React from "react";
import {FC} from 'react';
import { kDeployment } from "../kObjects/kDeployment";
import {kObject} from '../kObjects/kObject';
import * as YAML from '../../server/yamlParser';
import * as data from '../../server/yaml.json';
import Deployment from './Deployment';

function App(props: any) {
  const kDeployArray: kDeployment[] = [];
  const deploymentArray: any[] = [];

  React.useEffect(getDeployments, []);

  function getDeployments(): void {
    let relevantData: any[] = [];

    try{
      // relevantData = data["default"];
    }
    catch{
      // relevantData = YAML.getYAMLData()["default"];
    }
   
    relevantData.forEach((ele: any) => {
        const newDeployment = new kDeployment(ele.metadata.name, ele.spec.template.metadata.labels.name, ele.spec.replicas);
        kDeployArray.push(newDeployment);
    });

    kDeployArray.forEach((ele: kDeployment) => {
      deploymentArray.push(<Deployment deployment={ele} handleClick={handleClick}/>);
    })
  }

  function handleClick(obj: kObject): void {
    console.log(obj.getLabel());
  }

  return(
      <div>{deploymentArray}</div>
  )
}

export default App;