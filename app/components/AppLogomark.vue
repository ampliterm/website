<script setup lang="ts">
const props = defineProps({
  size: { type: Number, default: 24 },
  color: { type: String, default: 'var(--green)' },
})

const height = computed(() => Math.round(props.size * 1.167))
</script>

<template>
  <svg :width="size" :height="height" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="12,2 22,20 2,20" fill="none" :stroke="color" stroke-width="1.5" stroke-linejoin="miter"/>
    <line x1="6.5" y1="14.5" x2="17.5" y2="14.5" :stroke="color" stroke-width="1" opacity="0.5"/>
    <line x1="12" y1="20" x2="12" y2="27" :stroke="color" stroke-width="1" stroke-dasharray="1.5,2" opacity="0.6"/>
    <line x1="9" y1="27" x2="15" y2="27" :stroke="color" stroke-width="1" opacity="0.4"/>
  </svg>
</template>
