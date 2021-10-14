import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarClusterView(props: any) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  let deploymentStatus = props.deploymentStatus;
  console.log('inside sidebar: ', deploymentStatus);

  const statuses: any[] = [];
  deploymentStatus.forEach((ele: any) => {
    statuses.push(<div style={{borderBottom:"thin solid gray", borderTop:"thin solid gray"}}>
      <p  style={{textAlign:"right"}} >{ele.kind}</p><p>Name: {ele.name}</p><p>Event: {ele.event}</p><p>{ele.time}</p>
      </div>)
  })


  return props.namespace !== "Kubernetes Cluster" ? (
    <div>
      <h1>{props.masterNode}</h1>
    </div>
  ) : (
    <div>
        <h1>{props.namespace}</h1>
        <h2>Node Scheduler</h2>
    <div id='statusBox' style={{width: '300px', height:'600px' , overflow: 'scroll'}}>
        {statuses}
    </div>
    </div>
  );
}

export default SidebarClusterView;