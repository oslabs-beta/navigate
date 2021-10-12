import * as React from "react";
import {FC} from 'react';
import Cytoscape from 'cytoscape';
import { useEffect, useRef, useCallback, useState } from "react";
import SidebarClusterView from "./SidebarClusterView";
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import {GraphStyles} from "../../scss/GraphStyles";
import { servicesVersion } from "typescript";
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
        data: { id: namespace, label: namespace, class:"namespace"}},
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
            class: "deployment"
          },
        };
        let edge = {
          data: {
            source: array[i].namespace,
            target: array[i].label,
            label: `deployment`
          }
        }
        relevantData.push(newNode,edge);
      }
      else if(array[i].kind === 'StatefulSet'){
        let newNode = {
          data: {
            id: array[i].label,
            label: array[i].label,
            class: "stateful",
          },
        };
        let edge = {
          data: {
            source: array[i].namespace,
            target: array[i].label,
            label: `connection`
          }
        }
        relevantData.push(newNode,edge);
        props.dataArray.forEach((ele: any) => {
          if(ele.kind === "Service" && ele.namespace === array[i].namespace){
            let edge = {
              data: {
                source: ele.label,
                target: array[i].label,
                label: `connection`
              }
            }
            relevantData.push(edge)
          } 
        })
      }
      else if(array[i].kind === 'Service'){
        let newNode = {
          data: {
            id: array[i].label,
            label: array[i].label,
            class: "service",
          },
        };
        let edge = {
          data: {
            source: array[i].namespace,
            target: array[i].label,
            label: `deployment`
          }
        }
        props.dataArray.forEach((ele: any) => {
          if(ele.kind === "Deployment" && ele.namespace === array[i].namespace){
            let edge = {
              data: {
                source: ele.label,
                target: array[i].label,
                label: `connection`
              }
            }
            relevantData.push(edge)
          } 
        })
        relevantData.push(newNode,edge);
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
    let layout = cy.layout({name:'dagre'});
    layout.run();
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

