import * as React from 'react';

export default function Legend(props: object) {
  return (
    <div id="legendContainer">
      <h2>Legend</h2>
      <div id="legendCol">
        <ul>
          <li>◇ = Kubernetes Cluster</li>
          <li>○ = Deployment</li>
          <li>▭ = Namespace</li>
          <li style={{color:"orange"}}>⇢ = Deploys/Uses</li>
        </ul>
        </div>
      <div id='legendCol'>
        <ul>
        <li>⯃  = Service</li>
        <li>▭  = Stateful Set</li>
        <li style={{color:"light gray"}}>--- = Uses</li>
        <li style={{color:"purple"}}>--- = Deploys </li>
        </ul>
      </div>
    </div>
  )
}