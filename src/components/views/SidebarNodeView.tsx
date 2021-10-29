import { HtmlTagObject } from "html-webpack-plugin";
import * as React from "react";
import kDeploymentLive from '../../../server/kDeploymentLive';
import kPodLive from '../../../server/kPodLive'
import PodInfoInNodeView from './PodInfoInNodeView';
import NotLiveMessage from "./NotLiveMessage";

function SidebarNodeView(props: any) {
  const deployObjs = props.podDeployments;
  const podObjs = props.podInfoObjects;
  // Filtering podObject list based on on-click 
  const displayPod: Array<object> = [];
  podObjs.forEach((ele: kPodLive) => {
    if(ele.name === props.clickedPod){
      displayPod.push(ele)
    }
  })

  // Displaying deployment information
  const deploymentMain: any = [];
  deployObjs.forEach((ele: kDeploymentLive) => {
    if(ele.name + " deployment" === props.masterNode){
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
  let displayPodInfo = [<PodInfoInNodeView displayPod = {displayPod}/>];


  if(deploymentMain[0] === undefined) {
    deploymentMain.push(<NotLiveMessage />);
    displayPodInfo = [<NotLiveMessage />];
  }
  
  return props.clickedPod === undefined ? (
    <div>
      {deploymentMain}
    </div>
  ) : (
    <div>
      {displayPodInfo}
  </div>
  )
}

export default SidebarNodeView;