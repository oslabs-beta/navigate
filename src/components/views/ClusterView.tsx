import * as React from "react";
import {FC} from 'react';
import {kObject} from '../../kObjects/kObject';
import {kDeployment} from '../../kObjects/kDeployment';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { useEffect, useRef, useCallback, useState } from "react";

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

  // const [elements, setElements] = useState([]);

  const containerRef = React.useRef<HTMLDivElement>(null);;
  useEffect(() => {
    const config = {
      container: containerRef.current,
      style: [
        {
          selector: "node",
          style: { 
            'content': "data(label)",
            'background-color': 'green',
          },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'color': 'blue',
            'text-background-color': '#ffffff',
            'text-background-opacity': '1',
            'text-background-padding': '3',
            'width': '3',
            'target-arrow-shape': 'triangle',
            'line-color': 'darkgreen',
            'target-arrow-color': 'darkgreen',
            'font-weight': 'bold'
          }
        },
      ],
      //write logic based on relevant data
      elements: [
        //how to make a node
        //id: anything unique ,label: name
        { data: { id: 'master', label: 'Control Plane' }, position: { x: 50, y: 50 } },
        { data: { id: 'one', label: 'Node 1' }, position: { x: 150, y: 150 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 250, y: 150 } },
        { data: { id: 'three', label: 'Node 3' }, position: { x: 50, y: 300 } },
        { data: { id: 'four', label: 'Node 4' }, position: { x: 250, y: 300 } },
        { data: { id: 'five', label: 'Node 5' }, position: { x: 150, y: 450 } },
        //how to make a connection
        { data: { source: 'master', target: 'one', label: 'Edge from Control Plane to Node2' } },
        { data: { source: 'master', target: 'two', label: 'Edge from Control Plane to Node3' } },
        { data: { source: 'master', target: 'three', label: 'Edge from Control Plane to Node4' } },
        { data: { source: 'master', target: 'four', label: 'Edge from Control Plane to Node5' } },
        { data: { source: 'master', target: 'five', label: 'Edge from Control Plane to Node6' } },
      ],
    };
    let cy = Cytoscape(config);
    cy.on('click',(event)=> {
      console.log(event.target._private.data.label);

    })
  }, []);

  return(
    <div> 
      <h1>Cluster View</h1>
      <div
        ref={containerRef}
        style={ { width: '600px', height: '600px' }}
      />   
    </div>
    
)
}

export default ClusterView;

