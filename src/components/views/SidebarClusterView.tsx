import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";
import NotLiveMessage from "./NotLiveMessage";

import FetchLiveData from "./FetchLiveData";
function SidebarClusterView(props: any) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  let deploymentStatus = props.deploymentStatus;

  const statuses: any[] = [];
  deploymentStatus.forEach((ele: any, index: number) => {
    statuses.push(<div style={{width:"300px", borderBottom:"thin solid gray", borderTop:"thin solid gray"}} key={index}>
      <table style={{width:"300px"}}>
        <tbody>
          <tr><td>Kind:</td><td>{ele.kind}</td></tr>
          <tr><td>Name:</td><td>{ele.name}</td></tr>
          <tr><td>Event:</td><td>{ele.event}</td></tr>
          <tr><td>Time:</td><td>{ele.time}</td></tr>
        </tbody>
      </table>
      </div>)
  })
  if(statuses[0] === undefined) statuses.push(<NotLiveMessage />)

  return props.namespace !== "Kubernetes Cluster" ? (
    //Node view
    <div>
      <h1>{props.masterNode}</h1>
    </div>
  ) : (
    // Cluster View
    <div>
      <div className="nodeSchedulerHeader">
        <h2>Node Scheduler Logs</h2>
        <FetchLiveData></FetchLiveData>
      </div>
    
    <div id='statusBox' style={{ display:'flex', flexDirection:'column', height:'400px', overflow: 'scroll'}}>
    {statuses}
    </div>
    </div>
  );
}

export default SidebarClusterView;