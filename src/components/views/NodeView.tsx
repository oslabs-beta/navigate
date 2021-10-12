//populate with relevant data
import * as React from "react";
import {FC} from 'react';
import {kObject} from '../../kObjects/kObject';
import {kDeployment} from '../../kObjects/kDeployment';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { useEffect, useRef, useCallback, useState } from "react";
import cola from 'cytoscape-cola';
import SidebarClusterView from './SidebarClusterView'
import {GraphStyles} from "../../scss/GraphStyles";
import dagre from 'cytoscape-dagre'
Cytoscape.use(cola);
Cytoscape.use(dagre);


function NodeView(props: any) {
  const nodeViewRef = React.useRef<HTMLDivElement>(null);
  const relevantData: any[] = [
    {data: { id: "master", label: props.masterNode , class:"namespace"}},
  ];
  const populateArray = (array: any[]): void => {
    let targetNode;
    let serviceNode;
    for(let i = 0; i < array.length; i++){
      if(array[i].label === props.masterNode){
        targetNode = array[i]
      } 
      if(array[i].kind === 'Service' && array[i].selectorName === props.masterNode){
        serviceNode = array[i].label;
        let newPod = {
          data: {
            id: array[i].label,
            label: array[i].label,
            class: "service",
          },
        };
        let edge = {
          data: {
            source: 'master',
            target: array[i].label,
            label: `connection`
          }
        }
        relevantData.push(newPod,edge)
      }
      if(array[i].kind === 'StatefulSet'){
        props.dataArray.forEach((ele: any) => {
          //&& ele.label.includes('redis')
          if(ele.kind === "Deployment" && ele.label === props.masterNode){
            console.log('ele',ele.namespace)
            console.log('master',props.masterNode);
            if(array[i].namespace === ele.namespace){
              let newPod = {
                data: {
                  id: array[i].label,
                  label: array[i].label,
                  class: "stateful",
                },
              };
              let edge = {
                data: {
                  source: 'master',
                  target: array[i].label,
                  label: "connection"
                }
              }
              relevantData.push(newPod,edge)
            }
          } 
        })
        console.log('master',props.masterNode)
        console.log('stateful',[array[i]])
      }
    }
    
    for(let i = 0; i < targetNode.replicas; i++){
      let newPod = {
        data: {
          id: targetNode.label + i,
          label: targetNode.podLabel + i,
        },
      };
      //line from new pod to master
      let edge1 = {
        data: {
          source: 'master',
          target: targetNode.label + i,
          // label: `Edge from master to ${array[i].label}`
        }
      }
      //line from service to pod
      let edge2 = {
        data: {
          source: serviceNode,
          target: targetNode.container.name + i,
          label: "connection"
        }
      }
      let newContainer = {
        data: {
          id: targetNode.container.name + i,
          label: targetNode.container.name + i,
        },
      };
      //line from newPod to newContainer
      let edge3 = {
        data: {
          source: targetNode.label + i,
          target: targetNode.container.name + i,
          // label: `Edge from master to ${array[i].label}`
        }
      }
      let newImage = {
        data: {
          id: targetNode.container.image + i,
          label: targetNode.container.image + i,
        },
      };
      //line from newContainer to image
      let edge4 = {
        data: {
          source: targetNode.container.name + i,
          target: targetNode.container.image + i,
          // label: `Edge from master to ${array[i].label}`
        }
      }
      relevantData.push(newPod,edge1,newContainer,edge2,newImage,edge3,edge4);
    }

  }

  useEffect(() => {
    // console.log('dataArray',props.dataArray)
    populateArray(props.dataArray);
    const config: Cytoscape.CytoscapeOptions = {
      container: nodeViewRef.current,
      style: GraphStyles,
      elements: relevantData,
    };
    let cy = Cytoscape(config);
    let layout = cy.layout({name:'dagre'});
    layout.run();
    cy.on('click',(event)=> {
      console.log(event.target._private.data.label);

    })
    }, []);

  return (
    <div> 
      <h1>Node View</h1>
      <button onClick={() =>{
        props.setTrigger(false)
        props.setMasterNode('Control Plane')
        props.setNamespace('default')
      }}>Cluster View</button>
      <div style={{display:'flex'}}>
        <SidebarClusterView namespace={props.namespace}deploymentStatus={props.deploymentStatus}/>
        <div id='nodeView'
          ref={nodeViewRef}
          style={ { width: '600px', height: '600px' }}
        />   
      </div>
    </div>
    
 )
}

export default NodeView;
// elements: [
//   //how to make a node
//   //id: anything unique ,label: name
//   { data: { id: 'master', label: props.masterNode }, position: { x: 200, y: 150 } },
//   { data: { id: 'one', label: 'Pod 1' }, position: { x: 150, y: 150 } },
//   { data: { id: 'two', label: 'Pod 2' }, position: { x: 250, y: 150 } },
//   { data: { id: 'three', label: 'Pod 3' }, position: { x: 50, y: 300 } },
//   { data: { id: 'four', label: 'Pod 4' }, position: { x: 250, y: 300 } },
//   //how to make a connection
//   { data: { source: 'master', target: 'one', label: 'Edge from Deployment Node to Pod 1' } },
//   { data: { source: 'master', target: 'two', label: 'Edge from Deployment Node to Pod 2' } },
//   { data: { source: 'master', target: 'three', label: 'Edge from Deployment Node to Pod 3' } },
//   { data: { source: 'master', target: 'four', label: 'Edge from Deployment Node to Pod 4' } },
// ],