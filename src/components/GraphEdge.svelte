<script>
  import { onMount, getContext } from 'svelte'

  export let edge

  const { getCyInstance } = getContext('graphSharedState')
  const cyInstance = getCyInstance()

  cyInstance.add({
    group: 'edges', //lines of a graph
    id: edge.id,
    data: { ...edge }
  })
</script>
