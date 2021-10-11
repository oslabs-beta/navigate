import * as React from "react";
import {FC} from 'react';
import Cytoscape from 'cytoscape';
import { useEffect, useRef, useCallback, useState } from "react";
import SidebarClusterView from "./SidebarClusterView";
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';

Cytoscape.use(dagre);
Cytoscape.use(cola);

function ClusterView(props: any) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const relevantData: any[] = [
    {
      data: { id: "master", label: "Control Plane" },
    },
  ];

  const populateArray = (array:any[]): void => {
    for(let i = 0; i < array.length; i++){
      console.log('looped')
      let newNode = {
        data: {
          id: array[i].label,
          label: array[i].podLabel,
        },
      };
      let edge = {
        data: {
          source: 'master',
          target: array[i].label,
          label: `Edge from master to ${array[i].label}`
        }
      }
      relevantData.push(newNode,edge);
    }
  }
  useEffect(() => {
    populateArray(props.dataArray);
    const config: Cytoscape.CytoscapeOptions = {
      container: containerRef.current,
      style: [
        {
          selector: "node",
          style: {
            width: "30%",
            height: "30%",
            "font-size": "18",
            "font-weight": "bold",
            content: 'data(label)',
            "text-valign": "center",
            "text-wrap": "wrap",
            "text-max-width": "140",
            "background-color": "lightgreen",
            "border-color": "green",
            "border-width": "2",
            color: "black",
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            color: "blue",
            "text-background-color": "#ffffff",
            "text-background-opacity": 1,
            "text-background-padding": "3",
            width: "3",
            "target-arrow-shape": "triangle",
            "line-color": "green",
            "target-arrow-color": "darkgreen",
            "font-weight": "bold",
          },
        },
      ],
      //write logic based on relevant data
      elements: relevantData,
    };
    let cy = Cytoscape(config);
    let layout = cy.layout({name:'cola'});
    layout.run();
    cy.on('click',(event)=> {
      console.log(event.target._private.data.label);
      if(event.target._private.data.label !== undefined){
        props.setTrigger(true);
      }

    })
  }, [props.dataArray]);

  return(
    <div> 
      <h1>Cluster View</h1>
      <div
        ref={containerRef}
        style={ { display:'inline-block', float: 'right', width: '600px', height: '600px' }}
      />   
      <SidebarClusterView deploymentStatus={props.deploymentStatus}/>
    </div>
    
)
}

export default ClusterView;

