<script setup lang="ts">
defineProps({
  copyright: { type: String, default: `© ${new Date().getFullYear()} Ampliterm. All rights reserved.` },
})

const links = [
  { label: 'Roadmap',   href: '/roadmap' },
  { label: 'Changelog', href: '/changelog' },
  // { label: 'Docs',      href: '/docs' },
  { label: 'Blog',  href: '/blog' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer-logo">
      <AppLogomark :size="16" />
      <div class="footer-wordmark">
        <div class="name">AMPLITERM</div>
        <div class="sub">RESEARCH TERMINAL</div>
      </div>
    </div>

    <div class="footer-links">
      <NuxtLink
        v-for="link in links"
        :key="link.href"
        class="footer-link"
        :to="link.href"
      >{{ link.label }}</NuxtLink>
    </div>

    <div class="footer-copy">{{ copyright }}</div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px;
  border-top: 1px solid var(--border-0);
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-wordmark .name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-0);
}

.footer-wordmark .sub {
  font-size: 8px;
  letter-spacing: 0.18em;
  color: var(--text-2);
}

.footer-links {
  display: flex;
  gap: 16px;
}

.footer-link {
  font-size: 10px;
  color: var(--text-2);
  text-decoration: none;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: color 0.1s;
}

.footer-link:hover {
  color: var(--text-1);
  text-decoration: none;
}

.footer-copy {
  font-size: 10px;
  color: var(--text-2);
  margin-left: auto;
}

@media (max-width: 900px) {
  .footer {
    flex-wrap: wrap;
    padding: 24px;
    gap: 16px;
  }

  .footer-copy {
    margin-left: 0;
    width: 100%;
  }
}
</style>
