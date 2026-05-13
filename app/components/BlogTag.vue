<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'cyan' | 'green' | 'amber' | 'red' | 'neutral'
}>()
</script>

<template>
  <span class="tag" :class="`tag-${variant ?? 'neutral'}`">{{ label }}</span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  padding: 2px 7px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid;
  white-space: nowrap;
}
.tag-cyan    { color: var(--cyan);   border-color: var(--cyan);   background: var(--cyan-dim); }
.tag-green   { color: var(--green);  border-color: var(--green);  background: var(--green-dim); }
.tag-amber   { color: var(--amber);  border-color: var(--amber);  background: var(--amber-dim); }
.tag-red     { color: var(--red);    border-color: var(--red);    background: var(--red-dim); }
.tag-neutral { color: var(--text-1); border-color: var(--border-2); background: var(--bg-3); }
</style>
