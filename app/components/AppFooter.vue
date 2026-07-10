<script setup lang="ts">
defineProps({
  copyright: { type: String, default: `© ${new Date().getFullYear()} Ampliterm. All rights reserved.` },
})

const links = [
  { label: 'Roadmap',   href: '/roadmap' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Docs',      href: '/docs' },
  { label: 'Blog',  href: '/blog' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer-row">
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
    </div>

    <div class="footer-disclaimer">
      Ampliterm is self-directed software, not investment advice. Trades execute on your own brokerage account, on your instructions.
      Trading involves substantial risk of loss.
      <NuxtLink class="footer-disclaimer-link" to="/docs/getting-started/overview#important-disclaimer-please-read">Read the full disclaimer</NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px;
  border-top: 1px solid var(--border-0);
}

.footer-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-disclaimer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border-0);
  font-size: 9px;
  line-height: 1.7;
  letter-spacing: 0.04em;
  color: var(--text-3);
}

.footer-disclaimer-link {
  color: var(--text-2);
  text-decoration: none;
}

.footer-disclaimer-link:hover {
  color: var(--cyan);
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
    padding: 24px 20px;
  }

  .footer-row {
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-copy {
    margin-left: 0;
    width: 100%;
  }
}
</style>
