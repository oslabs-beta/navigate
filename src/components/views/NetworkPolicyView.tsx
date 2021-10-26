import * as React from "react";
import Cytoscape from 'cytoscape';
import SidebarClusterView from "./SidebarClusterView";
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import {GraphStyles} from "../../scss/GraphStyles";
import Legend from './Legend';
import { electron } from "webpack";
import { anyObject } from "../../kObjects/__index";
import { findSelectorMatch } from "../../component_data/findSelectorMatch";
import kNetworkPolicy from "../../kObjects/kNetworkPolicy";
import * as dataParser from "../../component_data/kDataParser"
import { kObject } from "../../kObjects/kObject";
Cytoscape.use(dagre);
Cytoscape.use(cola);
dagre(Cytoscape)

function NetworkPolicyView(props: any) {
  const networkPolicyRef = React.useRef<HTMLDivElement>(null);
  const relevantData: any[] = [];
  const [networkPolicy, setNetworkPolicy] = React.useState('');
  const [networkPoliciesArr, setNetworkPoliciesArr] = React.useState<kNetworkPolicy[]>([])
  const networkPolicies: any[] = [];
  const [dataProp, SetDataProp] = React.useState<kObject[]>([]);
  const populateNetworkPolicies = (array: any[]) => {
    array.forEach(kObject => {
      if(kObject.kind === "NetworkPolicy") networkPolicies.push(kObject);
    })
    if(networkPolicies.length === 1) setNetworkPolicy(networkPolicies[0].label);
    setNetworkPoliciesArr(networkPolicies);
  };
  function parseData(json: any)
  {
    const data = dataParser.parseData(json);
    return data;
  }
  const populateArray = (array: any[]): void => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].kind === "NetworkPolicy" && array[i].label === networkPolicy) {
        const getSelectors = (obj: anyObject) => {
          let str = '';
          for(let key in obj){
            str += `${key}=${obj[key]}`;
          }
          return str;
        }
        let ingress = {
          data: {
            id: "ingress",
            label: `Pods label: ${getSelectors(array[i].podSelectors)}
                    Port:${array[i].ingressPolicy.port} ${array[i].ingressPolicy.protocol}`,
            class: "ingress",
          },
        };
        let egress = {
          data: {
            id: "egress",
            label: `IPs: ${array[i].egressPolicy.ipBlock}
                    :${array[i].egressPolicy.port} ${array[i].egressPolicy.protocol}`,
            class: "egress",

          }
        }
        let edge = {
          data: {
            source: "ingress",
            target: "egress",
            label: "ingress",
          },
        };
        let namespaceSelector = {
          data: {
            id: "namespaceSelector",
            label: `Namespace labels: ${getSelectors(array[i].ingressPolicy.namespaceSelectors)}`,
            class: "policy"
          }
        }
        let edge2 = {
          data: {
            source: "namespaceSelector",
            target: "ingress",
            label: "ingress",
          },
        };
        let podSelector = {
          data: {
            id: "podSelector",
            label: `Pod labels: 
                    ${getSelectors(array[i].ingressPolicy.podSelectors)}`,
            class: "policy"
          }
        }
        let edge3 = {
          data: {
            source: "podSelector",
            target: "ingress",
            label: "ingress",
          },
        };
        let ipBlock = {
          data: {
            id: "ipBlock",
            label: `IPs: ${array[i].ingressPolicy.ipBlock}`,
            class: "policy"
          }
        }
        let edge4 = {
          data: {
            source: "ipBlock",
            target: "ingress",
            label: "ingress",
          },
        };
        let except = {
          data: {
            id: "except",
            label: `Blocked IPs: ${array[i].ingressPolicy.except}`,
            class: "except"
          }
        }
        let edge5 = {
          data: {
            source: "except",
            target: "ingress",
            label: "except",
          },
        };
        relevantData.push(ingress,egress,edge,namespaceSelector,edge2,podSelector,edge3,ipBlock,edge4,except,edge5);
      } 
    }
  }
  React.useEffect(() => {
    populateNetworkPolicies(parseData(props.jsonFiles));
    populateArray(parseData(props.jsonFiles));
    const config: Cytoscape.CytoscapeOptions = {
      container: networkPolicyRef.current,
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
        props.setMasterNode(event.target._private.data.id);
        props.setTrigger(true);
        console.log(event.target._private.data.id);
      }
    })
  }, [props.jsonFiles, networkPolicy]);


  const limitSidebarHeight = document.getElementById('clusterView')?.style.height;

  return(
    <div>
      <div >
        <h1 id="clusterHeader">
        <img src="https://cdn.discordapp.com/attachments/642861879907188736/898223184346775633/grayKubernetes.png" width="3.5%" height="3.5%"></img>
          {/* {props.view} */}
          {"Network Policy View"}
        </h1>
      </div>  
      <div id="buttonDiv">
              <label>Choose a Network Policy</label>
              <select id="policies" value={networkPolicy} onChange={(e) => {
                const selected = e.target.value;
                setNetworkPolicy(selected);
              }}>
                {networkPoliciesArr.map((ele,i) => {
                  return <option value={ele.label} key={i}>{ele.label}</option>
                })}
              </select>
            <h3>{networkPolicy}</h3>
          </div>
      <div style={{display:'flex'}}> 
        <div id="pageView">
          <div id="clusterView"
            ref={networkPolicyRef}
            style={ {width: '1500px', height: '750px' }}
          />
        </div>
    </div>
  </div> 
)
}

export default NetworkPolicyView;