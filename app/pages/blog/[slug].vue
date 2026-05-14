<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const path = `/blog/${slug}`

const { data: page } = await useAsyncData(`blog-${path}`, () =>
  queryCollection('blog').path(path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: allPosts } = await useAsyncData('blog-listing', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

const relatedPosts = computed(() =>
  allPosts.value
    ?.filter(p => p.path !== path && p.category === page.value?.category)
    .slice(0, 3) ?? [],
)

const morePosts = computed(() =>
  allPosts.value
    ?.filter(p => p.path !== path)
    .slice(0, 3) ?? [],
)

const tocLinks = computed(() => page.value?.body?.toc?.links ?? [])

const activeId = ref('')

onMounted(() => {
  const headings = document.querySelectorAll<HTMLElement>('.article-prose h2[id], .article-prose h3[id]')
  if (!headings.length) return

  activeId.value = headings[0]?.id ?? ''

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )
  headings.forEach(el => observer.observe(el))
  onUnmounted(() => observer.disconnect())
})

const scrollToHeading = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    activeId.value = id
  }
}

const formatDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

const formatDateShort = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

useHead({
  title: computed(() => `${page.value?.title ?? 'Article'} — Ampliterm`),
  meta: [
    { name: 'description', content: computed(() => page.value?.excerpt ?? '') },
  ],
})
</script>

<template>
  <div v-if="page">
    <BlogReadProgress />
    <AppNav active-page="blog" />

    <div class="breadcrumb-bar">
      <nav class="breadcrumb">
        <NuxtLink to="/">Home</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink to="/blog">Research</NuxtLink>
        <span class="sep">/</span>
        <span class="current">{{ page.title }}</span>
      </nav>
    </div>

    <div class="article-hero">
      <div class="hero-meta">
        <BlogTag
          v-for="tag in page.tags"
          :key="tag.label"
          :label="tag.label"
          :variant="tag.variant"
        />
        <span class="hero-date">{{ formatDate(page.date) }}</span>
        <span class="hero-read">{{ page.readTime }}</span>
      </div>
      <h1 class="article-title">{{ page.title }}</h1>
      <p v-if="page.excerpt" class="article-lede">{{ page.excerpt }}</p>

      <div class="author-row">
        <div class="author-avatar">{{ page.author.initials }}</div>
        <div class="author-info">
          <div class="author-name">{{ page.author.name }}</div>
          <div class="author-meta">{{ page.author.role }} · {{ formatDate(page.date) }}</div>
        </div>
        <div class="share-row">
          <span class="share-label">Share</span>
          <button class="share-btn">X / Twitter</button>
          <button class="share-btn" @click="navigator.clipboard?.writeText(window.location.href)">Copy link</button>
        </div>
      </div>
    </div>

    <div class="hero-image">
      <div class="hero-image-frame">
        <div class="hi-strip" />
        <svg width="560" height="240" viewBox="0 0 560 240" fill="none" class="hi-chart">
          <line x1="0" y1="48" x2="560" y2="48" stroke="#222" stroke-width=".7" />
          <line x1="0" y1="96" x2="560" y2="96" stroke="#222" stroke-width=".7" />
          <line x1="0" y1="144" x2="560" y2="144" stroke="#222" stroke-width=".7" />
          <line x1="0" y1="192" x2="560" y2="192" stroke="#222" stroke-width=".7" />
          <line x1="112" y1="0" x2="112" y2="240" stroke="#222" stroke-width=".7" />
          <line x1="224" y1="0" x2="224" y2="240" stroke="#222" stroke-width=".7" />
          <line x1="336" y1="0" x2="336" y2="240" stroke="#222" stroke-width=".7" />
          <line x1="448" y1="0" x2="448" y2="240" stroke="#222" stroke-width=".7" />
          <path
            d="M0,200 C40,195 80,185 120,170 C160,155 200,138 240,118 C280,98 320,75 360,56 C400,38 440,24 480,16 C510,10 535,8 560,7"
            fill="none"
            stroke="#00e676"
            stroke-width="2"
            opacity=".8"
          />
          <path
            d="M0,200 C40,195 80,185 120,170 C160,155 200,138 240,118 C280,98 320,75 360,56 C400,38 440,24 480,16 C510,10 535,8 560,7 L560,240 L0,240 Z"
            fill="#00e676"
            opacity=".05"
          />
          <path
            d="M0,210 C80,200 160,180 240,155 C320,130 400,95 480,68 C510,58 535,50 560,44"
            fill="none"
            stroke="#00b8d4"
            stroke-width="1"
            stroke-dasharray="5,4"
            opacity=".45"
          />
          <line x1="224" y1="0" x2="224" y2="240" stroke="#f5a623" stroke-width="1.2" stroke-dasharray="3,4" opacity=".7" />
          <text x="228" y="16" font-family="JetBrains Mono,monospace" font-size="9" fill="#f5a623">ENTRY</text>
          <line x1="336" y1="0" x2="336" y2="240" stroke="#00e676" stroke-width="1" stroke-dasharray="3,4" opacity=".5" />
          <text x="340" y="16" font-family="JetBrains Mono,monospace" font-size="9" fill="#00e676" opacity=".8">TARGET</text>
          <line x1="0" y1="185" x2="560" y2="185" stroke="#ff4444" stroke-width="1" stroke-dasharray="3,4" opacity=".4" />
          <text x="4" y="178" font-family="JetBrains Mono,monospace" font-size="9" fill="#ff4444" opacity=".7">STOP</text>
          <text x="4" y="52" font-family="JetBrains Mono,monospace" font-size="8" fill="#606060">$960</text>
          <text x="4" y="100" font-family="JetBrains Mono,monospace" font-size="8" fill="#606060">$900</text>
          <text x="4" y="148" font-family="JetBrains Mono,monospace" font-size="8" fill="#606060">$842</text>
        </svg>
        <div class="hi-label">{{ page.imagePlaceholder ?? 'Article hero image' }}</div>
      </div>
    </div>

    <div class="article-layout">
      <article class="article-body">
        <div class="article-prose">
          <ContentRenderer :value="page" />
        </div>
      </article>

      <aside class="article-sidebar">
        <div v-if="tocLinks.length" class="sidebar-section">
          <div class="ss-head"><div class="ss-title">// In this article</div></div>
          <div class="ss-body toc-body">
            <div class="toc-list">
              <button
                v-for="link in tocLinks"
                :key="link.id"
                class="toc-item"
                :class="{ active: activeId === link.id }"
                @click="scrollToHeading(link.id)"
              >
                <span class="toc-num">{{ String(tocLinks.indexOf(link) + 1).padStart(2, '0') }}</span>
                {{ link.text }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="relatedPosts.length" class="sidebar-section">
          <div class="ss-head"><div class="ss-title">// Related articles</div></div>
          <div class="ss-body related-body">
            <div
              v-for="post in relatedPosts"
              :key="post.path"
              class="related-post"
            >
              <div class="related-post-tags">
                <BlogTag
                  v-for="tag in post.tags.slice(0, 1)"
                  :key="tag.label"
                  :label="tag.label"
                  :variant="tag.variant"
                />
              </div>
              <NuxtLink :to="post.path" class="related-post-title">{{ post.title }}</NuxtLink>
              <div class="related-post-meta">{{ post.author.name }} · {{ formatDateShort(post.date) }} · {{ post.readTime }}</div>
            </div>
          </div>
        </div>

        <div class="sidebar-cta">
          <div class="sc-eyebrow">// Try it yourself</div>
          <div class="sc-title">Research. Simulate. Review.</div>
          <div class="sc-body">The workflow described in this article is built into Ampliterm. One-time purchase, self-hosted, your data stays yours.</div>
          <a class="sc-btn" href="/#pricing">Get Ampliterm — $999</a>
        </div>
      </aside>
    </div>

    <div class="article-footer">
      <hr class="af-divider" />

      <BlogAuthorCard :author="page.author" />

      <div v-if="morePosts.length" class="more-section">
        <div class="more-label">// more from the research blog</div>
        <div class="more-grid">
          <div
            v-for="post in morePosts"
            :key="post.path"
            class="more-card"
          >
            <div class="more-card-tags">
              <BlogTag
                v-for="tag in post.tags.slice(0, 2)"
                :key="tag.label"
                :label="tag.label"
                :variant="tag.variant"
              />
            </div>
            <div class="more-card-title">
              <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
            </div>
            <p class="more-card-excerpt">{{ post.excerpt }}</p>
            <div class="more-card-meta">{{ post.author.name }} · {{ formatDateShort(post.date) }} · {{ post.readTime }}</div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
/* ── Breadcrumb ── */
.breadcrumb-bar {
  padding: 80px 40px 0;
  max-width: 1320px;
  margin: 0 auto;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--text-2);
}
.breadcrumb :deep(a) {
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.1s;
}
.breadcrumb :deep(a):hover { color: var(--cyan); }
.sep { color: var(--text-3); }
.current { color: var(--text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; }

/* ── Article hero ── */
.article-hero {
  max-width: 1320px;
  margin: 0 auto;
  padding: 32px 40px 0;
}
.hero-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.hero-date {
  font-size: 10px;
  color: var(--text-2);
  letter-spacing: 0.06em;
}
.hero-read {
  font-size: 10px;
  color: var(--text-2);
}
.hero-read::before { content: '·'; margin-right: 6px; color: var(--text-3); }

.article-title {
  font-size: clamp(24px, 3.5vw, 46px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-0);
  margin-bottom: 20px;
  max-width: 860px;
}
.article-lede {
  font-size: 15px;
  color: var(--text-1);
  line-height: 1.75;
  max-width: 720px;
  margin-bottom: 32px;
  font-weight: 400;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid var(--border-0);
  border-bottom: 1px solid var(--border-0);
}
.author-avatar {
  width: 36px;
  height: 36px;
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}
.author-name { font-size: 12px; font-weight: 600; color: var(--text-0); }
.author-meta { font-size: 10px; color: var(--text-2); }
.share-row {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}
.share-label {
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-2);
}
.share-btn {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-family: var(--font);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--text-1);
  border: 1px solid var(--border-1);
  background: none;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
}
.share-btn:hover { color: var(--text-0); border-color: var(--text-1); }

/* ── Hero image ── */
.hero-image {
  max-width: 1320px;
  margin: 40px auto 0;
  padding: 0 40px;
}
.hero-image-frame {
  background: var(--bg-2);
  border: 1px solid var(--border-0);
  position: relative;
  overflow: hidden;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
.hi-strip {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    135deg,
    var(--bg-2) 0px,
    var(--bg-2) 10px,
    var(--bg-3) 10px,
    var(--bg-3) 20px
  );
  opacity: 0.35;
}
.hi-chart { position: relative; z-index: 1; }
.hi-label {
  position: relative;
  z-index: 1;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-2);
  border: 1px dashed var(--border-2);
  padding: 8px 16px;
}

/* ── Article layout ── */
.article-layout {
  max-width: 1320px;
  margin: 0 auto;
  padding: 56px 40px 80px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 60px;
  align-items: start;
}

/* ── Prose ── */
.article-prose :deep(h2) {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-0);
  margin: 48px 0 16px;
  letter-spacing: -0.01em;
  line-height: 1.2;
  padding-top: 40px;
  border-top: 1px solid var(--border-0);
}
.article-prose :deep(h2:first-child) {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}
.article-prose :deep(h3) {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-0);
  margin: 32px 0 12px;
  letter-spacing: 0.02em;
}
.article-prose :deep(p) {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.85;
  margin-bottom: 18px;
  max-width: 700px;
}
.article-prose :deep(strong) {
  color: var(--text-0);
  font-weight: 600;
}
.article-prose :deep(em) {
  color: var(--cyan);
  font-style: normal;
}
.article-prose :deep(a) {
  color: var(--cyan);
  text-decoration: none;
  border-bottom: 1px solid var(--cyan-dim);
  transition: border-color 0.1s;
}
.article-prose :deep(a):hover { border-bottom-color: var(--cyan); }
.article-prose :deep(blockquote) {
  border-left: 2px solid var(--green);
  margin: 32px 0;
  padding: 16px 24px;
  background: var(--bg-1);
}
.article-prose :deep(blockquote p) {
  font-size: 15px;
  color: var(--text-0);
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  max-width: none;
}
.article-prose :deep(code) {
  background: var(--bg-3);
  border: 1px solid var(--border-1);
  padding: 1px 5px;
  font-size: 11px;
  color: var(--green);
}
.article-prose :deep(ul),
.article-prose :deep(ol) {
  padding-left: 24px;
  margin-bottom: 18px;
  max-width: 700px;
}
.article-prose :deep(li) {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.85;
  margin-bottom: 6px;
}
.article-prose :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-0);
  margin: 40px 0;
}

/* ── Sidebar ── */
.article-sidebar {
  position: sticky;
  top: 72px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sidebar-section {
  background: var(--bg-1);
  border: 1px solid var(--border-0);
}
.ss-head {
  padding: 10px 14px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border-0);
}
.ss-title {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-2);
}
.toc-body { padding: 8px 14px; }
.toc-list { display: flex; flex-direction: column; }
.toc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  font-size: 11px;
  color: var(--text-2);
  text-decoration: none;
  border: none;
  border-bottom: 1px solid var(--border-0);
  background: none;
  font-family: var(--font);
  text-align: left;
  cursor: pointer;
  transition: color 0.1s;
  letter-spacing: 0.02em;
  width: 100%;
}
.toc-item:last-child { border-bottom: none; }
.toc-item:hover { color: var(--cyan); }
.toc-item.active { color: var(--text-0); }
.toc-num {
  color: var(--text-3);
  font-size: 9px;
  flex-shrink: 0;
}

.related-body { padding: 4px 14px; }
.related-post {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-0);
}
.related-post:last-child { border-bottom: none; }
.related-post-tags { display: flex; gap: 4px; }
.related-post-title {
  font-size: 11px;
  color: var(--text-1);
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.1s;
  display: block;
}
.related-post-title:hover { color: var(--green); }
.related-post-meta { font-size: 9px; color: var(--text-2); }

.sidebar-cta {
  border: 1px solid var(--border-1);
  background: var(--bg-1);
  padding: 20px;
}
.sc-eyebrow {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 10px;
}
.sc-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-0);
  margin-bottom: 8px;
  line-height: 1.3;
}
.sc-body {
  font-size: 11px;
  color: var(--text-1);
  line-height: 1.6;
  margin-bottom: 16px;
}
.sc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-family: var(--font);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--green);
  color: #000;
  text-decoration: none;
  transition: background 0.1s;
}
.sc-btn:hover { background: #33ff88; }

/* ── Article footer ── */
.article-footer {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 40px 80px;
}
.af-divider {
  border: none;
  border-top: 1px solid var(--border-0);
  margin-bottom: 48px;
}
.more-section { margin-top: 48px; }
.more-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-2);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-0);
}
.more-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border-0);
  border: 1px solid var(--border-0);
}
.more-card {
  background: var(--bg-0);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background 0.15s;
}
.more-card:hover { background: var(--bg-1); }
.more-card-tags { display: flex; gap: 5px; }
.more-card-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-0);
  line-height: 1.3;
  letter-spacing: -0.01em;
}
.more-card-title :deep(a) {
  text-decoration: none;
  color: inherit;
  transition: color 0.1s;
}
.more-card-title :deep(a):hover { color: var(--green); }
.more-card-excerpt {
  font-size: 11px;
  color: var(--text-1);
  line-height: 1.6;
  flex: 1;
}
.more-card-meta {
  font-size: 9px;
  color: var(--text-2);
  padding-top: 10px;
  border-top: 1px solid var(--border-0);
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .article-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .article-sidebar { position: static; }
  .more-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 720px) {
  .breadcrumb-bar,
  .article-hero,
  .hero-image,
  .article-layout,
  .article-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
  .share-row { display: none; }
  .more-grid { grid-template-columns: 1fr; }
  .hero-image-frame { height: 240px; }
  .hi-chart { width: 100%; max-width: 360px; }
}
</style>
