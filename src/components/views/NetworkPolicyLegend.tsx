import * as React from 'react';

export default function NetworkPolicyLegend() {
  return (
    <div>
      <table id="policyLegendID"> 
      <tbody>
      <tr><th>Legend</th></tr>
      <tr><td>△</td><td>External IP addresses</td></tr>
      <tr><td>▭</td><td>Pod</td></tr>
      <tr><td className="green">⇢</td><td className="green">Allowed Traffic</td></tr>
      <tr><td className="red">⇢</td><td className="red">Blocked Traffic</td></tr>
      </tbody>
      </table>
    </div>
  )
}