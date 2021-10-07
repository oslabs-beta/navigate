<script lang="ts">
  import Deployment from '../components/deployment.svelte';
  import type {kObject} from '../kObjects/kObject';
  import * as data from '../../server/yaml.json';
  import { kDeployment } from '../kObjects/kDeployment';

  const relevantData = data["default"];
  const deploymentArray: kDeployment[] = [];
  
  relevantData.forEach(ele => {
    if(ele.kind === "Deployment")
      deploymentArray.push(new kDeployment(ele.metadata.name, ele.spec.template.metadata.labels.name, ele.spec.replicas));
  });

  function handleClick(x: kObject): void {
      console.log(x.getLabel);
      
  }
</script>

<h1>Welcome to Navigate</h1>
<p>Visit <a href="/podView">kit.svelte.dev</a> to read the documentation</p>

<Deployment handleClick={handleClick} testArray={deploymentArray}/>

