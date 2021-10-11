import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarClusterView(props: any) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    let deploymentStatus = props.deploymentStatus;
    
    //onmount exec(schedulerLogs.js)
    return(
        <div style={ { display:'inline-block', float: 'left',  width: '300px', height: '600px', backgroundColor:'gainsboro' }}>
            <h1>Control Plane</h1>
            <h2> logs </h2>
            <table>
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
            </table>
        </div>
    )
}

export default SidebarClusterView;