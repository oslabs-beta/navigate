<script>
  import { onMount, getContext } from 'svelte'

  export let node;

  const { getCyInstance } = getContext('graphSharedState')
  const cyInstance = getCyInstance()

  cyInstance.add({
    group: 'nodes',
    id: node.id,
    data: { ...node }
  })
</script>
