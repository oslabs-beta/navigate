import * as React from "react";
import kDeploymentLive from '../../../server/kDeploymentLive';

function SidebarNodeView(props: any) {
  const podDeployObjs = props.podDeployments;
  console.log("please worksies: ", props.podInfoObjects)

  const deploymentMain: any = [];
  podDeployObjs.forEach((ele: kDeploymentLive) => {
    if(ele.name === props.masterNode){
      deploymentMain.push(
        <div>
          <table>
            <tbody>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
              <tr><td>Name:</td><td>{ele.name}</td></tr>
              <tr><td>Kind:</td><td>{ele.kind}</td></tr>
              <tr><td>Namespace:</td><td>{ele.namespace}</td></tr>
              <tr><td>Created at:</td><td>{ele.created}</td></tr>
              <tr><td>Environment Variables:</td><td><table>
                <tbody>
                  <tr>
                  <th>Name</th>
                  <th>Value</th>
                  </tr>
                  <tr>
                    <td>{ele.env[0].name}</td>
                    <td>{ele.env[0].value}</td>
                  </tr>
                </tbody>
                </table></td></tr>
              <tr><td>Resource Version:</td><td>{ele.resourceVersion}</td></tr>
              <tr><td>Restart Policy:</td><td>{ele.restartPolicy}</td></tr>
              <tr><td>Strategy Type:</td><td>{ele.strategyType}</td></tr>
              <tr><td>Max Surge:</td><td>{ele.rollingUpdateMaxSurge}</td></tr>
              <tr><td>Max Unavailable:</td><td>{ele.rollingUpdateMaxUnavailable}</td></tr>
              <tr><td>Scheduler Name:</td><td>{ele.schedulerName}</td></tr>
              <tr><td>UID:</td><td>{ele.uid}</td></tr>
            </tbody>
          </table>
        </div>
      )
    }
  })

  
  
  return(
    <div>
      {deploymentMain}
    </div>
  )
}

export default SidebarNodeView;