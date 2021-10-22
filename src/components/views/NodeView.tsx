//populate with relevant data
import * as React from "react";
import Cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import SidebarNodeView from './SidebarNodeView'
import {GraphStyles} from "../../scss/GraphStyles";
import dagre from 'cytoscape-dagre'
import Legend from './Legend';
import { anyObject, container } from "../../kObjects/__index";

Cytoscape.use(cola);
Cytoscape.use(dagre);


function NodeView(props: any) {
  const nodeViewRef = React.useRef<HTMLDivElement>(null);
  const [target, setTarget] = React.useState("");
  const [image, setImage] = React.useState("");
  let [clickedPod, registerPod] = React.useState(undefined);
  const relevantData: any[] = [
    {data: { id: "master", label: props.masterNode , class:"namespace"}},
  ];
  const populateArray = (array: any[]): void => {
    let targetNode;
    let serviceNode;
    for(let i = 0; i < array.length; i++){
      if(array[i].kind === "Deployment" && (array[i].selectorName + " deployment" === props.masterNode || array[i].label + " deployment" === props.masterNode) ){
        targetNode = array[i]
      } 
      if(array[i].kind === 'Service' && findSelectorMatchWithMaster(array[i].selectors,props.masterNode)){
        serviceNode = array[i];
        let newPod = {
          data: {
            id: array[i].label + ' service',
            label: array[i].label + ' service' + "\n" + `Port: ${serviceNode.port}`,
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
    for(let i = 0; i < targetNode.replicas; i++){
      //get live podName here
      props.podInfoObjects.forEach((pod: any) => {
        if(Object.values(pod.labelForMatching).includes(props.masterNode.split(' ')[0])){
          podNames.push(pod.name)
        } 
      })
      let newPod = {
        data: {
          id: podNames[i],
          label: podNames[i],
          class: "pod"
        },
      };
      // line from replicaset to newPod
      let edge1 = {
        data: {
          source: `ReplicaSet: ${targetNode.replicas}`,
          target: podNames[i],
        }
      }
      // line from service to pod
      if(serviceNode){
        let edge2 = {
          data: {
            source: serviceNode.label + " service",
            target: targetNode.container.name  + " container" + i,
            label: "connection"
          }
        }
        relevantData.push(edge2)
      }
      let newContainer = {
        data: {
          id: targetNode.container.name + " container" + i,
          label: targetNode.container.name + " container" + "\n" + "Port:" + targetNode.container.containerPort ,
          class: "container",
        },
      };
      //line from newPod to newContainer
      let edge3 = {
        data: {
          source: podNames[i],
          target: targetNode.container.name + " container" + i,
          // label: `Edge from master to ${array[i].label}`
        }
      }
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
          source: targetNode.container.name + " container" + i,
          target: targetNode.container.image + " image" + i,
          // label: `Edge from master to ${array[i].label}`
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
  //import this function instead
  const findSelectorMatchWithMaster = (obj: anyObject, string: string) => {
    for(let key in obj){
      if(`${obj[key]} deployment` === string){
        return true;
      }
    }
    return false;
  }

  React.useEffect(() => {
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
      if(event.target._private.data.class !== "undefined" && event.target._private.data.class !== "image"){
        setTarget(event.target._private.data.id);
        setImage("");
      }
      else if(event.target._private.data.class === "image"){
        setTarget(event.target._private.data.label.split(":")[0]);
        setImage(event.target._private.data.id.slice(0,event.target._private.data.id.length - 2));
      }
      clickedPod = event.target._private.data.id;
      registerPod(clickedPod);
    })
    }, []);

  return (
    <div id="nodeView"> 
      <div >
        <h1 id="nodeHeader">
          <img src="https://cdn.discordapp.com/attachments/642861879907188736/898223184346775633/grayKubernetes.png" width="3.5%" height="3.5%"></img>
          {props.view}
        </h1>
      </div>
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
      <div style={{display:'flex'}}>
        <div id='nodeView'
          ref={nodeViewRef}
          style={ { width: '100%', height: '600px' }}
        />   
        <div id="pageView">
          <div id="columnNodeView" style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
          <SidebarNodeView  clickedPod = {clickedPod} podInfoObjects={props.podInfoObjects} masterNode={props.masterNode} podDeployments={props.podDeployments}/>
          <Legend/>
          </div>
          <div id='nodeView'
            ref={nodeViewRef}
            style={ { width: '1500px', height: '750px' }}
          />   
        </div>
      </div>
    </div>
    
 )
}

export default NodeView;