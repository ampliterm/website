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

defineProps<{ feature: Feature }>()
</script>

<template>
  <div class="feat" :class="{ hero: feature.hero }">
    <div class="feat-head" :class="{ 'no-eta': !feature.eta }">
      <div class="feat-icon">
        <RoadmapIcon :icon="feature.icon" />
      </div>
      <div class="feat-titlewrap">
        <div class="feat-title">{{ feature.title }}</div>
        <div class="feat-cat">{{ feature.category }}</div>
      </div>
      <div class="feat-status" :class="feature.status">
        <span class="pulse-dot" />
        {{ feature.statusLabel }}
      </div>
      <div v-if="feature.eta" class="feat-eta">
        <span class="eta-label">{{ feature.etaLabel ?? 'ETA' }}</span>
        <span class="eta-val">{{ feature.eta }}</span>
      </div>
    </div>
    <div class="feat-body">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="feat-desc" v-html="feature.description" />
      <ul v-if="feature.bullets?.length" class="feat-bullets">
        <li v-for="(bullet, i) in feature.bullets ?? []" :key="i">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="bullet" />
        </li>
      </ul>
      <div v-if="feature.meta?.length" class="feat-meta">
        <div v-for="(m, i) in feature.meta ?? []" :key="i" class="fm-cell">
          <div class="fm-label">{{ m.label }}</div>
          <div
            class="fm-val"
            :style="m.color ? `color: var(--${m.color})` : undefined"
          >{{ m.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feat {
  border: 1px solid var(--border-0);
  background: var(--bg-1);
  margin-bottom: 14px;
}

.feat:last-child {
  margin-bottom: 0;
}

.feat.hero .feat-head {
  background: linear-gradient(180deg, #00e67610 0%, transparent 100%);
  border-bottom: 1px solid var(--border-1);
}

/* HEADER */
.feat-head {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 14px;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-0);
  background: var(--bg-2);
}

.feat-head.no-eta {
  grid-template-columns: auto 1fr auto;
}

.feat-icon {
  width: 28px;
  height: 28px;
  border: 1px solid var(--border-2);
  background: var(--bg-3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feat-titlewrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.feat-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-0);
  letter-spacing: -0.005em;
}

.feat-cat {
  font-size: 9px;
  color: var(--text-2);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* STATUS BADGE */
.feat-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid;
  white-space: nowrap;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.feat-status.dev    { color: var(--green);   border-color: var(--green);   background: var(--green-dim); }
.feat-status.review { color: var(--cyan);    border-color: var(--cyan);    background: var(--cyan-dim); }
.feat-status.beta   { color: var(--magenta); border-color: var(--magenta); background: var(--magenta-dim); }
.feat-status.planned  { color: var(--text-1); border-color: var(--border-2); background: var(--bg-3); }
.feat-status.research { color: var(--amber);  border-color: var(--amber);   background: var(--amber-dim); }

.feat-status.dev .pulse-dot    { background: var(--green);   box-shadow: 0 0 6px var(--green); animation: pulse 2s infinite; }
.feat-status.review .pulse-dot { background: var(--cyan); }
.feat-status.beta .pulse-dot   { background: var(--magenta); }
.feat-status.planned .pulse-dot  { background: var(--text-2); }
.feat-status.research .pulse-dot { background: var(--amber); }

/* ETA */
.feat-eta {
  font-size: 10px;
  color: var(--text-2);
  letter-spacing: 0.06em;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.eta-label {
  font-size: 8px;
  letter-spacing: 0.16em;
  color: var(--text-3);
  text-transform: uppercase;
}

.eta-val {
  color: var(--text-0);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.04em;
}

/* BODY */
.feat-body {
  padding: 18px 16px;
}

.feat-desc {
  font-size: 12.5px;
  color: var(--text-1);
  line-height: 1.7;
  margin-bottom: 14px;
  max-width: 680px;
}

.feat-desc:last-child {
  margin-bottom: 0;
}

.feat-desc :deep(strong) { color: var(--text-0); font-weight: 500; }
.feat-desc :deep(em)     { font-style: italic; }
.feat-desc :deep(code)   { background: var(--bg-2); border: 1px solid var(--border-0); padding: 0 4px; font-size: 11px; color: var(--green); font-family: var(--font); }

/* BULLETS */
.feat-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.feat-bullets li {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 10px;
  font-size: 12px;
  color: var(--text-1);
  line-height: 1.6;
}

.feat-bullets li::before {
  content: '▸';
  color: var(--green);
  font-size: 10px;
  line-height: 1.6;
}

.feat-bullets :deep(strong) { color: var(--text-0); font-weight: 500; }
.feat-bullets :deep(code)   { background: var(--bg-2); border: 1px solid var(--border-0); padding: 0 4px; font-size: 11px; color: var(--green); font-family: var(--font); }

/* META ROW */
.feat-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  border-top: 1px dashed var(--border-1);
  padding-top: 12px;
  margin-top: 4px;
}

.fm-cell {
  padding: 0 16px 0 0;
  margin-right: 16px;
  border-right: 1px solid var(--border-0);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.fm-cell:last-child {
  border-right: none;
  margin-right: 0;
  padding-right: 0;
}

.fm-label {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-3);
}

.fm-val {
  font-size: 11px;
  color: var(--text-0);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

@media (max-width: 900px) {
  .feat-head,
  .feat-head.no-eta {
    grid-template-columns: auto 1fr;
    row-gap: 8px;
  }

  .feat-status,
  .feat-eta {
    grid-column: 2;
    justify-self: start;
  }
}
</style>
