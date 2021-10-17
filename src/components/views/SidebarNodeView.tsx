import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarNodeView(props: any) {
  console.log('master node is: ', props.masterNode)
  console.log('inside nodeView sidebar: ', props.podDeployments)
  const podDeployObjs = props.podDeployments;

  const deploymentMain = [];
  podDeployObjs.forEach((ele: object)=>{
    if(ele.name === props.masterNode){
      deploymentMain.push(
        <div>
          <table> 
            <tbody>
              <tr>Name: <td>{ele.name}</td></tr>
              <tr>Kind: <td>{ele.kind}</td></tr>
              <tr>DNS Policy: <td>{ele.dnsPolicy}</td></tr>
              <tr>Environment Variables: 
                <td><table><tbody>
                  <td>Name<tr>{ele.env[0].name}</tr></td>
                  <td>Value<tr>{ele.env[0].value}</tr></td>
                </tbody>
                </table></td>
                </tr>
              <tr>Strategy:<td>{ele.strategy.type}</td></tr>
              <tr>{ele.strategy.type}:
                <td><table><tbody>
                  <td>Max Surge:<tr>{ele.strategy.rollingUpdate.maxSurge}</tr></td>
                  <td>Max Unavailable:<tr>{ele.strategy.rollingUpdate.maxUnavailable}</tr></td>
                  </tbody></table></td>
              </tr>
              <tr>UID: <td>{ele.uid}</td></tr>
            </tbody>
            </table>
        </div>
      )
    }
  })

  
  
  return  (
    <div>
      {/* <h1>{props.masterNode}</h1> */}
      {deploymentMain}
    </div>
  )
}

export default SidebarNodeView;