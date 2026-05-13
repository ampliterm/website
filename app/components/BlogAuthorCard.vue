<script setup lang="ts">
defineProps<{
  author: {
    name: string
    initials: string
    role: string
    bio?: string
  }
}>()
</script>

<template>
  <div class="author-card">
    <div class="ac-avatar">{{ author.initials }}</div>
    <div class="ac-content">
      <div class="ac-name">{{ author.name }}</div>
      <div class="ac-role">{{ author.role }}</div>
      <p v-if="author.bio" class="ac-bio">{{ author.bio }}</p>
    </div>
  </div>
</template>

<style scoped>
.author-card {
  background: var(--bg-1);
  border: 1px solid var(--border-0);
  padding: 32px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}
.ac-avatar {
  width: 56px;
  height: 56px;
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}
.ac-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-0);
  margin-bottom: 4px;
}
.ac-role {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 12px;
}
.ac-bio {
  font-size: 12px;
  color: var(--text-1);
  line-height: 1.7;
}
@media (max-width: 720px) {
  .author-card { flex-direction: column; }
}
</style>
