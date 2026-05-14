<script setup lang="ts">
interface FeatureMetaItem {
  label: string
  value: string
  color?: string
}

interface Feature {
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
  meta: FeatureMetaItem[]
}

interface Milestone {
  id: string
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
  features: Feature[]
}

const props = defineProps<{ milestone: Milestone }>()

const progressPctColor = computed(() => {
  const map: Record<string, string> = {
    green:   'var(--text-0)',
    cyan:    'var(--cyan)',
    amber:   'var(--amber)',
    magenta: 'var(--magenta)',
  }
  return map[props.milestone.progress?.color ?? 'green']
})
</script>

<template>
  <article class="milestone" :id="milestone.id">
    <a class="ms-anchor" :href="`#${milestone.id}`">#{{ milestone.id }}</a>

    <div class="ms-head">
      <div class="ms-quarter">{{ milestone.label }} <em>—</em> {{ milestone.quarter }}</div>
      <span class="ms-tag" :class="milestone.tag">{{ milestone.tagLabel }}</span>
      <div class="ms-meta">
        {{ milestone.dateRange }}
        <span class="dot" />
        {{ (milestone.features ?? []).length }} feature{{ (milestone.features ?? []).length !== 1 ? 's' : '' }}
      </div>
    </div>

    <div v-if="milestone.codename" class="ms-codename">codename: {{ milestone.codename }}</div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="ms-intro" v-html="milestone.intro" />

    <div v-if="milestone.progress" class="ms-progress">
      <div>
        <div class="ms-progress-label">{{ milestone.progress.label }}</div>
        <div class="ms-progress-bar-wrap">
          <div
            class="ms-progress-bar"
            :class="milestone.progress.color"
            :style="{ width: `${milestone.progress.percent}%` }"
          />
        </div>
        <div class="ms-progress-stats">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-for="(stat, i) in milestone.progress.stats ?? []" :key="i" v-html="stat" />
        </div>
      </div>
      <div class="ms-progress-pct" :style="{ color: progressPctColor }">
        {{ milestone.progress.percent }}%
      </div>
    </div>

    <RoadmapFeature
      v-for="feature in milestone.features ?? []"
      :key="feature.id"
      :feature="feature"
    />
  </article>
</template>

<style scoped>
.milestone {
  border-bottom: 1px solid var(--border-0);
  padding: 36px 36px 40px;
  position: relative;
  scroll-margin-top: 72px;
}

.milestone:last-child {
  border-bottom: none;
}

/* ANCHOR LINK */
.ms-anchor {
  position: absolute;
  top: 32px;
  right: 32px;
  font-size: 9px;
  color: var(--text-3);
  letter-spacing: 0.08em;
  text-decoration: none;
}

.ms-anchor:hover {
  color: var(--cyan);
  text-decoration: none;
}

/* HEADER */
.ms-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.ms-quarter {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-0);
}

.ms-quarter em {
  font-style: normal;
  color: var(--green);
}

.ms-tag {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  padding: 2px 6px;
  border: 1px solid;
  text-transform: uppercase;
}

.ms-tag.now      { color: var(--green);   border-color: var(--green);   background: var(--green-dim); }
.ms-tag.next     { color: var(--cyan);    border-color: var(--cyan);    background: var(--cyan-dim); }
.ms-tag.later    { color: var(--text-1);  border-color: var(--border-2); background: var(--bg-3); }
.ms-tag.research { color: var(--magenta); border-color: var(--magenta); background: var(--magenta-dim); }

.ms-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  color: var(--text-2);
  letter-spacing: 0.05em;
  margin-left: auto;
}

.dot {
  width: 3px;
  height: 3px;
  background: var(--text-3);
  border-radius: 50%;
  display: inline-block;
}

/* CODENAME */
.ms-codename {
  font-size: 11px;
  color: var(--cyan);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.ms-codename::before {
  content: '// ';
  color: var(--text-3);
}

/* INTRO */
.ms-intro {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.7;
  margin-bottom: 22px;
  max-width: 720px;
}

.ms-intro :deep(strong) { color: var(--text-0); font-weight: 500; }
.ms-intro :deep(code)   { background: var(--bg-2); border: 1px solid var(--border-0); padding: 1px 6px; font-size: 11px; color: var(--green); font-family: var(--font); }

/* PROGRESS BAR */
.ms-progress {
  margin: 14px 0 22px;
  border: 1px solid var(--border-0);
  background: var(--bg-1);
  padding: 12px 16px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
  max-width: 720px;
}

.ms-progress-label {
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-2);
  margin-bottom: 6px;
}

.ms-progress-bar-wrap {
  height: 4px;
  background: var(--bg-3);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-0);
}

.ms-progress-bar { height: 100%; }
.ms-progress-bar.green   { background: var(--green); }
.ms-progress-bar.cyan    { background: var(--cyan); }
.ms-progress-bar.amber   { background: var(--amber); }
.ms-progress-bar.magenta { background: var(--magenta); }

.ms-progress-pct {
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font);
  min-width: 50px;
  text-align: right;
}

.ms-progress-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 10px;
  color: var(--text-2);
  letter-spacing: 0.04em;
  margin-top: 8px;
}

.ms-progress-stats :deep(strong) { color: var(--text-0); font-weight: 600; }

@media (max-width: 900px) {
  .milestone {
    padding: 24px 20px;
  }

  .ms-anchor {
    display: none;
  }

  .ms-meta {
    display: none;
  }
}
</style>
