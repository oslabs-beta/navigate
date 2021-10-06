<script lang="ts">
  import Deployment from '../components/deployment.svelte';
  import type {kObject} from '../kObjects/kObject';
  import * as data from '../../server/yaml.json';

  function handleClick(x: kObject): void {
      console.log(x.getLabel);
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Deployment handleClick={handleClick} />