<script setup lang="ts">
const props = defineProps<{ toc: any }>()

const route = useRoute()
const activeId = ref('')
let observer: IntersectionObserver | null = null

interface TocLink {
  id: string
  text: string
  depth: number
}

const flatLinks = computed<TocLink[]>(() => {
  const links = props.toc?.links ?? []
  const result: TocLink[] = []
  for (const link of links) {
    result.push({ id: link.id, text: link.text, depth: 2 })
    for (const child of link.children ?? []) {
      result.push({ id: child.id, text: child.text, depth: 3 })
    }
  }
  return result
})

function setupObserver() {
  if (observer) observer.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting)
      if (visible.length) activeId.value = visible[0].target.id
    },
    { rootMargin: '-60px 0px -65% 0px', threshold: 0 }
  )
  nextTick(() => {
    document.querySelectorAll('.docs-main h2[id], .docs-main h3[id]').forEach(el => {
      observer!.observe(el)
    })
  })
}

onMounted(setupObserver)
watch(() => route.path, () => {
  activeId.value = ''
  nextTick(setupObserver)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <aside v-if="flatLinks.length" class="toc-col">
    <div class="toc-label">On this page</div>
    <nav class="toc-links">
      <a
        v-for="link in flatLinks"
        :key="link.id"
        class="toc-link"
        :class="{ active: activeId === link.id, 'toc-link--h3': link.depth === 3 }"
        :href="`#${link.id}`"
      >{{ link.text }}</a>
    </nav>
  </aside>
  <aside v-else class="toc-col toc-col--empty" />
</template>

<style scoped>
.toc-col {
  position: sticky;
  top: 52px;
  height: calc(100vh - 52px);
  overflow-y: auto;
  border-left: 1px solid var(--border-0);
  padding: 32px 20px 40px;
}

.toc-col::-webkit-scrollbar { width: 4px; }
.toc-col::-webkit-scrollbar-track { background: var(--bg-0); }
.toc-col::-webkit-scrollbar-thumb { background: var(--bg-3); }

.toc-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-2);
  margin-bottom: 12px;
}

.toc-links {
  display: flex;
  flex-direction: column;
}

.toc-link {
  font-size: 11px;
  color: var(--text-2);
  padding: 4px 0 4px 12px;
  border-left: 2px solid transparent;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.1s;
}

.toc-link:hover {
  color: var(--text-1);
  text-decoration: none;
}

.toc-link.active {
  color: var(--cyan);
  border-left-color: var(--cyan);
}

.toc-link--h3 {
  padding-left: 22px;
  font-size: 10px;
}
</style>
