<script lang="ts">
  import Deployment from '../components/deployment.svelte';
  import type {kObject} from '../node_types/kObject';
  function handleClick(x: kObject): void {
      console.log(x.getLabel);
      
  }
</script>

<h1>Welcome to Navigate</h1>
<p>Visit <a href="/podView">kit.svelte.dev</a> to read the documentation</p>

<Deployment handleClick={handleClick} />