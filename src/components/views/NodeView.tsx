//populate with relevant data
import * as React from "react";
import Cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import SidebarNodeView from './SidebarNodeView'
import {GraphStyles} from "../../scss/GraphStyles";
import dagre from 'cytoscape-dagre'
import Legend from './Legend';
import { anyObject, container } from "../../kObjects/__index";
import { kObject } from "../../kObjects/kObject";
import { findSelectorMatch } from "../../component_data/findSelectorMatch";

Cytoscape.use(cola);
Cytoscape.use(dagre);


function NodeView(props: any) {
  const nodeViewRef = React.useRef<HTMLDivElement>(null);
  let [clickedPod, registerPod] = React.useState(undefined);
  const relevantData: any[] = [
    {data: { id: "master", label: props.masterNode , class:"namespace"}},
  ];
  let deploymentNode: anyObject = {};
  const getMasterNode = (label: string) => {
    props.dataArray.forEach((obj: anyObject) => {
      if(`${obj.label} deployment`=== label) {
        return deploymentNode = obj;
      }
    })
  }
  const populateArray = (array: any[]): void => {
    let targetNode;
    let serviceNodes: anyObject[] = [];
    let serviceNode: anyObject = {};
    for(let i = 0; i < array.length; i++){
      if(array[i].kind === "Deployment" && findSelectorMatch(array[i],deploymentNode)){
        targetNode = array[i];
      }
      if(array[i].kind === 'Service' && findSelectorMatch(array[i],deploymentNode)){
        serviceNode = array[i];
        serviceNodes.push(serviceNode);
        let newPod = {
          data: {
            id: array[i].label + ' service',
            label: serviceNode.port ? array[i].label + "\n" + `Port:${serviceNode.port}` : array[i].label + "\n" + `Port:N/A`,
            class: "service",
          },
        };
        let edge = {
          data: {
            source: 'master',
            target: array[i].label + ' service',
            label: `connection`
          }
        }
        relevantData.push(newPod, edge)
      }
      if(array[i].kind === 'StatefulSet'){
        props.dataArray.forEach((ele: any) => {
          if(ele.kind === "Deployment" && (ele.label + " deployment" === props.masterNode) || (ele.selectorName + " deployment" === props.masterNode)){
            if(array[i].namespace === ele.namespace){
              let newPod = {
                data: {
                  id: array[i].label + " stateful",
                  label: array[i].label + "\n" + "Port:" + array[i].container.containerPort,
                  class: "stateful",
                },
              };
              let edge = {
                data: {
                  source: 'master',
                  target: array[i].label + " stateful",
                  label: "connection"
                }
              }
              relevantData.push(newPod,edge)
            }
          } 
        })
      } 
    }
    const podNames: string[] = [];
    const containerIDs : string[] = [];
    for(let i = 0; i < targetNode.replicas; i++){
      //get live podName
      props.podInfoObjects.forEach((pod: any) => {
        if(Object.values(pod.labelForMatching).includes(props.masterNode.split(' ')[0])){
          if(!podNames.includes(pod.name)) podNames.push(pod.name);
          if(!containerIDs.includes(pod.containerID)) containerIDs.push(pod.containerID)
        } 
      })
      //create new pod
      let newPod = {
        data: {
          id: podNames[i] !== undefined ? podNames[i] : targetNode.podLabel + 'pod' + i,
          label: podNames[i] !== undefined ? podNames[i] : targetNode.podLabel + 'pod' + i,
          class: "pod"
        },
      };
      // line from replicaset to newPod
      let edge1 = {
        data: {
          source: `ReplicaSet: ${targetNode.replicas}`,
          target: podNames[i] !== undefined ? podNames[i] : targetNode.podLabel + 'pod' + i,
          label: "deployment"
        }
      }
      // line from service to pod
      if(serviceNodes){
        for(let j = 0; j < serviceNodes.length; j++){
          let edge2 = {
            data: {
              source: serviceNodes[j].label + " service",
              target: containerIDs[i] !== undefined ? containerIDs[i]: targetNode.container.name + " container" + i,
              label: "connection"
            }
          }
          relevantData.push(edge2)
        }
      }
      //create new container
      let newContainer = {
        data: {
          id: containerIDs[i] !== undefined ? containerIDs[i]: targetNode.container.name + " container" + i,
          label: targetNode.container.name + "\n" + "Port:" + targetNode.container.containerPort ,
          class: "container",
        },
      };
      //line from newPod to newContainer
      let edge3 = {
        data: {
          source: podNames[i] !== undefined ? podNames[i] : targetNode.podLabel + 'pod' + i,
          target: containerIDs[i] !== undefined ? containerIDs[i]: targetNode.container.name + " container" + i,
          label: "deployment",
        }
      }
      //create new image
      let newImage = {
        data: {
          id: targetNode.container.image + " image" + i,
          label: targetNode.container.image.split(":")[0],
          class: "image"
        },
      };
      //line from newContainer to newImage
      let edge4 = {
        data: {
          source: containerIDs[i] !== undefined ? containerIDs[i]: targetNode.container.name + " container" + i,
          target: targetNode.container.image + " image" + i,
          label: "deployment"
        }
      }
      relevantData.push(newPod,newContainer,newImage,edge1,edge3,edge4);
    }
    const newReplicaSet = {
      data: {
        id: `ReplicaSet: ${targetNode.replicas}`,
        label: `ReplicaSet: ${targetNode.replicas}`,
        class: "replicaSet",
      }
    }
    const edgeReplicaSet = {
      data: {
        source: "master",
        target: `ReplicaSet: ${targetNode.replicas}`,
        label: "deployment"
      }
    } 
    relevantData.push(newReplicaSet,edgeReplicaSet)
  }
  React.useEffect(() => {
    getMasterNode(props.masterNode);
    populateArray(props.dataArray);
    //Cytoscape layout and configurations
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
    cy.zoomingEnabled(false);
    cy.on('click',(event)=> {
      if(event.target._private.data.class === "container"){
        console.log('nodeViewClick',event.target._private.data.id);
      }
      else if(event.target._private.data.class === 'pod'){
        clickedPod = event.target._private.data.id;
        registerPod(clickedPod);
      }
    })
    cy.on("mouseover","node[class = 'pod']", function(event) {
      event.target.style("background-image", ["https://i.ibb.co/N1fXVdp/podhover.png"]);
      event.target.style("background-color",'rgb(230,74,0)');
      event.target.style("border-color",'rgb(230,74,0)');
      event.target.style("border-width","2");
    })
    cy.on("mouseout","node[class = 'pod']", function(event) {
      event.target.style("background-image", ["https://i.ibb.co/zNx6TML/podicon.png"]);
      event.target.style("background-color",'white');
      event.target.style("border-width","0");
    })
    }, []);
    const limitSidebarHeight = document.getElementById("clusterView")?.style.height;
  return (
    <div id="nodeView"> 
        <h1 className="header">
          {props.view}
        </h1>
      <div className="pageViewTest2">
        <div className="sidebarTest2">
        <div id="buttonDiv">
        <button onClick={() =>{
          props.setTrigger(false);
          props.setMasterNode('Kubernetes Cluster');
          props.setNamespace('Kubernetes Cluster');
          props.setView('Cluster View');
        }}>Back to Cluster View
        </button>
        <h3>{`${props.masterNode}`}</h3>
        </div> 
          <div id="pageView">
            <div id="columnNodeView" style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly',height:limitSidebarHeight}}>
            <SidebarNodeView clickedPod = {clickedPod} podInfoObjects={props.podInfoObjects} masterNode={props.masterNode} podDeployments={props.podDeployments}/>
            <Legend/>
            </div>
        </div>
        </div>
        <div id='nodeView'
            ref={nodeViewRef}
            style={ { width: '1500px', height: '750px' }}
          /> 
      </div>
      
    </div>
    
 )
}

export default NodeView;