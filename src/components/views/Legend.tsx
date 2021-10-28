import * as React from 'react';

export default function Legend(props: any) {
  return props.view === "Cluster View" ? (
    <div>
      <table className="legendID"> 
      <tbody>
      <tr><th><h3 className="legendTitle">Legend</h3></th></tr>
      <tr><td><img src="https://i.ibb.co/rFcjXmq/round-Rect-Purple.png"></img></td><td>Namespace</td><td><img src="https://i.ibb.co/9V5KVmP/icons8-big-parcel-35.png"></img></td><td>Deployment</td></tr>
      <tr><td><img src="https://i.ibb.co/X5wCv7S/network-Icon.png"></img></td><td>Service</td><td><img src="https://i.ibb.co/LSHKPdZ/icons8-database-35.png"></img></td><td>Stateful Set</td></tr>
      <tr><td style={{color:'orange'}}>⇢ </td><td style={{color:'orange'}}> Deploys/Uses</td><td style={{color:"light gray"}}>┉┉</td><td style={{color:"light gray"}}>Uses</td></tr>
      <tr><td style={{color:'rgb(87,39,199)'}}>➞</td><td style={{color:'rgb(87,39,199)'}}> Deploys</td></tr>
      <tr></tr>
      </tbody>
      </table>
    </div>
  )
  :
  (
  <div>
      <table className="legendID"> 
      <tbody>
      <tr><th><h3 className="legendTitle">Legend</h3></th></tr>
      <tr><td><img src="https://i.ibb.co/s6YrbyT/round-Rect-Dark.png"></img></td><td>Deployment</td><td><img src="https://i.ibb.co/XXjPChx/podicon2.png" height="100%" width="100%"></img></td><td>Pod</td></tr>
      <tr><td><img src="https://i.ibb.co/rFcjXmq/round-Rect-Purple.png"></img></td><td>Stateful Set</td><td><img src="https://i.ibb.co/X5wCv7S/network-Icon.png"></img></td><td>Service</td></tr>
      <tr></tr>
      <tr></tr>
      <tr><td style={{color:'orange'}}>⇢ </td><td style={{color:'orange'}}> Deploys/Uses</td><td style={{color:"light gray"}}>---</td><td style={{color:"light gray"}}>Uses</td></tr>
      <tr></tr>
      <tr></tr>
      <tr><td style={{color:"purple"}}>---</td><td style={{color:"purple"}}>Deploys</td></tr>
      </tbody>
      </table>
    </div>
  )
}