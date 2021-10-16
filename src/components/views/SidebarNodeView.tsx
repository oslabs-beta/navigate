import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarNodeView(props: any) {
  return  (
    <div style={{ width:'300px', height: '750px', overflow: 'scroll'}}>
      <h1>{props.masterNode}</h1>
      <h4>{props.target}</h4>
      <p>{`Image name: ${props.image}`}</p>
      <p>Kind: Deployment</p>
      <p>Namespace: mafia</p>
      <p>Deployment Strategy: RollingUpdate</p>
      <p>Max Surge: 25%</p> 
      <p>Max Unavailable: 25%</p> 
      <p>Environment Variables: name=REDIS_HOST</p>
      <p>Environment Variables: value=redis.service.mafia</p> 
    </div>
  )
}

export default SidebarNodeView;