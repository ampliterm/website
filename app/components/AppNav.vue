<script setup lang="ts">
defineProps({
  activePage: { type: String, default: '' },
  variant: { type: String as () => 'default' | 'docs', default: 'default' },
  ctaLabel: { type: String, default: 'Join the waitlist' },
})

const emit = defineEmits<{ (e: 'prompt-waitlist'): void }>()

const links = [
  { label: 'Roadmap',   href: '/roadmap',    page: 'roadmap' },
  { label: 'Changelog', href: '/changelog',  page: 'changelog' },
  { label: 'Docs',      href: '/docs',       page: 'docs' },
  { label: 'Blog',  href: '/blog',       page: 'blog' },
]

const menuOpen = ref(false)
const route = useRoute()
watch(() => route.path, () => { menuOpen.value = false })
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
        <button class="nav-cta" @click="emit('prompt-waitlist')">{{ ctaLabel }}</button>
      </slot>
      <button
        class="nav-burger"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="nav-burger-bar" :class="{ open: menuOpen }" />
        <span class="nav-burger-bar" :class="{ open: menuOpen }" />
        <span class="nav-burger-bar" :class="{ open: menuOpen }" />
      </button>
    </div>
  </nav>

  <Transition name="nav-menu">
    <div v-if="menuOpen" class="nav-menu" :class="{ 'nav-menu--docs': variant === 'docs' }">
      <NuxtLink
        v-for="link in links"
        :key="link.page"
        class="nav-menu-link"
        :class="{ active: activePage === link.page }"
        :to="link.href"
      >{{ link.label }}</NuxtLink>
    </div>
  </Transition>
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

/* ── Mobile menu ── */
.nav-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 34px;
  height: 34px;
  padding: 0 8px;
  background: none;
  border: 1px solid var(--border-2);
  cursor: pointer;
  flex-shrink: 0;
}

.nav-burger-bar {
  display: block;
  height: 2px;
  width: 100%;
  background: var(--text-1);
  transition: transform 0.15s, opacity 0.15s;
}

.nav-burger-bar.open:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.nav-burger-bar.open:nth-child(2) { opacity: 0; }
.nav-burger-bar.open:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

.nav-menu {
  display: none;
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  z-index: 99;
  flex-direction: column;
  background: rgba(10, 10, 10, 0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-1);
}

.nav-menu-link {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.07em;
  color: var(--text-1);
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-0);
  border-left: 2px solid transparent;
}

.nav-menu-link:last-child {
  border-bottom: none;
}

.nav-menu-link:hover {
  color: var(--text-0);
  text-decoration: none;
}

.nav-menu-link.active {
  color: var(--green);
  border-left-color: var(--green);
}

.nav-menu--docs .nav-menu-link.active {
  color: var(--cyan);
  border-left-color: var(--cyan);
}

.nav-menu-enter-active,
.nav-menu-leave-active {
  transition: opacity 0.12s;
}

.nav-menu-enter-from,
.nav-menu-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .nav {
    padding: 0 16px;
  }

  .nav-logo {
    margin-right: 16px;
  }

  .nav-links {
    display: none;
  }

  .nav-burger {
    display: flex;
  }

  .nav-menu {
    display: flex;
  }

  .nav-right {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .nav-cta {
    padding: 7px 10px;
    font-size: 10px;
    letter-spacing: 0.04em;
  }

  .nav-logo-wordmark .sub {
    display: none;
  }
}
</style>
