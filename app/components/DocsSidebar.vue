<script setup lang="ts">
const route = useRoute()

const { data: pages } = await useAsyncData('docs-nav', () =>
  queryCollection('docs')
    .select('title', 'path', 'section', 'sectionOrder', 'order', 'badge')
    .all()
)

const SECTION_ORDER: Record<string, number> = {
  'Getting Started': 0,
  'User Guide': 1,
  'API Reference': 2,
  'Resources': 3,
}

interface DocLink {
  title: string
  path: string
  section: string
  sectionOrder: number
  order: number
  badge?: string
}

const sections = computed(() => {
  if (!pages.value) return []

  const grouped = new Map<string, DocLink[]>()
  for (const page of pages.value as DocLink[]) {
    const sec = page.section || 'Getting Started'
    if (!grouped.has(sec)) grouped.set(sec, [])
    grouped.get(sec)!.push(page)
  }

  return [...grouped.entries()]
    .map(([name, links]) => ({
      name,
      links: [...links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    }))
    .sort((a, b) => (SECTION_ORDER[a.name] ?? 99) - (SECTION_ORDER[b.name] ?? 99))
})

const openSections = ref<Record<string, boolean>>(
  Object.fromEntries(Object.keys(SECTION_ORDER).map(k => [k, true]))
)

function toggle(name: string) {
  openSections.value[name] = !openSections.value[name]
}

function isOpen(name: string) {
  return openSections.value[name] ?? true
}
</script>

<template>
  <aside class="sidebar">
    <template v-for="(section, i) in sections" :key="section.name">
      <hr v-if="i > 0" class="sidebar-divider" />
      <div class="sidebar-section">
        <button class="sidebar-section-header" @click="toggle(section.name)">
          <span class="sidebar-section-label">{{ section.name }}</span>
          <span class="sidebar-section-arrow" :class="{ rotated: isOpen(section.name) }">▶</span>
        </button>
        <div v-show="isOpen(section.name)" class="sidebar-links">
          <NuxtLink
            v-for="link in section.links"
            :key="link.path"
            class="sidebar-link"
            :class="{ active: route.path === link.path }"
            :to="link.path"
          >
            {{ link.title }}
            <span
              v-if="link.badge"
              class="sidebar-badge"
              :class="`sidebar-badge--${link.badge}`"
            >{{ link.badge }}</span>
          </NuxtLink>
        </div>
      </div>
    </template>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 52px;
  height: calc(100vh - 52px);
  overflow-y: auto;
  border-right: 1px solid var(--border-0);
  background: var(--bg-1);
  padding: 24px 0 48px;
}

.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-track { background: var(--bg-1); }
.sidebar::-webkit-scrollbar-thumb { background: var(--bg-3); }

.sidebar-divider {
  border: none;
  border-top: 1px solid var(--border-0);
  margin: 12px 0;
}

.sidebar-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 16px 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font);
}

.sidebar-section-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-2);
}

.sidebar-section-arrow {
  font-size: 8px;
  color: var(--text-3);
  transition: transform 0.15s;
  transform: rotate(0deg);
}

.sidebar-section-arrow.rotated {
  transform: rotate(90deg);
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 16px 5px 24px;
  font-size: 11px;
  color: var(--text-2);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: color 0.1s;
}

.sidebar-link:hover {
  color: var(--text-1);
  text-decoration: none;
}

.sidebar-link.active {
  color: var(--text-0);
  border-left-color: var(--cyan);
}

.sidebar-badge {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 1px 4px;
  border: 1px solid;
  margin-left: auto;
  flex-shrink: 0;
}

.sidebar-badge--guide {
  color: var(--cyan);
  border-color: var(--cyan);
  background: var(--cyan-dim);
}

.sidebar-badge--api {
  color: var(--amber);
  border-color: var(--amber);
  background: var(--amber-dim);
}
</style>
