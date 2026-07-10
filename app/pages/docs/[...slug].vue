<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const path = '/docs/' + (route.params.slug as string[]).join('/')

const { data: page } = await useAsyncData(`docs-${path}`, () =>
  queryCollection('docs').path(path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const docsToc = useState('docs-page-toc')
watchEffect(() => {
  docsToc.value = page.value?.body?.toc ?? null
})

useHead({
  title: computed(() => `${page.value?.title ?? 'Docs'} — Ampliterm`),
})

// Docs share the designed static OG card; a page can override it with an
// `ogImage` frontmatter path (rendered at 2x by `npm run og:generate`).
useSeoMeta({
  ogImage: `https://ampliterm.com${page.value?.ogImage ?? '/og/docs-og.png'}`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
})

const eyebrowClass = computed(() => {
  const badge = page.value?.badge
  return badge === 'api' ? 'eyebrow-tag--api' : 'eyebrow-tag--guide'
})
</script>

<template>
  <div v-if="page" class="doc-page">

    <nav class="breadcrumb">
      <NuxtLink to="/docs">Docs</NuxtLink>
      <span class="sep">/</span>
      <template v-if="page.section">
        <span>{{ page.section }}</span>
        <span class="sep">/</span>
      </template>
      <span class="current">{{ page.title }}</span>
    </nav>

    <div class="doc-header">
      <div class="doc-eyebrow">
        <span class="eyebrow-tag" :class="eyebrowClass">{{ page.section }}</span>
        <span class="eyebrow-sep">/</span>
        <span class="eyebrow-path">{{ page.title }}</span>
      </div>
      <h1 class="doc-h1">{{ page.title }}</h1>
      <p v-if="page.description" class="doc-sub">{{ page.description }}</p>
      <div v-if="page.updatedAt" class="doc-meta">
        <span class="doc-meta-item">Updated <span class="doc-meta-value">{{ page.updatedAt }}</span></span>
      </div>
    </div>

    <div class="doc-body">
      <ContentRenderer :value="page" />
    </div>

    <div class="doc-footer">
      <span class="doc-footer-edit">✎ Edit this page on GitHub</span>
      <div class="doc-footer-feedback">
        Was this helpful?
        <button class="feedback-btn">Yes</button>
        <button class="feedback-btn">No</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Breadcrumb ── */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--text-2);
  margin-bottom: 24px;
}

.breadcrumb a {
  color: var(--text-2);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--cyan);
}

.breadcrumb .sep {
  color: var(--text-3);
}

.breadcrumb .current {
  color: var(--text-1);
}

/* ── Doc header ── */
.doc-header {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-0);
}

.doc-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.eyebrow-tag {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 2px 6px;
  border: 1px solid;
}

.eyebrow-tag--guide {
  color: var(--cyan);
  border-color: var(--cyan);
  background: var(--cyan-dim);
}

.eyebrow-tag--api {
  color: var(--amber);
  border-color: var(--amber);
  background: var(--amber-dim);
}

.eyebrow-sep {
  color: var(--text-3);
  font-size: 9px;
}

.eyebrow-path {
  font-size: 9px;
  color: var(--text-2);
  letter-spacing: 0.06em;
}

.doc-h1 {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.15;
  color: var(--text-0);
  margin-bottom: 12px;
}

.doc-sub {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.7;
  max-width: 600px;
}

.doc-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
}

.doc-meta-item {
  font-size: 9px;
  color: var(--text-2);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.doc-meta-value {
  color: var(--text-1);
  text-transform: none;
}

/* ── Content typography ── */
.doc-body :deep(h2) {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-0);
  margin: 40px 0 12px;
  padding-top: 8px;
  letter-spacing: -0.01em;
  border-top: 1px solid var(--border-0);
}

.doc-body :deep(h2:first-child) {
  margin-top: 0;
  border-top: none;
}

.doc-body :deep(h3) {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-0);
  margin: 28px 0 8px;
  letter-spacing: 0.02em;
}

.doc-body :deep(p) {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.8;
  margin-bottom: 16px;
}

.doc-body :deep(p strong),
.doc-body :deep(li strong) {
  color: var(--text-0);
  font-weight: 600;
}

.doc-body :deep(ul),
.doc-body :deep(ol) {
  padding-left: 20px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.doc-body :deep(li) {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.7;
}

.doc-body :deep(a) {
  color: var(--cyan);
}

.doc-body :deep(a:hover) {
  text-decoration: underline;
}

/* Inline code */
.doc-body :deep(code) {
  background: var(--bg-3);
  border: 1px solid var(--border-1);
  padding: 1px 5px;
  font-size: 11px;
  color: var(--amber);
  font-family: var(--font);
}

/* Code blocks (Shiki) */
.doc-body :deep(pre) {
  background: var(--bg-2) !important;
  border: 1px solid var(--border-1);
  margin: 16px 0 24px;
  overflow-x: auto;
  padding: 16px;
  font-size: 12px;
  line-height: 1.7;
}

.doc-body :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: inherit;
}

/* Tables */
.doc-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--border-0);
  margin: 12px 0 24px;
  font-size: 12px;
}

.doc-body :deep(thead th) {
  background: var(--bg-2);
  padding: 6px 12px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--text-2);
  text-transform: uppercase;
  text-align: left;
  border-bottom: 1px solid var(--border-1);
}

.doc-body :deep(tbody tr) {
  border-bottom: 1px solid var(--border-0);
}

.doc-body :deep(tbody tr:last-child) {
  border-bottom: none;
}

.doc-body :deep(tbody tr:hover) {
  background: var(--bg-2);
}

.doc-body :deep(tbody td) {
  padding: 8px 12px;
  color: var(--text-1);
  vertical-align: top;
}

/* Blockquote (used for notes/tips) */
.doc-body :deep(blockquote) {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid var(--cyan);
  background: var(--cyan-dim);
  color: var(--cyan);
  font-size: 12px;
  line-height: 1.6;
  margin: 20px 0;
}

.doc-body :deep(blockquote p) {
  color: var(--cyan);
  margin-bottom: 0;
  font-size: 12px;
}

.doc-body :deep(blockquote strong) {
  color: var(--cyan);
}

/* kbd */
.doc-body :deep(kbd) {
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  padding: 2px 6px;
  font-family: var(--font);
  font-size: 10px;
  color: var(--text-1);
}

/* ── Doc footer ── */
.doc-footer {
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid var(--border-0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.doc-footer-edit {
  font-size: 10px;
  color: var(--text-2);
  cursor: pointer;
  transition: color 0.1s;
}

.doc-footer-edit:hover {
  color: var(--cyan);
}

.doc-footer-feedback {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--text-2);
}

.feedback-btn {
  background: var(--bg-2);
  border: 1px solid var(--border-1);
  font-family: var(--font);
  font-size: 10px;
  padding: 4px 10px;
  color: var(--text-1);
  cursor: pointer;
  transition: border-color 0.1s;
}

.feedback-btn:hover {
  border-color: var(--cyan);
  color: var(--text-0);
}

/* ── Mobile ── */
@media (max-width: 720px) {
  .doc-body :deep(table) {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .doc-body :deep(thead th),
  .doc-body :deep(tbody td) {
    white-space: nowrap;
  }

  .doc-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
  }

  .doc-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
