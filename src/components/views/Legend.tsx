import * as React from 'react';

export default function Legend(props: object) {
  return (
    <div>
      <table id="legendID"> 
      <tbody>
      <tr><th>Legend</th></tr>
      <tr><td>◇</td><td>Kubernetes Cluster</td></tr>
      <tr><td>○</td><td>Deployment</td></tr>
      <tr><td>▭ </td><td>Namespace</td></tr>
      <tr><td>◇</td><td>Kubernetes Cluster</td></tr>
      <tr><td style={{color:'orange'}}>⇢ </td><td style={{color:'orange'}}> Deploys/Uses</td></tr>
      <tr><td>⯃</td><td>Service</td></tr>
      <tr><td>▭</td><td>Stateful Set</td></tr>
      <tr><td style={{color:"light gray"}}>---</td><td style={{color:"light gray"}}>Uses</td></tr>
      <tr><td style={{color:"purple"}}>---</td><td style={{color:"purple"}}>Deploys</td></tr>
      </tbody>
      </table>
    </div>
  )
}


{/* <h2>Legend</h2>
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
*/}