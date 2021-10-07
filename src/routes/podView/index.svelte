<script lang="ts">
	import { kDeployment } from '../../kObjects/kDeployment';
	import Graph from '../../components/Graph.svelte';
	import GraphNode from '../../components/GraphNode.svelte';
	import GraphEdge from '../../components/GraphEdge.svelte';
	//include service node that makes a one to many connection from deployment node to all its pods
	const nodes = [
		{ id: 'N1', label: 'thisisalongassname' },
		{ id: 'N2', label: '4' },
		{ id: 'N4', label: '8' },
		{ id: 'N5', label: '15' },
		{ id: 'N3', label: '16' },
		{ id: 'N6', label: '23' },
		{ id: 'N7', label: '42' },
		{ id: 'N8', label: 'End' }
	];

	const edges = [
		//owner objs have owner reference prop
		//dependents have a prop that states who their owner is
		//make edge owner source, dependent target
		//consider labels/selectors
		{ id: 'E1', source: 'N1', target: 'N2' },
		{ id: 'E2', source: 'N2', target: 'N3' },
		{ id: 'E3', source: 'N3', target: 'N6' },
		{ id: 'E4', source: 'N2', target: 'N4' },
		{ id: 'E5', source: 'N4', target: 'N5' },
		{ id: 'E6', source: 'N5', target: 'N4'},
		{ id: 'E7', source: 'N5', target: 'N6' },
		{ id: 'E8', source: 'N6', target: 'N7' },
		{ id: 'E9', source: 'N7', target: 'N7'},
		{ id: 'E10', source: 'N7', target: 'N8' }
	];
</script>

<Graph>
    <!-- <h1>tem smol moves</h1> -->
	{#each nodes as node}
		<GraphNode node={node} />
	{/each}

	{#each edges as edge}
		<GraphEdge edge={edge} />
	{/each}
</Graph>
