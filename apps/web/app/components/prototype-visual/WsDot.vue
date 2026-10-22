<script setup lang="ts">
// Workspace colour as a dot. Always shown next to the workspace name (colour is never the only signal).
defineProps<{ colour: number; size?: 'sm' | 'md' }>()
</script>

<template>
  <span :class="[`ws-${colour}`, size === 'md' ? 'size-2.5' : 'size-2', 'inline-block shrink-0 rounded-full bg-ws-dot']" aria-hidden="true" />
</template>
