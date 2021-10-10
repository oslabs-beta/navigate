//populate with relevant data
import * as React from "react";
import {FC} from 'react';
import {kObject} from '../../kObjects/kObject';
import {kDeployment} from '../../kObjects/kDeployment';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { useEffect, useRef, useCallback, useState } from "react";
import cola from 'cytoscape-cola';
Cytoscape.use(cola);

function NodeView(props: any) {
  const nodeViewRef = React.useRef<HTMLDivElement>(null);;
  useEffect(() => {
    const config = {
      container: nodeViewRef.current,
      style: [
        {
          selector: "node",
          style: {
            width: "30%",
            height: "30%",
            "font-size": "14",
            content: 'data(label)',
            "text-valign": "center",
            "text-wrap": "wrap",
            "text-max-width": "140",
            "background-color": "green",
            "border-color": "black",
            "border-width": "1",
            color: "black",
          },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'color': 'blue',
            'text-background-color': '#ffffff',
            'text-background-opacity': '1',
            'text-background-padding': '3',
            'width': '3',
            'target-arrow-shape': 'triangle',
            'line-color': 'lightgreen',
            'target-arrow-color': 'lightgreen',
            'font-weight': 'bold'
          },
        },
      ],
      //write logic based on relevant data
      elements: [
        //how to make a node
        //id: anything unique ,label: name
        { data: { id: 'master', label: 'Deployment Node' }, position: { x: 200, y: 150 } },
        { data: { id: 'one', label: 'Pod 1' }, position: { x: 150, y: 150 } },
        { data: { id: 'two', label: 'Pod 2' }, position: { x: 250, y: 150 } },
        { data: { id: 'three', label: 'Pod 3' }, position: { x: 50, y: 300 } },
        { data: { id: 'four', label: 'Pod 4' }, position: { x: 250, y: 300 } },
        //how to make a connection
        { data: { source: 'master', target: 'one', label: 'Edge from Deployment Node to Pod 1' } },
        { data: { source: 'master', target: 'two', label: 'Edge from Deployment Node to Pod 2' } },
        { data: { source: 'master', target: 'three', label: 'Edge from Deployment Node to Pod 3' } },
        { data: { source: 'master', target: 'four', label: 'Edge from Deployment Node to Pod 4' } },
      ],
    };
    let cy = Cytoscape(config);
    let layout = cy.layout({name:'cola'});
    layout.run();
    cy.on('click',(event)=> {
      console.log(event.target._private.data.label);
    })
  }, []);

  return (
    <div> 
      <h1>Node View</h1>
      <button onClick={() => props.setTrigger(false)}>Back</button>
      <div id='nodeView'
        ref={nodeViewRef}
        style={ { width: '600px', height: '600px' }}
      />   
    </div>
    
 )
}

export default NodeView;










// export default function NodeView() {
//   const nodeViewRef = React.useRef<HTMLDivElement>(null);;
//   useEffect(() => {
//     const config = {
//       container: nodeViewRef.current,
//       style: [
//         {
//           selector: "node",
//           style: { 
//             'content': "data(label)",
//             'background-color': 'darkblue',
//           },
//         },
//         {
//           selector: 'edge',
//           style: {
//             'curve-style': 'bezier',
//             'color': 'blue',
//             'text-background-color': '#ffffff',
//             'text-background-opacity': '1',
//             'text-background-padding': '3',
//             'width': '3',
//             'target-arrow-shape': 'triangle',
//             'line-color': 'darkred',
//             'target-arrow-color': 'darkred',
//             'font-weight': 'bold'
//           }
//         },
//       ],
//       //write logic based on relevant data
//       elements: [
//         //how to make a node
//         { data: { id: 'master', label: 'Deployment Node' }, position: { x: 200, y: 150 } },
//         { data: { id: 'one', label: 'Pod 1' }, position: { x: 150, y: 150 } },
//         { data: { id: 'two', label: 'Pod 2' }, position: { x: 250, y: 150 } },
//         { data: { id: 'three', label: 'Pod 3' }, position: { x: 50, y: 300 } },
//         { data: { id: 'four', label: 'Pod 4' }, position: { x: 250, y: 300 } },
//         //how to make a connection
//         { data: { source: 'one', target: 'two', label: 'Edge from Deployment Node to Pod 1' } },
//         { data: { source: 'one', target: 'three', label: 'Edge from Deployment Node to Pod 2' } },
//         { data: { source: 'one', target: 'four', label: 'Edge from Deployment Node to Pod 3' } },
//         { data: { source: 'one', target: 'five', label: 'Edge from Deployment Node to Pod 4' } },
//       ],
//     };
//     let cy = Cytoscape(config);
//     cy.on('click',(event)=> {
//       console.log(event.target._private.data.label);

//     })
//   }, []);
//   return (
//     <div>
//       <h1>Node View</h1>
//       <div 
//       ref={nodeViewRef}
//       style={ { width: '600px', height: '600px' }}
//       />
//     </div>
      

//   )
// }
