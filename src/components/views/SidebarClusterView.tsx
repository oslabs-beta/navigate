import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";
import NotLiveMessage from "./NotLiveMessage";
import {anyObject} from '../../kObjects/__index'

interface IProps{
  deploymentStatus?: anyObject[],
  namespace?: string
}

import FetchLiveData from "./FetchLiveData";
function SidebarClusterView(props: IProps) {
  let deploymentStatus = props.deploymentStatus;

  const statuses: any[] = [];
  if(deploymentStatus)
  deploymentStatus.forEach((ele: any, index: number) => {
    statuses.push(<div style={{width:"100%", borderBottom:"thin solid gray", borderTop:"thin solid gray"}} key={index}>
      <table style={{width:"100%"}}>
        <tbody>
          <tr><td>Kind:</td><td>{ele.kind}</td></tr>
          <tr><td>Name:</td><td>{ele.name}</td></tr>
          <tr><td>Event:</td><td>{ele.event}</td></tr>
          <tr><td>Time:</td><td>{ele.time}</td></tr>
        </tbody>
      </table>
      </div>)
  })
  if(statuses[0] === undefined) statuses.push(<NotLiveMessage key={0}/>)

  return (
    <div style={{width:"100%",height:"100%"}}>
      <div className="nodeSchedulerHeader">
        <h2> Scheduler Logs</h2>
        <FetchLiveData></FetchLiveData>
      </div>
    
    <div id='statusBox' style={{ display:'flex', flexDirection:'column', width:"100%",height:'100%', overflow: 'scroll'}}>
    {statuses}
    </div>
    </div>
  );
}

export default SidebarClusterView;