import * as React from "react";
import {FC} from 'react';
import {kObject} from '../../kObjects/kObject';
import {kDeployment} from '../../kObjects/kDeployment';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { useEffect, useRef, useCallback, useState } from "react";
import SidebarClusterView from "./SidebarClusterView";

function ClusterView(props: any) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const relevantData: any[] = [
    {
      data: { id: "master", label: "Control Plane" },
      position: { x: 200, y: 150 },
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
        position: {
          x: Math.floor(Math.random() * (100 * i)),
          y: Math.floor(Math.random() * (100 * i)),
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
    console.log('dataArray',props.dataArray);
    populateArray(props.dataArray);

    console.log('relevantData',relevantData);
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
            'line-color': 'green',
            'target-arrow-color': 'darkgreen',
            'font-weight': 'bold'
          }
        },
      ],
      //write logic based on relevant data
      elements: relevantData,
    };
    let cy = Cytoscape(config);
    cy.on('click',(event)=> {
      console.log(event.target._private.data.label);

    })
  }, [props.dataArray]);

  return(
    <div> 
      <h1>Cluster View</h1>
      <div
        ref={containerRef}
        style={ { display:'inline-block', float: 'right', width: '600px', height: '600px' }}
      />   
      <SidebarClusterView />
    </div>
    
)
}

export default ClusterView;

