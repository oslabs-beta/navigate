<script lang="ts">
import {kDeployment} from "../../node_types/kDeployment"
let testArray: kDeployment[] = [new kDeployment("broel", "podName1",3), new kDeployment("hemmy", "podName2", 2), new kDeployment("bk","podName3", 3)];
let testNode = testArray[0];
let replicaArray = ['podName1','podName2','podName3']

</script>



<h1>Pod View</h1>
<p><a href="/">Home</a></p>
<svg  width="100%" height="500">
    <!-- Deployment node -->
    <!-- Pods -->
    {#each replicaArray as replica, index}
    <!-- Lines -->
    <!-- <line x1={25+index*100} y1={25+index*150} x2=50% y2=50% stroke="black"></line> -->
    <line x1={25+index*100} y1=70% x2=50% y2=50% stroke="black"></line>
    <!-- Pods -->
    <!-- <circle id={replica} cx={25+index*100} cy={25+index*150} r=40 stroke="purple" stroke-width=3 fill="yellow" /> -->
    <circle id={replica} cx={25+index*100} cy=70% r=40 stroke="purple" stroke-width=3 fill="yellow" />
    <!-- Text -->
    <!-- <text x={25+index*100} y=50% text-anchor="middle">{replica}</text> -->
    <text x={25+index*100} y=70% text-anchor="middle">{replica}</text>
    {/each}
     <!-- Deployment node -->
    <circle cx=50% cy=50% r=80 stroke="blue" stroke-width=3 fill="green" />
    <text x=50% y=50% text-anchor="middle">{testNode.getLabel()}</text>
</svg>