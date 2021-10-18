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