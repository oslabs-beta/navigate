import * as React from "react";
import Cytoscape from 'cytoscape';
import SidebarClusterView from "./SidebarClusterView";
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import {GraphStyles} from "../../scss/GraphStyles";
import Legend from './Legend';
Cytoscape.use(dagre);
Cytoscape.use(cola);
dagre(Cytoscape)

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
      if (array[i].kind === "Deployment") {
        //change deployment to include deployment
        let newNode = {
          data: {
            // id: !namespacesArr.includes(array[i].label) ? array[i].label : `${array[i].label} deployment`,
            id: `${array[i].label} deployment`,
            // label: array[i].label,
            label: `${array[i].label} deployment`,
            class: "deployment",
          },
        };
        //remove edge?
        let edge = {
          data: {
            source: array[i].namespace,
            // target: array[i].label,
            target: `${array[i].label} deployment`,
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
      } 
      else if (array[i].kind === "Service") {
        //change service to include service
        if (!namespacesArr.includes(array[i].label)){
            let newNode = {
              data: {
                id: array[i].label,
                label: array[i].label,
                class: "service",
              },
            };
            //remove edge?
            // let edge = {
            //   data: {
            //     source: array[i].namespace,
            //     target: array[i].label,
            //     label: `service deployment`,
            //   },
            // };
            props.dataArray.forEach((ele: any) => {
              if (
                ele.kind === "Deployment" &&
                ele.namespace === array[i].namespace &&
                ele.label === array[i].selectorName
                //label will not always match
              ) {
                console.log('ele',ele)
                console.log('array[i]',array[i])
                let edge = {
                  data: {
                    source: ele.label + " deployment",
                    target: array[i].label,
                    label: `stateful`,
                  },
                };
                relevantData.push(edge);
              }
            });
            //remove edge? 
            relevantData.push(newNode);
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
            relevantData.push(newNode, edge);
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
  React.useEffect(() => {
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
        console.log(event.target._private.data.label);
      }
    })
  }, [props.dataArray]);


  const limitSidebarHeight = document.getElementById('clusterView')?.style.height;

  return(
    <div>
      <div >
        <h1 id="clusterHeader">
        <img src="https://cdn.discordapp.com/attachments/642861879907188736/898223184346775633/grayKubernetes.png" width="3.5%" height="3.5%"></img>
          {props.view}
        </h1>
      </div>  
      <div id="buttonDiv">
            <button onClick={() =>{
              window.alert(namespacesArr)
            }}>Namespaces
            </button>
            <h3>{`${props.masterNode}`}</h3>
          </div>
      <div style={{display:'flex'}}> 
        <div id="pageView">
          <div id="pageCol" style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:limitSidebarHeight}}>
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
//please ignore for now sry - joel
//take out edge from namespace to service
//make edge from deploy to service orange
              // if (
              //   ele.kind === "Deployment" &&
              //   ele.namespace === array[i].namespace &&
              //   //label will not always match
              //   ele.label === array[i].label
              // ) {
                
              //   let edge = {
              //     data: {
              //       source: ele.label + " deployment",
              //       target: array[i].label,
              //       label: `stateful`,
              //     },
              //   };
              //   relevantData.push(edge);
              // }