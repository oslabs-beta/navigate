import * as React from 'react';

function Legend(props: object) {
  return (
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
  )
}