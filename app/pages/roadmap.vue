<script setup lang="ts">
interface TimelineMarker {
  label: string
  type: 'commit' | 'next' | 'exp' | 'research'
  top: number
}

interface TimelineMonth {
  name: string
  now: boolean
  nowLinePercent?: number
  markers: TimelineMarker[]
}

interface RoadmapMeta {
  eyebrow: string
  intro: string
  liveBuild: string
  inFlight: string
  inFlightColor: string
  target: string
  featuresQueued: number
  disclaimer: string
  githubUrl?: string
  discordUrl?: string
  timeline: {
    label: string
    months: TimelineMonth[]
  }
}

interface Milestone {
  id: string
  order: number
  label: string
  quarter: string
  tag: 'now' | 'next' | 'later' | 'research'
  tagLabel: string
  dateRange: string
  codename?: string
  intro: string
  progress?: {
    label: string
    percent: number
    color: 'green' | 'cyan' | 'amber' | 'magenta'
    stats: string[]
  }
  features: Array<{
    id: string
    hero: boolean
    title: string
    category: string
    icon: string
    status: 'dev' | 'review' | 'beta' | 'planned' | 'research'
    statusLabel: string
    eta?: string
    etaLabel?: string
    description: string
    bullets: string[]
    meta: Array<{ label: string; value: string; color?: string }>
  }>
}

const { data: metaList } = await useAsyncData('roadmap-meta', () =>
  queryCollection('roadmapMeta').all(),
)
const meta = computed(() => metaList.value?.[0] as RoadmapMeta | undefined)

const { data: milestones } = await useAsyncData('roadmap-milestones', () =>
  queryCollection('roadmap').order('order', 'ASC').all(),
) as { data: Ref<Milestone[] | null> }

const activeId = ref<string>('')

const sidebarPill: Record<string, string> = {
  now:      'SHIP',
  next:     'DEV',
  later:    'PLAN',
  research: 'EXPL',
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-72px 0px -60% 0px', threshold: 0 },
  )

  milestones.value?.forEach((m) => {
    const el = document.getElementById(m.id)
    if (el) observer.observe(el)
  })

  if (milestones.value?.length) {
    activeId.value = milestones.value[0].id
  }

  onUnmounted(() => observer.disconnect())
})

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeId.value = id
  }
}

useHead({
  title: 'Roadmap — Ampliterm',
  meta: [
    { name: 'description', content: 'Where Ampliterm is going. Every committed milestone, what it unlocks, and an honest estimate of when.' },
  ],
})
</script>

<template>
  <div>
    <AppNav active-page="roadmap" />

    <!-- ── PAGE HEADER ── -->
    <section class="page-header">
      <div v-if="meta" class="ph-inner">
        <div class="ph-eyebrow">{{ meta.eyebrow }}</div>
        <h1 class="ph-title">Roadmap<em>.</em></h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="ph-sub" v-html="meta.intro" />

        <div class="ph-meta">
          <div class="phm-cell">
            <div class="phm-label">Live build</div>
            <div class="phm-val">
              <span class="live-dot" />
              {{ meta.liveBuild }}
            </div>
          </div>
          <div class="phm-cell">
            <div class="phm-label">In flight</div>
            <div class="phm-val" :class="meta.inFlightColor">{{ meta.inFlight }}</div>
          </div>
          <div class="phm-cell">
            <div class="phm-label">Target</div>
            <div class="phm-val">{{ meta.target }}</div>
          </div>
          <div class="phm-cell">
            <div class="phm-label">Features queued</div>
            <div class="phm-val am">{{ meta.featuresQueued }}</div>
          </div>
        </div>

        <!-- TIMELINE STRIP -->
        <div class="tl-strip">
          <div class="tl-strip-head">
            <span class="tl-strip-title">{{ meta.timeline.label }}</span>
            <div class="tl-legend">
              <span class="tl-legend-item">
                <span class="tl-legend-dot" style="background: var(--green);" />Committed
              </span>
              <span class="tl-legend-item">
                <span class="tl-legend-dot" style="background: var(--cyan);" />Next up
              </span>
              <span class="tl-legend-item">
                <span class="tl-legend-dot" style="background: var(--bg-2); border: 1px dashed var(--border-2);" />Exploring
              </span>
              <span class="tl-legend-item">
                <span class="tl-legend-dot" style="background: var(--magenta);" />Research
              </span>
            </div>
          </div>
          <div class="tl-track">
            <div
              v-for="month in meta.timeline.months"
              :key="month.name"
              class="tl-month"
              :class="{ now: month.now }"
            >
              <div class="tl-month-name">{{ month.name }}</div>
              <div
                v-for="(marker, i) in month.markers"
                :key="i"
                class="tl-marker"
                :class="marker.type"
                :style="{ top: `${marker.top}px`, width: 'calc(100% - 16px)' }"
              >{{ marker.label }}</div>
              <div
                v-if="month.now && month.nowLinePercent !== undefined"
                class="tl-now-line"
                :style="{ left: `${month.nowLinePercent}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── MAIN LAYOUT ── -->
    <div class="roadmap-wrap">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-head">
          <span class="sidebar-title">Milestones</span>
          <span class="sidebar-count">{{ milestones?.length ?? 0 }} stages</span>
        </div>
        <nav class="sidebar-list">
          <button
            v-for="m in milestones"
            :key="m.id"
            class="sl-item"
            :class="{ active: activeId === m.id }"
            @click="scrollTo(m.id)"
          >
            <span class="sl-q">{{ m.label }}</span>
            <span class="sl-when">{{ m.quarter }}</span>
            <span class="sl-pill" :class="m.tag">{{ sidebarPill[m.tag] }}</span>
          </button>
        </nav>
        <div class="sl-legend">
          <div class="sl-legend-title">Status</div>
          <div class="sl-legend-row">
            <span class="dot" style="background: var(--green);" />In dev — code being written
          </div>
          <div class="sl-legend-row">
            <span class="dot" style="background: var(--cyan);" />In review — design / RFC stage
          </div>
          <div class="sl-legend-row">
            <span class="dot" style="background: var(--magenta);" />Beta — limited cohort
          </div>
          <div class="sl-legend-row">
            <span class="dot" style="background: var(--text-2);" />Planned — committed, not started
          </div>
          <div class="sl-legend-row">
            <span class="dot" style="background: var(--amber);" />Researching — feasibility
          </div>
        </div>
      </aside>

      <!-- FEED -->
      <main class="feed">
        <template v-for="(milestone, index) in milestones" :key="milestone.id">
          <RoadmapMilestone :milestone="milestone" />
          <div v-if="index === 0 && meta?.disclaimer" class="disclaimer">
            <span class="disc-prefix">Forward-looking</span>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="meta.disclaimer" />
          </div>
        </template>
      </main>

    </div>

    <!-- ── CTA ── -->
    <!-- <section v-if="meta" class="cta-block">
      <div class="cta-grid">
        <div>
          <h2>Don't see it<em>?</em> Request it.</h2>
          <p>
            Open a feature request on GitHub or bring it up in Discord. The team reviews new
            requests monthly — high-signal items get RFC'd directly. Even the rejections get
            a reply.
          </p>
        </div>
        <div class="cta-actions">
          <a class="cta-link" :href="meta.githubUrl ?? '#'">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5a6.5 6.5 0 0 0-2.05 12.66c.32.06.44-.14.44-.31v-1.1c-1.8.4-2.18-.86-2.18-.86-.3-.74-.72-.94-.72-.94-.59-.4.04-.4.04-.4.65.05 1 .67 1 .67.58.99 1.51.7 1.88.54.06-.42.23-.7.41-.86-1.43-.16-2.94-.72-2.94-3.2 0-.71.25-1.28.66-1.74-.07-.16-.29-.81.06-1.7 0 0 .54-.17 1.78.67a6.13 6.13 0 0 1 3.24 0c1.24-.84 1.78-.67 1.78-.67.35.89.13 1.54.06 1.7.41.46.66 1.03.66 1.74 0 2.49-1.51 3.04-2.95 3.2.23.2.44.59.44 1.19v1.77c0 .17.12.37.44.31A6.5 6.5 0 0 0 8 1.5z" fill="#a0a09e" />
            </svg>
            Open issues on GitHub
          </a>
          <a class="cta-link" :href="meta.discordUrl ?? '#'">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 3 L12 3 L12 11 L9 11 L7 13 L7 11 L2 11 Z" fill="none" stroke="#a0a09e" stroke-width="1.2" />
            </svg>
            Join the #roadmap Discord
          </a>
        </div>
      </div>
    </section> -->

    <AppFooter />
  </div>
</template>

<style scoped>
/* ── PAGE HEADER ── */
.page-header {
  border-bottom: 1px solid var(--border-0);
  padding: 96px 40px 40px;
}

.ph-inner {
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
  max-width: 680px;
  line-height: 1.7;
  margin-bottom: 32px;
}

.ph-sub :deep(strong) { color: var(--text-0); font-weight: 500; }
.ph-sub :deep(code)   { background: var(--bg-2); border: 1px solid var(--border-0); padding: 1px 6px; font-size: 11px; color: var(--green); font-family: var(--font); }

/* META STRIP */
.ph-meta {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--border-0);
  background: var(--bg-1);
  max-width: 920px;
  margin-bottom: 32px;
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

.phm-val.cy { color: var(--cyan); }
.phm-val.am { color: var(--amber); }
.phm-val.mg { color: var(--magenta); }

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

/* TIMELINE STRIP */
.tl-strip {
  border: 1px solid var(--border-0);
  background: var(--bg-1);
  padding: 18px 20px 14px;
  max-width: 1240px;
}

.tl-strip-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 10px;
}

.tl-strip-title {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-2);
}

.tl-legend {
  display: flex;
  gap: 14px;
  font-size: 9px;
  letter-spacing: 0.06em;
  color: var(--text-2);
  text-transform: uppercase;
  flex-wrap: wrap;
}

.tl-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tl-legend-dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
}

.tl-track {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border-top: 1px solid var(--border-1);
  position: relative;
}

.tl-month {
  padding: 18px 6px 8px;
  border-right: 1px solid var(--border-0);
  position: relative;
  font-size: 9px;
  color: var(--text-2);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  min-height: 84px;
}

.tl-month:last-child {
  border-right: none;
}

.tl-month.now {
  background: linear-gradient(180deg, #00e67610 0%, transparent 100%);
}

.tl-month-name {
  position: absolute;
  top: 6px;
  left: 8px;
}

.tl-marker {
  position: absolute;
  left: 8px;
  height: 14px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-size: 9px;
  letter-spacing: 0.06em;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
}

.tl-marker.commit   { background: var(--green-dim);   color: var(--green);   border: 1px solid var(--green); }
.tl-marker.next     { background: var(--cyan-dim);    color: var(--cyan);    border: 1px solid var(--cyan); }
.tl-marker.exp      { background: var(--bg-2);        color: var(--text-1);  border: 1px dashed var(--border-2); }
.tl-marker.research { background: var(--magenta-dim); color: var(--magenta); border: 1px solid var(--magenta); }

.tl-now-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--green);
  box-shadow: 0 0 8px var(--green);
}

.tl-now-line::before {
  content: 'NOW';
  position: absolute;
  top: -14px;
  left: -14px;
  font-size: 8px;
  letter-spacing: 0.16em;
  color: var(--green);
  font-weight: 700;
}

/* ── MAIN LAYOUT ── */
.roadmap-wrap {
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
  grid-template-columns: 60px 1fr auto;
  gap: 10px;
  padding: 10px 14px;
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

.sl-q {
  font-weight: 600;
  color: var(--text-0);
  font-size: 11px;
}

.sl-item.active .sl-q {
  color: var(--green);
}

.sl-when {
  font-size: 9px;
  color: var(--text-2);
  letter-spacing: 0.04em;
}

.sl-pill {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 1px 4px;
  border: 1px solid;
}

.sl-pill.now      { color: var(--green);   border-color: var(--green);   background: var(--green-dim); }
.sl-pill.next     { color: var(--cyan);    border-color: var(--cyan);    background: var(--cyan-dim); }
.sl-pill.later    { color: var(--text-2);  border-color: var(--border-2); background: var(--bg-3); }
.sl-pill.research { color: var(--magenta); border-color: var(--magenta); background: var(--magenta-dim); }

/* SIDEBAR LEGEND */
.sl-legend {
  padding: 10px 14px;
  border-top: 1px solid var(--border-0);
  background: var(--bg-2);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sl-legend-title {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-2);
  margin-bottom: 2px;
}

.sl-legend-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--text-1);
}

.sl-legend-row .dot {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
}

/* ── FEED ── */
.feed {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-0);
  background: var(--bg-0);
}

/* DISCLAIMER */
.disclaimer {
  padding: 14px 18px;
  border-top: 1px dashed var(--border-1);
  border-bottom: 1px dashed var(--border-1);
  background: var(--bg-1);
  font-size: 11px;
  color: var(--text-1);
  line-height: 1.7;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: start;
}

.disc-prefix {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--amber);
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid var(--amber);
  background: var(--amber-dim);
  white-space: nowrap;
  align-self: start;
}

.disclaimer :deep(strong) { color: var(--text-0); }
.disclaimer :deep(code)   { background: var(--bg-2); border: 1px solid var(--border-0); padding: 0 4px; font-size: 10px; color: var(--green); font-family: var(--font); }

/* ── CTA ── */
.cta-block {
  border-left: 1px solid var(--border-0);
  border-right: 1px solid var(--border-0);
  border-bottom: 1px solid var(--border-0);
  background: var(--bg-1);
  padding: 48px 40px;
  max-width: 1320px;
  margin: 0 auto;
}

.cta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 1240px;
  margin: 0 auto;
}

.cta-block h2 {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  font-family: var(--font);
  color: var(--text-0);
}

.cta-block h2 em {
  font-style: normal;
  color: var(--green);
}

.cta-block p {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.7;
  max-width: 520px;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid var(--border-1);
  background: var(--bg-2);
  font-size: 11px;
  letter-spacing: 0.07em;
  color: var(--text-1);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  transition: all 0.12s;
  align-self: flex-start;
  font-family: var(--font);
}

.cta-link:hover {
  color: var(--text-0);
  border-color: var(--text-2);
  background: var(--bg-3);
  text-decoration: none;
}

/* ── RESPONSIVE ── */
@media (max-width: 1000px) {
  .tl-track { grid-template-columns: repeat(4, 1fr); }
  .tl-month:nth-child(n+5) { display: none; }
  .cta-grid { grid-template-columns: 1fr; }
}

@media (max-width: 900px) {
  .page-header { padding: 80px 20px 28px; }

  .ph-meta { flex-wrap: wrap; }
  .phm-cell { min-width: 50%; }

  .tl-legend { display: none; }

  .roadmap-wrap {
    grid-template-columns: 1fr;
    padding: 24px 20px;
    gap: 20px;
  }

  .sidebar {
    position: static;
    max-height: none;
  }

  .cta-block { padding: 32px 20px; }
}
</style>
