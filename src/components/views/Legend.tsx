import * as React from 'react';

export default function Legend(props: object) {
  return (
    <div>
      <table id="legendID"> 
      <tbody>
      <tr><th>Legend</th></tr>
      <tr><td>◇</td><td>Kubernetes Cluster</td><td><img src="https://i.ibb.co/XXjPChx/podicon2.png" height="100%" width="100%"></img></td><td>Deployment</td></tr>
      <tr></tr>
      <tr><td>▭ </td><td>Namespace</td><td style={{color:"rgb(86, 39, 197)"}}>---</td><td style={{color:"rgb(86, 39, 197)"}}>Deploys</td></tr>
      <tr></tr>
      <tr><td>⯃</td><td>Service</td><td style={{color:'orange'}}>⇢ </td><td style={{color:'orange'}}> Deploys/Uses</td></tr>
      <tr></tr>
      <tr><td>▭</td><td>Stateful Set</td><td style={{color:"rgb(75, 75, 75)"}}>---</td><td style={{color:"light gray"}}>Uses</td></tr>
      <tr></tr>
      <tr><td>⬡</td><td>Control Plane</td></tr>
      </tbody>
      </table>
    </div>
  )
}