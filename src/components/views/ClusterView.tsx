import * as React from "react";
import {FC} from 'react';
import {kObject} from '../../kObjects/kObject';
import {kDeployment} from '../../kObjects/kDeployment';
import Deployment from '../Deployment';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { useEffect, useRef } from "react";

function ClusterView(props: any) {
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

  }
  const elements = [
    //how to make a node
    { data: { id: 'one', label: 'Control Plane' }, position: { x: 150, y: 300 } },
    { data: { id: 'two', label: 'Node 1' }, position: { x: 150, y: 150 } },
    { data: { id: 'three', label: 'Node 2' }, position: { x: 250, y: 150 } },
    { data: { id: 'four', label: 'Node 3' }, position: { x: 50, y: 300 } },
    { data: { id: 'five', label: 'Node 4' }, position: { x: 250, y: 300 } },
    { data: { id: 'six', label: 'Node 5' }, position: { x: 150, y: 450 } },
    //how to make a connection
    { data: { source: 'one', target: 'two', label: 'Edge from Control Plane to Node2' } },
    { data: { source: 'one', target: 'three', label: 'Edge from Control Plane to Node3' } },
    { data: { source: 'one', target: 'four', label: 'Edge from Control Plane to Node4' } },
    { data: { source: 'one', target: 'five', label: 'Edge from Control Plane to Node5' } },
    { data: { source: 'one', target: 'six', label: 'Edge from Control Plane to Node6' } },
  ];
  const cyRef = useRef<CytoscapeRef | null>();

  const setUpListeners = () => {
    cytoscapeRef.current.cy.on('click', 'node', (event) => {
      console.log(event.target)
    })
  }
  useEffect(() => {
    setUpListeners();
    return () => {
      console.log('cleanup')
    }
  }, [])
  return(
      <div>
        <h1>Cluster View</h1>
         <CytoscapeComponent
         ref={cytoscapeRef} 
         elements={elements} 
         style={ { width: '600px', height: '600px' } } 
         cy={(cy) => {cytoscapeRef.current.cy = cy}}
         />;
      </div>
  )
}

export default ClusterView;