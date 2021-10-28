import * as React from "react";
import Cytoscape from 'cytoscape';
import SidebarClusterView from "./SidebarClusterView";
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import {GraphStyles} from "../../scss/GraphStyles";
import { electron } from "webpack";
import { anyObject } from "../../kObjects/__index";
import { findSelectorMatch } from "../../component_data/findSelectorMatch";
import kNetworkPolicy from "../../kObjects/kNetworkPolicy";
import * as dataParser from "../../component_data/kDataParser"
import NetworkPolicyLegend from "./NetworkPolicyLegend";
Cytoscape.use(dagre);
Cytoscape.use(cola);
dagre(Cytoscape)

interface IProps {
  jsonFiles: Array<string>,
}
function NetworkPolicyView(props: IProps) {
  const networkPolicyRef = React.useRef<HTMLDivElement>(null);
  const relevantData: any[] = [];
  const [networkPolicy, setNetworkPolicy] = React.useState('');
  const [networkPoliciesArr, setNetworkPoliciesArr] = React.useState<kNetworkPolicy[]>([])
  const networkPolicies: any[] = [];
  const populateNetworkPolicies = (array: any[]) => {
    array.forEach(kObject => {
      if(kObject.kind === "NetworkPolicy") networkPolicies.push(kObject);
    })
    if(networkPolicies.length === 1) setNetworkPolicy(networkPolicies[0].label);
    setNetworkPoliciesArr(networkPolicies);
  };
  function parseData(json: any[]) : anyObject[] 
  {
    const data = dataParser.parseData(json);
    return data;
  }
  const populateArray = (array: anyObject[]): void => {
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
            label: `Pods labeled: ${getSelectors(array[i].podSelectors)} \n Port:${array[i].ingressPolicy.port} ${array[i].ingressPolicy.protocol}`,
            class: "ingress",
          },
        };
        let egress = {
          data: {
            id: "egress",
            label: `IPs: ${array[i].egressPolicy.ipBlock} \n Port:${array[i].egressPolicy.port} ${array[i].egressPolicy.protocol}`,
            class: "egress",

          }
        }
        let edge = {
          data: {
            source: "ingress",
            target: "egress",
            label: "allowed",
          },
        };
        let namespaceSelector = {
          data: {
            id: "namespaceSelector",
            label: `Pods labeled: ${getSelectors(array[i].ingressPolicy.podSelectors)} in Namespace: ${getSelectors(array[i].ingressPolicy.namespaceSelectors)}`,
            class: "namespacePolicy"
          }
        }
        let edge2 = {
          data: {
            source: "namespaceSelector",
            target: "ingress",
            label: "allowed",
          },
        };
        let ipBlock = {
          data: {
            id: "ipBlock",
            label: `IPs: ${array[i].ingressPolicy.ipBlock}`,
            class: "allowed"
          }
        }
        let edge4 = {
          data: {
            source: "ipBlock",
            target: "ingress",
            label: "allowed",
          },
        };
        let except = {
          data: {
            id: "except",
            label: `IPs: ${array[i].ingressPolicy.except}`,
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
        relevantData.push(ingress,egress,edge,namespaceSelector,edge2,ipBlock,edge4,except,edge5);
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
    cy.zoomingEnabled(false);
    cy.on('click',(event)=> {
      console.log(event.target._private.data.id);
    })
  }, [props.jsonFiles, networkPolicy]);

  return(
    <div>
      <h1 className="header">Network Policy View</h1>  
      <div className="pageViewTest">
      <div className="sidebarTest">
        <div id="buttonDiv">
            <div className="networkLabelWhite">Choose a policy:</div>
            <select id="policies" value={networkPolicy} onChange={(e) => {
              const selected = e.target.value;
              setNetworkPolicy(selected);
            }}>
              {networkPoliciesArr.map((ele,i) => {
                return <option value={ele.label} key={i}>{ele.label}</option>
              })}
            </select>
        </div>
        <h3 className="networkLabel">{networkPolicy}</h3>
        <NetworkPolicyLegend/>
      </div>
        
          <div id="clusterView"
            ref={networkPolicyRef}
            style={ {width: '100%', height: '750px' }}>
          </div>
        </div>
    
  </div> 
)
}
// return(
//   <div>
//     <div className="sidebarTest">
//       <h1 className="header">
//       <img src="https://cdn.discordapp.com/attachments/642861879907188736/898223184346775633/grayKubernetes.png" width="3.5%" height="3.5%"></img>
//         {"Network Policy View"}
//       </h1>
//     </div>  
//       <div id="buttonDiv">
//           <h3 className="networkLabelWhite">Choose a Network Policy</h3>
//           <select id="policies" value={networkPolicy} onChange={(e) => {
//             const selected = e.target.value;
//             setNetworkPolicy(selected);
//           }}>
//             {networkPoliciesArr.map((ele,i) => {
//               return <option value={ele.label} key={i}>{ele.label}</option>
//             })}
//           </select>
//       </div>
//     <div style={{display:'flex', flexDirection:'column'}}> 
//     <h3 className="networkLabel">{networkPolicy}</h3>
//       <div id="pageView">
//         <NetworkPolicyLegend/>
//         <div id="clusterView"
//           ref={networkPolicyRef}
//           style={ {width: '1250px', height: '750px' }}
//         />
//       </div>
//   </div>
// </div> 
// )

export default NetworkPolicyView;