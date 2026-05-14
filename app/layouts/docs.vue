<script setup lang="ts">
const docsToc = useState('docs-page-toc')
</script>

<template>
  <AppNav activePage="docs" variant="docs">
    <template #right>
      <DocsSearch />
      <a class="docs-nav-cta" href="/#pricing">Get Ampliterm — $999</a>
    </template>
  </AppNav>

  <div class="docs-shell">
    <DocsSidebar />
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
</style>
