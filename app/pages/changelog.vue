<script setup lang="ts">
const { data: releases } = await useAsyncData('changelog', () =>
  queryCollection('changelog').order('date', 'DESC').all()
)

const waitlistOpen = ref(false)

const activeId = ref<string>('')

const versionId = (version: string) => `v${version.replace(/\./g, '-')}`

const typeShort: Record<string, string> = {
  major: 'MAJ',
  minor: 'MIN',
  patch: 'PCH',
  beta:   'β',
  alpha: 'α',
}

const formatDateShort = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const latestRelease = computed(() => releases.value?.[0])
const latestDateFormatted = computed(() => {
  if (!latestRelease.value) return ''
  return new Date(latestRelease.value.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )

  releases.value?.forEach((r) => {
    const el = document.getElementById(versionId(r.version))
    if (el) observer.observe(el)
  })

  if (releases.value?.length) {
    activeId.value = versionId(releases.value[0].version)
  }

  onUnmounted(() => observer.disconnect())
})

const scrollTo = (version: string) => {
  const el = document.getElementById(versionId(version))
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeId.value = versionId(version)
  }
}

useHead({
  title: 'Changelog',
  meta: [
    { name: 'description', content: 'Every shipped feature, fix, and breaking change in Ampliterm — in chronological order, with full transparency.' },
  ],
})

defineOgImage('Ampliterm', {
  eyebrow: 'CHANGELOG',
  title: 'Changelog',
  description: 'Every shipped feature, fix, and breaking change — in chronological order, with full transparency.',
})
</script>

<template>
  <div>
    <AppNav active-page="changelog" @prompt-waitlist="waitlistOpen = true" />

    <!-- ── PAGE HEADER ── -->
    <section class="page-header">
      <div class="ph-eyebrow">Release log</div>
      <h1 class="ph-title">Changelog<em>.</em></h1>
      <p class="ph-sub">
        Every shipped feature, fix, and breaking change in Ampliterm — in chronological order,
        with full transparency. We ship on a <strong>continuous, versioned cadence</strong>:
        minor releases roughly monthly, patches as needed, breaking changes flagged loudly.
      </p>

      <div v-if="latestRelease" class="ph-meta">
        <div class="phm-cell">
          <div class="phm-label">Current</div>
          <div class="phm-val">
            <span class="live-dot" />
            v{{ latestRelease.version }}
            <template v-if="latestRelease.title">— {{ latestRelease.title }}</template>
          </div>
        </div>
        <div class="phm-cell">
          <div class="phm-label">Released</div>
          <div class="phm-val">{{ latestDateFormatted }}</div>
        </div>
        <div class="phm-cell">
          <div class="phm-label">Releases shipped</div>
          <div class="phm-val cy">{{ releases?.length ?? 0 }}</div>
        </div>
        <div class="phm-cell">
          <div class="phm-label">Next milestone</div>
          <div class="phm-val">v1.0 · GA</div>
        </div>
      </div>
    </section>

    <!-- ── MAIN ── -->
    <div class="changelog-wrap">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-head">
          <span class="sidebar-title">Versions</span>
          <span class="sidebar-count">{{ releases?.length ?? 0 }} releases</span>
        </div>
        <nav class="sidebar-list">
          <button
            v-for="r in releases"
            :key="r.version"
            class="sl-item"
            :class="{ active: activeId === versionId(r.version) }"
            @click="scrollTo(r.version)"
          >
            <span class="sl-ver">v{{ r.version }}</span>
            <span class="sl-date">{{ formatDateShort(r.date) }}</span>
            <span class="sl-tag" :class="r.type">{{ typeShort[r.type] }}</span>
          </button>
        </nav>
      </aside>

      <!-- FEED -->
      <main class="feed">
        <ChangelogRelease
          v-for="release in releases"
          :key="release.version"
          :release="release"
        />

        <!-- End of log marker -->
        <div class="end-of-log">
          <span class="eol-comment">// END OF LOG</span><br>
          Project initialized Dec 21, 2025. Internal commits prior to v0.3.0 not included in public changelog.
        </div>
      </main>

    </div>

    <AppFooter />

    <WaitlistModal :open="waitlistOpen" @close="waitlistOpen = false" />
  </div>
</template>

<style scoped>
/* ── PAGE HEADER ── */
.page-header {
  border-bottom: 1px solid var(--border-0);
  padding: 96px 40px 40px;
  max-width: 1320px;
  margin: 0 auto;
}

.ph-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 18px;
}

.ph-eyebrow::before {
  content: '';
  width: 18px;
  height: 1px;
  background: var(--green);
}

.ph-title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 18px;
}

.ph-title em {
  font-style: normal;
  color: var(--green);
}

.ph-sub {
  font-size: 14px;
  color: var(--text-1);
  max-width: 620px;
  line-height: 1.7;
  margin-bottom: 32px;
}

.ph-sub strong {
  color: var(--text-0);
  font-weight: 500;
}

/* meta strip */
.ph-meta {
  display: flex;
  align-items: stretch;
  gap: 0;
  border: 1px solid var(--border-0);
  background: var(--bg-1);
  max-width: 920px;
}

.phm-cell {
  padding: 14px 20px;
  border-right: 1px solid var(--border-0);
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.phm-cell:last-child {
  border-right: none;
}

.phm-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-2);
}

.phm-val {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-0);
  display: flex;
  align-items: center;
  gap: 8px;
}

.phm-val.cy {
  color: var(--cyan);
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 6px var(--green);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* ── MAIN LAYOUT ── */
.changelog-wrap {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
  max-width: 1320px;
  margin: 0 auto;
  padding: 40px;
}

/* ── SIDEBAR ── */
.sidebar {
  position: sticky;
  top: 72px;
  align-self: start;
  max-height: calc(100vh - 92px);
  overflow-y: auto;
  border: 1px solid var(--border-0);
  background: var(--bg-1);
}

.sidebar-head {
  padding: 10px 14px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border-0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-title {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-2);
}

.sidebar-count {
  font-size: 9px;
  color: var(--cyan);
  letter-spacing: 0.05em;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
}

.sl-item {
  display: grid;
  grid-template-columns: 62px 1fr auto;
  gap: 10px;
  padding: 8px 14px;
  align-items: center;
  font-size: 11px;
  border-bottom: 1px solid var(--border-0);
  border-left: 2px solid transparent;
  cursor: pointer;
  transition: all 0.1s;
  background: transparent;
  text-align: left;
  font-family: var(--font);
  color: var(--text-1);
  width: 100%;
}

.sl-item:hover {
  background: var(--bg-2);
  color: var(--text-0);
}

.sl-item.active {
  border-left-color: var(--green);
  background: var(--bg-2);
  color: var(--text-0);
}

.sl-ver {
  font-weight: 600;
  color: var(--text-0);
  font-size: 11px;
}

.sl-item.active .sl-ver {
  color: var(--green);
}

.sl-date {
  font-size: 9px;
  color: var(--text-2);
  letter-spacing: 0.04em;
}

.sl-tag {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 1px 4px;
  border: 1px solid;
  font-family: var(--font);
}

.sl-tag.major { color: var(--green);   border-color: var(--green);   background: var(--green-dim); }
.sl-tag.minor { color: var(--cyan);    border-color: var(--cyan);    background: var(--cyan-dim); }
.sl-tag.patch { color: var(--text-2);  border-color: var(--border-2); background: var(--bg-3); }
.sl-tag.beta  { color: var(--magenta); border-color: var(--magenta); background: var(--magenta-dim); }
.sl-tag.alpha { color: var(--magenta); border-color: var(--magenta); background: var(--magenta-dim); }

/* ── FEED ── */
.feed {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-0);
  background: var(--bg-0);
}

/* End of log */
.end-of-log {
  padding: 18px 36px;
  font-size: 11px;
  color: var(--text-2);
  line-height: 1.7;
  border-top: 1px solid var(--border-1);
  background: var(--bg-1);
}

.eol-comment {
  color: var(--green);
  font-weight: 600;
  letter-spacing: 0.08em;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .page-header {
    padding: 80px 20px 28px;
  }

  .ph-meta {
    flex-wrap: wrap;
  }

  .phm-cell {
    min-width: 50%;
  }

  .changelog-wrap {
    grid-template-columns: 1fr;
    padding: 24px 20px;
    gap: 20px;
  }

  .sidebar {
    position: static;
    max-height: none;
  }

  .end-of-log {
    padding: 14px 20px;
  }
}
</style>
