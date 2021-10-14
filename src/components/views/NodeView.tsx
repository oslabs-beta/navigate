//populate with relevant data
import * as React from "react";
import {FC} from 'react';
import {kObject} from '../../kObjects/kObject';
import {kDeployment} from '../../kObjects/kDeployment';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { useEffect, useRef, useCallback, useState } from "react";
import cola from 'cytoscape-cola';
import SidebarNodeView from './SidebarNodeView'
import {GraphStyles} from "../../scss/GraphStyles";
import dagre from 'cytoscape-dagre'
Cytoscape.use(cola);
Cytoscape.use(dagre);


function NodeView(props: any) {
  const nodeViewRef = React.useRef<HTMLDivElement>(null);
  const [imageName, setImageName] = React.useState("");
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
        serviceNode = array[i];
        console.log("service",serviceNode)
        let newPod = {
          data: {
            id: array[i].label,
            label: array[i].label + "\n" + `Port: ${serviceNode.port}`,
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
          if(ele.kind === "Deployment" && ele.label === props.masterNode){
            // console.log('ele', array[i])
            if(array[i].namespace === ele.namespace){
              let newPod = {
                data: {
                  id: array[i].label,
                  label: array[i].label + "\n" + "Port:" + array[i].container.containerPort,
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
      }
    }

    for(let i = 0; i < targetNode.replicas; i++){
      let newPod = {
        data: {
          id: targetNode.label + i,
          label: targetNode.podLabel + i,
          //pods
          class: "pod"
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
          source: serviceNode.label,
          target: targetNode.container.name + i,
          label: "connection"
        }
      }
      console.log(targetNode.container)
      let newContainer = {
        data: {
          id: targetNode.container.name + i,
          label: targetNode.container.name + "\n" + "Port:" + targetNode.container.containerPort,
          //container??
          class: "container",
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
          label: targetNode.container.image.split(":")[0],
          class: "image"
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
    populateArray(props.dataArray);
    const config: Cytoscape.CytoscapeOptions = {
      container: nodeViewRef.current,
      style: GraphStyles,
      elements: relevantData,
    };
    let cy = Cytoscape(config);
    let layout = cy.layout({
      name:'dagre',
      nodeDimensionsIncludeLabels: true,
      animate: true,
    });
    layout.run();
    cy.on('click',(event)=> {
      if(event.target._private.data.class === "image"){
        setImageName(event.target._private.data.id.slice(0,event.target._private.data.id.length - 2));
      }
      else console.log(event.target._private.data.id)
    })
    }, []);

  return (
    <div id="nodeView"> 
      <div id="nodeHeader">
        <h1>Node View {props.masterNode}</h1>
      </div>
      <button onClick={() =>{
        props.setTrigger(false);
        props.setMasterNode('Kubernetes Cluster');
        props.setNamespace('Kubernetes Cluster');
      }}>Back to Cluster View</button>
      <div style={{display:'flex'}}>
        <SidebarNodeView/>
        <div id='nodeView'
          ref={nodeViewRef}
          style={ { width: '100%', height: '600px' }}
        />   
      </div>
    </div>
    
 )
}

export default NodeView;