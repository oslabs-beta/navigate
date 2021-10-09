import * as React from "react";
import {FC} from 'react';
import {kObject} from '../kObjects/kObject';
import { kDeployment } from "../kObjects/kDeployment";

//fetch with controllermiddleware 

function Deployment(props: any) {
  const [deployment, updateDeployment] = React.useState(new kDeployment("","",-1));
  const [podArray, updatePods] = React.useState([]);

  return(
    <div>{deployment}</div>
  );
}

export default Deployment;