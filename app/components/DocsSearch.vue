<script setup lang="ts">
const open = ref(false)
const query = ref('')
const modalInputRef = ref<HTMLInputElement>()

const { data: sections } = await useAsyncData('docs-search-sections', () =>
  queryCollectionSearchSections('docs')
)

interface SearchSection {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
}

const results = computed<SearchSection[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q || !sections.value) return []
  return (sections.value as SearchSection[])
    .filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.titles.some(t => t.toLowerCase().includes(q)) ||
      s.content.toLowerCase().includes(q)
    )
    .slice(0, 8)
})

function openModal() {
  open.value = true
  nextTick(() => modalInputRef.value?.focus())
}

function close() {
  open.value = false
  query.value = ''
}

function handleGlobal(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    openModal()
  }
}

onMounted(() => document.addEventListener('keydown', handleGlobal))
onUnmounted(() => document.removeEventListener('keydown', handleGlobal))

function breadcrumb(section: SearchSection) {
  return section.titles.filter(Boolean).join(' / ')
}

function excerpt(content: string) {
  return content.length > 120 ? content.slice(0, 120).trimEnd() + '…' : content
}
</script>

<template>
  <button class="nav-search" @click="openModal" type="button">
    <span class="nav-search-icon">⌕</span>
    <span class="nav-search-placeholder">Search docs...</span>
    <kbd class="nav-search-kbd">⌘K</kbd>
  </button>

  <Teleport to="body">
    <Transition name="search">
      <div v-if="open" class="search-overlay" @click.self="close">
        <div class="search-modal" role="dialog" aria-label="Search documentation">
          <div class="search-modal-input">
            <span class="search-modal-icon">⌕</span>
            <input
              ref="modalInputRef"
              v-model="query"
              type="text"
              placeholder="Search documentation..."
              @keydown.escape="close"
            />
            <kbd class="search-esc" @click="close">Esc</kbd>
          </div>

          <div v-if="results.length" class="search-results">
            <NuxtLink
              v-for="result in results"
              :key="result.id"
              class="search-result"
              :to="result.id"
              @click="close"
            >
              <div v-if="breadcrumb(result)" class="search-result-breadcrumb">{{ breadcrumb(result) }}</div>
              <div class="search-result-title">{{ result.title }}</div>
              <div v-if="result.content" class="search-result-excerpt">{{ excerpt(result.content) }}</div>
            </NuxtLink>
          </div>

          <div v-else-if="query.trim()" class="search-empty">
            No results for <strong>"{{ query }}"</strong>
          </div>

          <div v-else class="search-hint">
            Type to search across all documentation pages.
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.nav-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-2);
  border: 1px solid var(--border-1);
  padding: 5px 10px;
  width: 200px;
  cursor: pointer;
  font-family: var(--font);
  transition: border-color 0.1s;
}

.nav-search:hover,
.nav-search:focus-within {
  border-color: var(--cyan);
  outline: none;
}

.nav-search-icon {
  font-size: 12px;
  color: var(--text-2);
  flex-shrink: 0;
}

.nav-search-placeholder {
  font-size: 11px;
  color: var(--text-3);
  flex: 1;
  text-align: left;
}

.nav-search-kbd {
  font-size: 9px;
  color: var(--text-3);
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  padding: 1px 5px;
  font-family: var(--font);
  flex-shrink: 0;
}

/* Modal overlay */
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 500;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
}

.search-modal {
  background: var(--bg-1);
  border: 1px solid var(--border-1);
  width: 100%;
  max-width: 580px;
  overflow: hidden;
}

.search-modal-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-0);
}

.search-modal-icon {
  font-size: 14px;
  color: var(--text-2);
  flex-shrink: 0;
}

.search-modal-input input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: var(--font);
  font-size: 13px;
  color: var(--text-0);
}

.search-modal-input input::placeholder {
  color: var(--text-3);
}

.search-esc {
  font-size: 9px;
  color: var(--text-2);
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  padding: 2px 6px;
  font-family: var(--font);
  cursor: pointer;
  flex-shrink: 0;
}

.search-results {
  max-height: 400px;
  overflow-y: auto;
}

.search-result {
  display: block;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-0);
  text-decoration: none;
  transition: background 0.1s;
}

.search-result:last-child {
  border-bottom: none;
}

.search-result:hover {
  background: var(--bg-2);
  text-decoration: none;
}

.search-result-breadcrumb {
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--text-2);
  text-transform: uppercase;
  margin-bottom: 3px;
}

.search-result-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-0);
  margin-bottom: 4px;
}

.search-result-excerpt {
  font-size: 11px;
  color: var(--text-1);
  line-height: 1.5;
}

.search-empty,
.search-hint {
  padding: 24px 16px;
  font-size: 12px;
  color: var(--text-2);
  text-align: center;
}

.search-empty strong {
  color: var(--text-1);
}

/* Transition */
.search-enter-active,
.search-leave-active {
  transition: opacity 0.15s;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}
</style>
