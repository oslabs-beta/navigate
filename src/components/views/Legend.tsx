import * as React from 'react';

export default function Legend(props: object) {
  return (
    <div>
      <table id="legendID"> 
      <tbody>
      <tr><th>Legend</th></tr>
      <tr><td>◇</td><td>Kubernetes Cluster</td><td><img src="https://i.ibb.co/XXjPChx/podicon2.png" height="100%" width="100%"></img></td><td>Deployment</td></tr>
      <tr></tr>
      <tr><td>▭ </td><td>Namespace</td><td>◇</td><td>Kubernetes Cluster</td></tr>
      <tr></tr>
      <tr><td style={{color:'orange'}}>⇢ </td><td style={{color:'orange'}}> Deploys/Uses</td><td>⯃</td><td>Service</td></tr>
      <tr></tr>
      <tr><td>▭</td><td>Stateful Set</td><td style={{color:"light gray"}}>---</td><td style={{color:"light gray"}}>Uses</td></tr>
      <tr></tr>
      <tr><td style={{color:"purple"}}>---</td><td style={{color:"purple"}}>Deploys</td></tr>
      </tbody>
      </table>
    </div>
  )
}