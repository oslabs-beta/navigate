import * as React from "react";
import Cytoscape from "cytoscape";
import SidebarClusterView from "./SidebarClusterView";
import dagre from "cytoscape-dagre";
import cola from "cytoscape-cola";
import { GraphStyles } from "../../scss/GraphStyles";
import Legend from "./Legend";
import { electron } from "webpack";
import { anyObject } from "../../kObjects/__index";
import { findSelectorMatch } from "../../component_data/findSelectorMatch";
import FetchLiveData from "./FetchLiveData";
Cytoscape.use(dagre);
Cytoscape.use(cola);
dagre(Cytoscape);

function ClusterView(props: any) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const relevantData: any[] = [
    { data: { id: "Kubernetes Cluster", label: "Control \n Plane" } },
  ];
  const namespacesArr: string[] = [];
  const populateNamespaces = (array: any[]): void => {
    array.forEach((kObject) => {
      if (
        !namespacesArr.includes(kObject.namespace) &&
        kObject.namespace !== undefined
      )
        namespacesArr.push(kObject.namespace);
    });
    namespacesArr.forEach((namespace) => {
      relevantData.push(
        {
          data: { id: namespace, label: namespace, class: "namespace" },
        },
        {
          data: {
            source: "Kubernetes Cluster",
            target: namespace,
          },
        }
      );
    });
  };
  const allLabels: any[] = [];
  props.dataArray.forEach((ele: any) => {
    if (ele.label !== undefined) allLabels.push(ele.label);
  });
  const populateArray = (array: any[]): void => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].kind === "Deployment") {
        let newNode = {
          data: {
            id: `${array[i].label} deployment`,
            label: array[i].label,
            class: "deployment",
          },
        };
        let edge = {
          data: {
            source: array[i].namespace,
            target: `${array[i].label} deployment`,
            label: `service`,
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
        if (!namespacesArr.includes(array[i].label)) {
          let newNode = {
            data: {
              id: array[i].label,
              label: array[i].type
                ? `${array[i].label} ${array[i].type}`
                : `${array[i].label} ClusterIP`,
              class: "service",
            },
          };
          props.dataArray.forEach((ele: any) => {
            if (
              ele.kind === "Deployment" &&
              ele.namespace === array[i].namespace &&
              findSelectorMatch(ele, array[i])
            ) {
              let edge = {
                data: {
                  source: ele.label + " deployment",
                  target: array[i].label,
                  label: `connection`,
                },
              };
              let edge2 = {
                data: {
                  source: array[i].namespace,
                  target: array[i].label,
                  label: "service",
                },
              };
              relevantData.push(edge, edge2);
            }
          });
          relevantData.push(newNode);
        } else {
          let newNode = {
            data: {
              id: `${array[i].label} service`,
              label: array[i].type
                ? `${array[i].label} ${array[i].type}`
                : `${array[i].label} ClusterIP`,
              class: "service",
            },
          };
          props.dataArray.forEach((ele: any) => {
            if (
              ele.kind === "Deployment" &&
              ele.namespace === array[i].namespace &&
              findSelectorMatch(ele, array[i])
            ) {
              let edge = {
                data: {
                  source: ele.label + " deployment",
                  target: array[i].label + " service",
                  label: `connection`,
                },
              };
              let edge2 = {
                data: {
                  source: array[i].namespace,
                  target: array[i].label + " service",
                  label: "service",
                },
              };
              relevantData.push(edge, edge2);
            }
          });
          relevantData.push(newNode);
        }
      } else if (array[i].kind === "DaemonSet") {
        let newDaemonSet = {
          data: {
            id: array[i].label,
            label: array[i].label,
            class: "daemonSet",
          },
        };
        let edge = {
          data: {
            source: array[i].namespace,
            target: array[i].label,
            label: `daemonSet`,
          },
        };
        relevantData.push(newDaemonSet, edge);
      }
    }
  };
  const getNamespace = (id: string) => {
    for (let i = 0; i < props.dataArray.length; i++) {
      if (props.dataArray[i].label === id) {
        return props.dataArray[i].namespace;
      }
    }
  };
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
      name: "dagre",
      nodeDimensionsIncludeLabels: true,
      padding: "10",
      animate: true,
      animationDuration: 1000,
    });
    layout.run();
    cy.zoomingEnabled(false);
    cy.on("click", (event) => {
      if (
        event.target._private.data.class === "deployment" &&
        event.target._private.data.label !== undefined &&
        event.target._private.data.target === undefined &&
        event.target._private.data.label !== "Kubernetes Cluster" &&
        !namespacesArr.includes(event.target._private.data.label)
      ) {
        props.setView("Node View");
        props.setNamespace(getNamespace(event.target._private.data.id));
        props.setMasterNode(event.target._private.data.id);
        props.setTrigger(true);
        console.log(event.target._private.data.id);
      }
    });
    cy.on("mouseover", "node[class = 'deployment']", function (event) {
      event.target.style("background-image", [
        "https://i.ibb.co/crdrm4F/icons8-big-parcel-35-orange.png",
      ]);
      event.target.style("background-color", "rgb(230,74,0)");
      event.target.style("border-color", "rgb(230,74,0)");
      event.target.style("border-width", "1");
    });
    cy.on("mouseout", "node[class = 'deployment']", function (event) {
      event.target.style("background-image", [
        "https://i.ibb.co/9V5KVmP/icons8-big-parcel-35.png",
      ]);
      event.target.style("background-color", "white");
      event.target.style("border-width", "0");
    });
    return () => {
      console.log("cleanup");
    };
  }, [props.dataArray]);

  const limitSidebarHeight =
    document.getElementById("clusterView")?.style.height;

  return (
    <div>
      <h1 className="header">{props.view}</h1>
      <div className="pageViewTest2">
        <div className="sidebarTest2">
          <div
            id="buttonDiv"
            style={{ display: "flex", flexDirection: "row" }}
          ></div>
          <div>
            <SidebarClusterView
              deploymentStatus={props.deploymentStatus}
              namespace={props.namespace}
            />
          </div>
          <div style={{width: window.innerWidth * .3}}>
             <Legend view={props.view} />
          </div>
          
        </div>
        <div id="cytoscapeDiv">
          <div
            id="clusterView"
            ref={containerRef}
            style={{ width: window.innerWidth * .7, height: window.outerHeight *.5}}
          />
        </div>
      </div>
    </div>
  );
}

export default ClusterView;