<script setup lang="ts">
defineProps({
  activePage: { type: String, default: '' },
  ctaLabel: { type: String, default: 'Get Ampliterm — $999' },
  ctaHref: { type: String, default: '/#pricing' },
  variant: { type: String as () => 'default' | 'docs', default: 'default' },
})

const links = [
  { label: 'Roadmap',   href: '/roadmap',    page: 'roadmap' },
  { label: 'Changelog', href: '/changelog',  page: 'changelog' },
  { label: 'Docs',      href: '/docs',       page: 'docs' },
  { label: 'Blog',  href: '/blog',       page: 'blog' },
]
</script>

<template>
  <nav class="nav" :class="{ 'nav--docs': variant === 'docs' }">
    <NuxtLink class="nav-logo" to="/">
      <AppLogomark :size="20" />
      <div class="nav-logo-wordmark">
        <div class="name">AMPLITERM</div>
        <div class="sub">RESEARCH TERMINAL</div>
      </div>
    </NuxtLink>

    <div class="nav-links">
      <NuxtLink
        v-for="link in links"
        :key="link.page"
        class="nav-link"
        :class="{ active: activePage === link.page }"
        :to="link.href"
      >{{ link.label }}</NuxtLink>
    </div>

    <div class="nav-right">
      <slot name="right">
        <a class="nav-cta" :href="ctaHref">{{ ctaLabel }}</a>
      </slot>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid var(--border-0);
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(12px);
  z-index: 100;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-right: 40px;
  flex-shrink: 0;
}

.nav-logo:hover {
  text-decoration: none;
}

.nav-logo-wordmark .name {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--text-0);
}

.nav-logo-wordmark .sub {
  font-size: 8px;
  letter-spacing: 0.2em;
  color: var(--text-2);
}

.nav-links {
  display: flex;
}

.nav-link {
  padding: 0 16px;
  height: 52px;
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  color: var(--text-2);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.1s;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: var(--text-1);
  text-decoration: none;
}

.nav-link.active {
  color: var(--green);
  border-bottom-color: var(--green);
}

.nav--docs .nav-link.active {
  color: var(--cyan);
  border-bottom-color: var(--cyan);
}

.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.nav-cta {
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
}

.nav-cta:hover {
  background: #33ff88;
  text-decoration: none;
}

@media (max-width: 900px) {
  .nav {
    padding: 0 20px;
  }

  .nav-links {
    display: none;
  }
}
</style>
