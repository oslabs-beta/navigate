import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarNodeView(props: any) {
  return  (
    <div>
      <h1>{props.masterNode}</h1>
      <div id="sidebar">
      <div id="legend">
          <h2>Legend</h2>
            <p>◇ = Kubernetes Cluster</p>
            <p>○ = Deployment</p>
            <p>▭ = Namespace</p>
            <p>△  = Service</p>
            <p>▱  = Stateful Set</p>
            <p style={{color:"light gray"}}>--- = Uses</p>
            <p style={{color:"purple"}}>--- = Deploys</p>
            <p style={{color:"orange"}}>⇢ = Deploys/Uses</p>
      </div>
    </div>
    </div>
  )
}

export default SidebarNodeView;