import * as React from "react";

function PodInfoInNodeView(props: any) {
    const pod = props.displayPod[0];

    return (
        <div>
            <table >
                <tbody>
                    <tr>
                        <th>Properties</th>
                        <th>Values</th>
                    </tr>
                    <tr><td>Name</td><td>{pod.name}</td></tr>
                    <tr><td>Kind</td><td>{pod.kind}</td></tr>
                    <tr><td>Namespace</td><td>{pod.namespace}</td></tr>
                    <tr><td>Node Name</td><td>{pod.nodeNode}</td></tr>

                    <tr><td>Phase</td><td>{pod.phase}</td></tr>
                    <tr><td>Pod IP Address</td><td>{pod.podIP}</td></tr>
                    <tr><td>Resource Version</td><td>{pod.resourceVersion}</td></tr>
                    <tr><td>Restart Policy</td><td>{pod.restartPolicy}</td></tr>
                    <tr><td>Created At</td><td>{pod.created}</td></tr>
                    <tr><td>DNS Policy</td><td>{pod.dnsPolicy}</td></tr>


                    <tr><td>Container</td><td>{pod.container}</td></tr>
                    <tr><td>Container ID</td><td>{pod.containerID}</td></tr>
                    <tr><td>Container Run Started</td><td>{pod.containerRunStarted}</td></tr>
                    <tr><td>Image</td><td>{pod.image}</td></tr>
                    <tr><td>Image ID</td><td>{pod.imageID}</td></tr>
                    <tr><td>Image Pull Policy</td><td>{pod.imagePullPolicy}</td></tr>

                    <tr><td>Scheduler Name</td><td>{pod.schedulerName}</td></tr>
                    <tr><td>Service Account</td><td>{pod.serviceAccount}</td></tr>
                    <tr><td>Service Account Name</td><td>{pod.serviceAccountName}</td></tr>
                    <tr><td>UID</td><td>{pod.uid}</td></tr>

                    <tr><td>Volume Mount Path</td><td>{pod.volumeMountPath}</td></tr>
                    <tr><td>Volume Names</td><td>{pod.volumeNames}</td></tr>
                    <tr><td>Volume ReadOnly</td><td>{pod.volumeReadOnly}</td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default PodInfoInNodeView;