<script setup lang="ts">
const { data: allPosts } = await useAsyncData('blog-listing', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

console.log(allPosts.value)
const categories = [
  { key: 'all', label: 'All' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'psychology', label: 'Psychology' },
  { key: 'technicals', label: 'Technicals' },
  { key: 'platform', label: 'Platform' },
]

const activeFilter = ref('all')
const showCount = ref(6)

const featuredPost = computed(() =>
  allPosts.value?.find(p => p.featured) ?? allPosts.value?.[0] ?? null,
)

const gridPosts = computed(() => {
  const posts = allPosts.value?.filter(p => !p.featured) ?? []
  if (activeFilter.value === 'all') return posts
  return posts.filter(p => p.category === activeFilter.value)
})

const visiblePosts = computed(() => gridPosts.value.slice(0, showCount.value))

const categoryCount = (key: string) => {
  if (!allPosts.value) return 0
  if (key === 'all') return allPosts.value.length
  return allPosts.value.filter(p => p.category === key).length
}

const setFilter = (key: string) => {
  activeFilter.value = key
  showCount.value = 6
}

useHead({
  title: 'Research Blog — Ampliterm',
  meta: [
    { name: 'description', content: 'Strategy breakdowns, trading psychology, technical analysis primers, and deep-dives into how serious traders actually build an edge.' },
  ],
})

useSeoMeta({
  ogImage: 'https://ampliterm.com/og/blog-og.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
})
</script>

<template>
  <div>
    <AppNav active-page="blog" />

    <header class="page-header">
      <div class="ph-left">
        <div class="ph-eyebrow">Research &amp; Insights</div>
        <h1 class="ph-h1">The Ampliterm<br>Research Blog</h1>
        <p class="ph-sub">Strategy breakdowns, trading psychology, technical analysis primers, and deep-dives into how serious traders actually build an edge.</p>
      </div>
      <div class="ph-right">
        <div class="ph-stat-val">{{ allPosts?.length ?? 0 }}</div>
        <div class="ph-stat-label">Articles published</div>
      </div>
    </header>

    <div class="filter-bar">
      <div class="filter-bar-inner">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="filter-btn"
          :class="{ active: activeFilter === cat.key }"
          @click="setFilter(cat.key)"
        >
          {{ cat.label }}<span class="filter-count">{{ categoryCount(cat.key) }}</span>
        </button>
        <div class="filter-right">
          <select class="filter-sort">
            <option>Newest first</option>
            <option>Oldest first</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="featuredPost" class="featured-wrap">
      <div class="section-label">// featured — latest</div>
      <BlogFeaturedPost :post="featuredPost" />
    </div>

    <div class="posts-section">
      <div class="section-label posts-label">// recent articles</div>
      <div v-if="visiblePosts.length" class="posts-grid">
        <BlogPostCard
          v-for="post in visiblePosts"
          :key="post.path"
          :post="post"
        />
      </div>
      <div v-else class="posts-empty">No articles in this category yet.</div>

      <div v-if="visiblePosts.length < gridPosts.length" class="load-more-row">
        <button class="load-more-btn" @click="showCount += 6">Load more articles</button>
        <span class="load-more-count">Showing {{ visiblePosts.length }} of {{ gridPosts.length }}</span>
      </div>
    </div>

    <EarlyAccessStrip />
    <AppFooter />
  </div>
</template>

<style scoped>
.page-header {
  padding: 100px 40px 56px;
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  border-bottom: 1px solid var(--border-0);
}
.ph-eyebrow {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ph-eyebrow::before {
  content: '';
  width: 16px;
  height: 1px;
  background: var(--green);
}
.ph-h1 {
  font-size: clamp(28px, 3.5vw, 48px);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.1;
  color: var(--text-0);
  margin-bottom: 12px;
}
.ph-sub {
  font-size: 13px;
  color: var(--text-1);
  max-width: 480px;
  line-height: 1.7;
}
.ph-right { flex-shrink: 0; text-align: right; }
.ph-stat-val {
  font-size: 28px;
  font-weight: 700;
  color: var(--green);
}
.ph-stat-label {
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-2);
}

.filter-bar {
  border-bottom: 1px solid var(--border-0);
  background: var(--bg-1);
  position: sticky;
  top: 52px;
  z-index: 90;
}
.filter-bar-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
}
.filter-btn {
  padding: 0 16px;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-2);
  cursor: pointer;
  border: none;
  border-bottom: 2px solid transparent;
  border-top: 2px solid transparent;
  background: none;
  font-family: var(--font);
  transition: color 0.1s;
}
.filter-btn:hover { color: var(--text-1); }
.filter-btn.active {
  color: var(--text-0);
  border-bottom-color: var(--cyan);
}
.filter-count {
  font-size: 8px;
  color: var(--text-3);
}
.filter-right {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.filter-sort {
  background: var(--bg-2);
  border: 1px solid var(--border-1);
  color: var(--text-1);
  font-family: var(--font);
  font-size: 10px;
  padding: 5px 24px 5px 10px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23606060'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  cursor: pointer;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  outline: none;
}
.filter-sort:focus { border-color: var(--cyan); }

.featured-wrap {
  max-width: 1320px;
  margin: 0 auto;
  padding: 56px 40px 0;
}

.section-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-2);
  margin-bottom: 16px;
}

.posts-section {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 40px 80px;
}
.posts-label {
  padding-top: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-0);
  margin-bottom: 0;
}
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border-0);
  border: 1px solid var(--border-0);
  border-top: none;
}
.posts-empty {
  padding: 48px 24px;
  font-size: 12px;
  color: var(--text-2);
  border: 1px solid var(--border-0);
  border-top: none;
  text-align: center;
}

.load-more-row {
  border: 1px solid var(--border-0);
  border-top: none;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--bg-1);
}
.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  font-family: var(--font);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-1);
  border: 1px solid var(--border-2);
  background: none;
  cursor: pointer;
  transition: all 0.1s;
}
.load-more-btn:hover {
  color: var(--text-0);
  border-color: var(--text-1);
}
.load-more-count {
  font-size: 9px;
  color: var(--text-2);
}

@media (max-width: 960px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 20px 40px;
  }
  .ph-right { text-align: left; }
  .featured-wrap { padding-left: 20px; padding-right: 20px; }
  .posts-section { padding-left: 20px; padding-right: 20px; }
  .filter-bar-inner { padding: 0 20px; }
  .posts-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .posts-grid { grid-template-columns: 1fr; }
  .filter-btn { padding: 0 10px; font-size: 9px; }
}
</style>
