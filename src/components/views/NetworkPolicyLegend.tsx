import * as React from 'react';

export default function NetworkPolicyLegend() {
  return (
    <div>
      <table id="policyLegendID"> 
      <tbody>
      <tr><th>Legend</th></tr>
      <tr><td className="green">△</td><td className="green">Allowed Traffic</td></tr>
      <tr><td className="green">△</td><td className="green">Egress</td></tr>
      <tr><td className="green">▭</td><td className="green">Allowed Pods in Namespace</td></tr>
      <tr><td className="red">△</td><td className="red">Blocked Traffic</td></tr>
      <tr><td>▭</td><td>Ingress</td></tr>
      </tbody>
      </table>
    </div>
  )
}