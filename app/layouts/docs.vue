<script setup lang="ts">
const docsToc = useState('docs-page-toc')

const sidebarOpen = ref(false)
const route = useRoute()
watch(() => route.path, () => { sidebarOpen.value = false })
</script>

<template>
  <AppNav activePage="docs" variant="docs">
    <template #right>
      <DocsSearch />
      <a class="docs-nav-cta" href="/#pricing">Get Ampliterm — $999</a>
    </template>
  </AppNav>

  <div class="docs-mobilebar">
    <button
      class="docs-mobilebar-toggle"
      type="button"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <span class="docs-mobilebar-icon">{{ sidebarOpen ? '✕' : '☰' }}</span>
      Docs menu
    </button>
  </div>

  <div class="docs-shell">
    <DocsSidebar :class="{ 'sidebar--open': sidebarOpen }" />
    <div
      v-if="sidebarOpen"
      class="docs-sidebar-overlay"
      @click="sidebarOpen = false"
    />
    <main class="docs-main">
      <slot />
    </main>
    <DocsToc :toc="docsToc" />
  </div>
</template>

<style>
.docs-shell {
  display: grid;
  grid-template-columns: 260px 1fr 220px;
  min-height: calc(100vh - 52px);
  margin-top: 52px;
}

.docs-main {
  min-width: 0;
  padding: 48px 56px 80px;
}

.docs-mobilebar {
  display: none;
}

@media (max-width: 1100px) {
  .docs-shell {
    grid-template-columns: 240px 1fr;
  }

  .docs-main {
    padding: 40px 32px 72px;
  }
}

@media (max-width: 900px) {
  .docs-shell {
    grid-template-columns: 1fr;
    min-height: calc(100vh - 92px);
    margin-top: 92px;
  }

  .docs-main {
    padding: 28px 16px 64px;
  }

  .docs-mobilebar {
    display: flex;
    position: fixed;
    top: 52px;
    left: 0;
    right: 0;
    height: 40px;
    align-items: center;
    padding: 0 16px;
    background: rgba(10, 10, 10, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-0);
    z-index: 95;
  }

  .docs-sidebar-overlay {
    position: fixed;
    inset: 92px 0 0 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 94;
  }
}
</style>

<style scoped>
.docs-nav-cta {
  display: inline-flex;
  align-items: center;
  padding: 7px 16px;
  font-family: var(--font);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
  background: var(--green);
  color: #000;
  cursor: pointer;
  transition: background 0.1s;
  flex-shrink: 0;
  white-space: nowrap;
}

.docs-nav-cta:hover {
  background: #33ff88;
  text-decoration: none;
}

.docs-mobilebar-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-1);
  cursor: pointer;
}

.docs-mobilebar-toggle:hover {
  color: var(--text-0);
}

.docs-mobilebar-icon {
  font-size: 12px;
  color: var(--cyan);
}

@media (max-width: 700px) {
  .docs-nav-cta {
    display: none;
  }
}
</style>
