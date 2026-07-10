<script setup lang="ts">
defineProps<{
  post: {
    path: string
    title: string
    excerpt: string
    date: string
    author?: { name: string; initials: string; role: string } | null
    tags: Array<{ label: string; variant: 'cyan' | 'green' | 'amber' | 'red' | 'neutral' }>
    imagePlaceholder?: string
    headerImage?: string
  }
}>()

const formatDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
</script>

<template>
  <div class="featured-card">
    <div v-if="post.headerImage" class="featured-image">
      <img :src="post.headerImage" :alt="post.title" class="featured-img">
    </div>
    <div v-else class="featured-image">
      <div class="img-bg" />
      <svg class="featured-chart" width="340" height="180" viewBox="0 0 340 180" fill="none">
        <line x1="0" y1="40" x2="340" y2="40" stroke="#2a2a2a" stroke-width=".6" />
        <line x1="0" y1="80" x2="340" y2="80" stroke="#2a2a2a" stroke-width=".6" />
        <line x1="0" y1="120" x2="340" y2="120" stroke="#2a2a2a" stroke-width=".6" />
        <line x1="0" y1="160" x2="340" y2="160" stroke="#2a2a2a" stroke-width=".6" />
        <line x1="68" y1="0" x2="68" y2="180" stroke="#2a2a2a" stroke-width=".6" />
        <line x1="136" y1="0" x2="136" y2="180" stroke="#2a2a2a" stroke-width=".6" />
        <line x1="204" y1="0" x2="204" y2="180" stroke="#2a2a2a" stroke-width=".6" />
        <line x1="272" y1="0" x2="272" y2="180" stroke="#2a2a2a" stroke-width=".6" />
        <path
          d="M0,150 C20,145 30,138 50,132 C70,126 80,118 100,105 C120,92 130,85 155,72 C180,59 195,52 215,42 C235,32 255,28 275,22 C295,16 315,14 340,10 L340,180 L0,180 Z"
          fill="#00e676"
          opacity=".06"
        />
        <path
          d="M0,150 C20,145 30,138 50,132 C70,126 80,118 100,105 C120,92 130,85 155,72 C180,59 195,52 215,42 C235,32 255,28 275,22 C295,16 315,14 340,10"
          fill="none"
          stroke="#00e676"
          stroke-width="1.5"
          opacity=".8"
        />
        <path
          d="M0,155 C60,148 120,130 180,108 C240,86 300,55 340,36"
          fill="none"
          stroke="#00b8d4"
          stroke-width="1"
          stroke-dasharray="4,3"
          opacity=".5"
        />
        <line x1="136" y1="0" x2="136" y2="180" stroke="#f5a623" stroke-width="1" stroke-dasharray="2,3" opacity=".6" />
        <text x="138" y="14" font-family="JetBrains Mono,monospace" font-size="8" fill="#f5a623" opacity=".8">ENTRY</text>
      </svg>
      <div class="img-label">{{ post.imagePlaceholder ?? 'Chart placeholder' }}</div>
    </div>

    <div class="featured-content">
      <div class="fc-top">
        <BlogTag
          v-for="tag in post.tags"
          :key="tag.label"
          :label="tag.label"
          :variant="tag.variant"
        />
        <span class="post-date">{{ formatDate(post.date) }}</span>
      </div>
      <h2>
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
      </h2>
      <p class="excerpt">{{ post.excerpt }}</p>
      <div class="fc-meta">
        <div class="fc-author">
          <div class="author-avatar">{{ post.author?.initials ?? 'AT' }}</div>
          <div>
            <div class="author-name">{{ post.author?.name ?? 'Ampliterm' }}</div>
            <div class="author-role">{{ post.author?.role ?? '' }}</div>
          </div>
        </div>
        <NuxtLink :to="post.path" class="read-link">Read article →</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border-0);
  border: 1px solid var(--border-0);
}

.featured-image {
  background: var(--bg-2);
  position: relative;
  overflow: hidden;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
}
.featured-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-bg {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    var(--bg-2) 0px,
    var(--bg-2) 8px,
    var(--bg-3) 8px,
    var(--bg-3) 16px
  );
  opacity: 0.5;
}
.featured-chart { position: relative; z-index: 1; max-width: 100%; height: auto; }
.img-label {
  position: relative;
  z-index: 1;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-2);
  border: 1px dashed var(--border-2);
  padding: 6px 12px;
  text-align: center;
}

.featured-content {
  background: var(--bg-1);
  padding: 48px;
  display: flex;
  flex-direction: column;
}

.fc-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.post-date {
  font-size: 9px;
  color: var(--text-2);
  letter-spacing: 0.06em;
  margin-left: 4px;
}

h2 {
  font-size: clamp(20px, 2.5vw, 30px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-0);
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}
h2 a {
  text-decoration: none;
  color: inherit;
  transition: color 0.1s;
}
h2 a:hover { color: var(--green); }

.excerpt {
  font-size: 12px;
  color: var(--text-1);
  line-height: 1.8;
  margin-bottom: 28px;
  flex: 1;
}

.fc-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid var(--border-0);
}
.fc-author {
  display: flex;
  align-items: center;
  gap: 10px;
}
.author-avatar {
  width: 28px;
  height: 28px;
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}
.author-name { font-size: 11px; color: var(--text-0); font-weight: 600; }
.author-role { font-size: 9px; color: var(--text-2); letter-spacing: 0.05em; }

.read-link {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--green);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.15s;
  white-space: nowrap;
}
.read-link:hover { gap: 10px; }

@media (max-width: 960px) {
  .featured-card { grid-template-columns: 1fr; }
  .featured-image { min-height: 220px; }
  .featured-content { padding: 32px; }
}
</style>
