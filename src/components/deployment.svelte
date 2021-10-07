<script lang="ts">
  import {kDeployment} from "../kObjects/kDeployment";

  export let testArray: kDeployment[] = [new kDeployment("broel", "", 1), new kDeployment("hemmy", "", 2), new kDeployment("bk", "", 3)];
  let radius= "40";
  let centerX= 40;
  let centerY= "40";
  let fill= "pink";
  let strokeWidth= "3";
  let stroke= "green";
  let spacing = 10;
  export let handleClick;
</script>

<style>
  .container {
    height: 80px
  }
</style>

{#each testArray as test, index}
<div on:click={handleClick(test)} class="container">
<svg viewBox= "0 0 80 80" width="80" height="80">
  <!-- add node -->
  <circle cx={(centerX)} cy={centerY} r={radius}
        stroke={stroke} stroke-width={strokeWidth} fill={fill} />
  <!-- <path d="M {centerX} {centerY} L {centerX} {centerY+radius+spacing}" stroke="black" /> -->
  <!-- <line x1={centerX} y1={centerY} x2={centerX} y2={4*centerY} stroke="black" /> -->
  <!-- add label text -->
  <text x={(centerX)} y={centerY} text-anchor="middle"><a href="/podView">{test.getLabel()}</a></text>
<!-- <line x1={centerX} y1={centerY} x2={centerX+radius} y2={centerY} stroke="black" /> -->
</svg>
</div>

<!-- add connection -->
 <!-- <svg>
  <line x1={centerX} y1={centerY} x2={centerX+radius} y2={centerY} stroke="black" />
</svg>  -->

{/each}