<script setup lang="ts">
const progress = ref(0)

const onScroll = () => {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - doc.clientHeight
  progress.value = scrollable > 0 ? doc.scrollTop / scrollable : 0
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="read-progress">
    <div class="read-progress-bar" :style="{ width: `${progress * 100}%` }" />
  </div>
</template>

<style scoped>
.read-progress {
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--border-0);
  z-index: 200;
}
.read-progress-bar {
  height: 100%;
  background: var(--green);
  transition: width 0.1s linear;
}
</style>
