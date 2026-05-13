<script setup lang="ts">
defineProps<{
  post: {
    path: string
    title: string
    excerpt: string
    date: string
    author: { name: string }
    tags: Array<{ label: string; variant: 'cyan' | 'green' | 'amber' | 'red' | 'neutral' }>
    readTime: string
    imagePlaceholder?: string
  }
}>()

const formatDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
</script>

<template>
  <NuxtLink :to="post.path" class="post-card">
    <div class="post-card-image">
      <div class="post-card-img-strip" />
      <div class="post-card-img-label">{{ post.imagePlaceholder ?? 'Blog post image' }}</div>
    </div>
    <div class="post-card-body">
      <div class="post-card-tags">
        <BlogTag
          v-for="tag in post.tags"
          :key="tag.label"
          :label="tag.label"
          :variant="tag.variant"
        />
      </div>
      <div class="post-card-title">{{ post.title }}</div>
      <p class="post-card-excerpt">{{ post.excerpt }}</p>
      <div class="post-card-footer">
        <div class="pf-author">By <span>{{ post.author.name }}</span></div>
        <div class="pf-right">
          <div class="pf-date">{{ formatDate(post.date) }}</div>
          <div class="pf-read">{{ post.readTime }}</div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.post-card {
  background: var(--bg-0);
  display: flex;
  flex-direction: column;
  transition: background 0.15s;
  text-decoration: none;
  color: inherit;
}
.post-card:hover { background: var(--bg-1); }

.post-card-image {
  height: 180px;
  background: var(--bg-2);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border-0);
}
.post-card-img-strip {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    135deg,
    var(--bg-2) 0px,
    var(--bg-2) 6px,
    var(--bg-3) 6px,
    var(--bg-3) 12px
  );
  opacity: 0.4;
}
.post-card-img-label {
  position: relative;
  z-index: 1;
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  border: 1px dashed var(--border-1);
  padding: 4px 8px;
}

.post-card-body {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.post-card-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.post-card-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-0);
  letter-spacing: -0.01em;
  transition: color 0.1s;
}
.post-card:hover .post-card-title { color: var(--green); }

.post-card-excerpt {
  font-size: 11px;
  color: var(--text-1);
  line-height: 1.7;
  flex: 1;
}

.post-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid var(--border-0);
  margin-top: auto;
}
.pf-author { font-size: 10px; color: var(--text-2); }
.pf-author span { color: var(--text-1); }
.pf-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}
.pf-date { font-size: 9px; color: var(--text-2); }
.pf-read { font-size: 9px; color: var(--text-2); letter-spacing: 0.05em; }
</style>
