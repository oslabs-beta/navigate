import * as React from "react";
import Cytoscape from 'cytoscape';
import { useEffect, useRef, useCallback, useState } from "react";
import SidebarClusterView from "./SidebarClusterView";
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import {GraphStyles} from "../../scss/GraphStyles";
import { servicesVersion } from "typescript";
import Legend from './Legend';
Cytoscape.use(dagre);
Cytoscape.use(cola);
dagre(Cytoscape)

function ClusterView(props: any) {
  const getDupes = (arr: any[]) => {
    const checked: any = {};
    arr.forEach((ele:any) => {
      if(!checked.ele) checked.ele = 1;
      else return ele;
    })
  }
  const containerRef = React.useRef<HTMLDivElement>(null);
  const relevantData: any[] = [
    {data: { id :"Kubernetes Cluster", label: "Kubernetes Cluster"}},
  ];
  const namespacesArr: string[] = [];
  const populateNamespaces = (array: any[]): void => {
    array.forEach(kObject => {
      // console.log("kobj",kObject)
      if(!namespacesArr.includes(kObject.namespace) && kObject.namespace !== undefined) namespacesArr.push(kObject.namespace);
    })
  namespacesArr.forEach(namespace => {
      relevantData.push({
        data: { id: namespace, label: namespace, class: "namespace"}},
        {data: {
          source: "Kubernetes Cluster",
          target: namespace,
      }})
    })
  }
  const allLabels: any[] = [];
  props.dataArray.forEach((ele:any) => {
    if(ele.label !== undefined) allLabels.push(ele.label);      
  })
  
  const populateArray = (array: any[]): void => {
    for (let i = 0; i < array.length; i++) {
      if (!allLabels.includes(array[i].label)) {
      }
      if (array[i].kind === "Deployment") {
        let newNode = {
          data: {
            id: array[i].label,
            label: array[i].podLabel,
            class: "deployment",
          },
        };
        let edge = {
          data: {
            source: array[i].namespace,
            target: array[i].label,
            label: `deployment`,
          },
        };
        relevantData.push(newNode, edge);
      } else if (array[i].kind === "StatefulSet") {
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
            label: `stateful`,
          },
        };

        relevantData.push(newNode, edge);
        props.dataArray.forEach((ele: any) => {
          if (ele.kind === "Service" && ele.namespace === array[i].namespace) {
            let edge = {
              data: {
                source: ele.label,
                target: array[i].label,
                label: `connection`,
              },
            };
            relevantData.push(edge);
          }
        });
      } else if (array[i].kind === "Service") {
        if (!namespacesArr.includes(array[i].label)){
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
                label: `deployment`,
              },
            };
            props.dataArray.forEach((ele: any) => {
              if (
                ele.kind === "Deployment" &&
                ele.namespace === array[i].namespace
              ) {
                let edge = {
                  data: {
                    source: ele.label,
                    target: array[i].label,
                    label: `connection`,
                  },
                };
                relevantData.push(edge);
              }
            });
            relevantData.push(newNode, edge);
          } 
          else{
            let newNode = {
              data: {
                id: `${array[i].label} service`,
                label: `${array[i].label} service`,
                class: "service",
              },
            };
            let edge = {
              data: {
                source: array[i].label,
                target: `${array[i].label} service`,
                label: `deployment`,
              },
            };
            let newNode2 = {
              data: {
                id: `${array[i].label} invis`,
                label: `${array[i].label} invis`,
                class: "invis",
              },
            };
            let edge2 = {
              data: {
                source: `${array[i].label} service`,
                target: `${array[i].label} invis`,
                label: "invis",
              },
            };
            relevantData.push(newNode, edge,newNode2, edge2);
          }
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
    populateNamespaces(props.dataArray);
    populateArray(props.dataArray);
    const config: Cytoscape.CytoscapeOptions = {
      container: containerRef.current,
      style: GraphStyles,
      elements: relevantData,
    };
    let cy = Cytoscape(config);
    let layout = cy.layout({
      name:'dagre',
      nodeDimensionsIncludeLabels: true,
      padding: 15,
      animate: true,
      animationDuration: 1000,

    });
    layout.run();
    cy.on('click',(event)=> {
      if(event.target._private.data.class === "deployment" && event.target._private.data.label !== undefined && event.target._private.data.target === undefined && event.target._private.data.label !== 'Kubernetes Cluster' && !namespacesArr.includes(event.target._private.data.label)){
        props.setView("Node View");
        props.setNamespace(getNamespace(event.target._private.data.id));
        props.setMasterNode(event.target._private.data.id);
        props.setTrigger(true);
      }
    })
  }, [props.dataArray]);

  return(
    <div>
      <div >
        <h1 id="clusterHeader">
        <img src="https://cdn.discordapp.com/attachments/642861879907188736/898223184346775633/grayKubernetes.png" width="3.5%" height="3.5%"></img>
          {props.view}
        </h1>
      </div>  
      <div style={{display:'flex'}}> 
        <div id="pageView">
          <div id="pageCol">
            <SidebarClusterView deploymentStatus={props.deploymentStatus} namespace={props.namespace}/>
            <Legend/>
          </div>
          <div id="clusterView"
            ref={containerRef}
            style={ {width: '1500px', height: '750px' }}
          />
        </div>
    </div>
  </div> 
)
}

export default ClusterView;