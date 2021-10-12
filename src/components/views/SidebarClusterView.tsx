import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarClusterView(props: any) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  let deploymentStatus = props.deploymentStatus;

  return props.namespace !== "default" ? (
    <div
      style={{
        display: "inline-block",
        float: "left",
        width: "300px",
        height: "600px",
        backgroundColor: "gainsboro",
      }}
    >
      <h1>Control Plane</h1>
      <h2>{`Namespace: ${props.namespace}`}</h2>
      {/* <table>
                <tbody>
                    <tr> API Server 
                        <td> column </td>
                    </tr>
                    <tr> Kube-Controller
                        <td> column </td>
                    </tr>
                    <tr> Node Scheduler
                        <td> column
                            <table>
                                <tr> Deployment Name
                                    <td> inner table </td>
                                </tr>
                                <tr>LastCreated</tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table> */}
    </div>
  ) : (
    <div
      style={{
        display: "inline-block",
        float: "left",
        width: "300px",
        height: "600px",
        backgroundColor: "gainsboro",
      }}
    >
      <h1>Control Plane</h1>
      {/* <table>
        <tbody>
            <tr> API Server 
                <td> column </td>
            </tr>
            <tr> Kube-Controller
                <td> column </td>
            </tr>
            <tr> Node Scheduler
                <td> column
                    <table>
                        <tr> Deployment Name
                            <td> inner table </td>
                        </tr>
                        <tr>LastCreated</tr>
                    </table>
                </td>
            </tr>
        </tbody>
    </table> */}
    </div>
  );
}

export default SidebarClusterView;
