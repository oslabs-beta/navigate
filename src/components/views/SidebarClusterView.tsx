import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarClusterView(props: any) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  let deploymentStatus = props.deploymentStatus;

  const statuses: any[] = [];
  deploymentStatus.forEach((ele: any, index: number) => {
    statuses.push(<div style={{borderBottom:"thin solid gray", borderTop:"thin solid gray"}} key={index}>
      <p  style={{textAlign:"right", fontSize:'1rem'}} >{ele.kind}</p><p style={{fontSize:'1rem'}}>Name: {ele.name}</p><p style={{fontSize:'1rem'}}>Event: {ele.event}</p><p style={{fontSize:'1rem'}}>{ele.time}</p>
      </div>)
  })

  return props.namespace !== "Kubernetes Cluster" ? (
    //Node view
    <div>
      <h1>{props.masterNode}</h1>
    </div>
  ) : (
    // Cluster View
    <div>
    <h2>Node Scheduler Logs</h2>
    <div id='statusBox' style={{ display:'flex', flexDirection:'column', height:'400px', justifyContent:'space-around',overflow: 'scroll'}}>
    {statuses}
    </div>
    </div>
  );
}

export default SidebarClusterView;