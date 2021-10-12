import * as React from "react";
import {FC} from 'react';
import Cytoscape from 'cytoscape';
import { useEffect, useRef, useCallback, useState } from "react";
import SidebarClusterView from "./SidebarClusterView";
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import {GraphStyles} from "../../scss/GraphStyles";

Cytoscape.use(dagre);
Cytoscape.use(cola);

function ClusterView(props: any) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const relevantData: any[] = [
    {data: { id :"Kubernetes Cluster", label: "Kubernetes Cluster"}},
  ];
  const namespacesArr: string[] = [];
  const populateNamespaces = (array: any[]): void => {
    array.forEach(kObject => {
      if(!namespacesArr.includes(kObject.namespace) && kObject.namespace !== undefined) namespacesArr.push(kObject.namespace);
    })
    namespacesArr.forEach(namespace => {
      relevantData.push({
        data: { id: namespace, label: namespace}},
        {data: {
          source: "Kubernetes Cluster",
          target: namespace,
        }})
    })
  }
  const populateArray = (array:any[]): void => {
    for(let i = 0; i < array.length; i++){
      if(array[i].kind === 'Deployment'){
        let newNode = {
          data: {
            id: array[i].label,
            label: array[i].podLabel,
          },
        };
        let edge = {
          data: {
            source: array[i].namespace,
            target: array[i].label,
            label: `Edge from master to ${array[i].label}`
          }
        }
        relevantData.push(newNode,edge);
      }
      else if(array[i].kind === 'StatefulSet'){
        let newNode = {
          data: {
            id: array[i].label,
            label: array[i].label,
          },
        };
        let edge = {
          data: {
            source: array[i].namespace,
            target: array[i].label,
            label: `Edge from master to ${array[i].label}`
          }
        }
        let edge2 = {
          data: {
            source: array[i].label,
            target: array[i].namespace,
            label: `Edge from master to ${array[i].label}`
          }
        }
        relevantData.push(newNode,edge,edge2);
      }
    }
  }
  const getNamespace = (id: string) => {
    for(let i = 0; i < props.dataArray.length; i++){
      if(props.dataArray[i].label === id) {
        return props.dataArray[i].namespace;
      }
    }
  }
  useEffect(() => {
    populateArray(props.dataArray);
    populateNamespaces(props.dataArray)
    const config: Cytoscape.CytoscapeOptions = {
      container: containerRef.current,
      style: GraphStyles,
      elements: relevantData,
    };
    let cy = Cytoscape(config);
    let layout = cy.layout({name:'cola'});
    layout.run();
    let test = cy.getElementById("Kubernetes Cluster");
    test.addClass('test')
    cy.on('click',(event)=> {
      // console.log('event',event.target._private.data);
      if(event.target._private.data.label !== undefined && event.target._private.data.target === undefined && event.target._private.data.label !== 'Kubernetes Cluster' && !namespacesArr.includes(event.target._private.data.label)){
        props.setNamespace(getNamespace(event.target._private.data.id))
        props.setMasterNode(event.target._private.data.id)
        props.setTrigger(true);
      }
    })
  }, [props.dataArray]);

  return(
    <div>
    <h1>Cluster View</h1>
      <div style={{display:'flex'}}> 
        <SidebarClusterView deploymentStatus={props.deploymentStatus} namespace={props.namespace}/>
        <div
          ref={containerRef}
          style={ {width: '600px', height: '600px' }}
        />   
    </div>
  </div> 
)
}

export default ClusterView;

