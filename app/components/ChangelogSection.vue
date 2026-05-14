<script setup lang="ts">
const props = defineProps<{
  section: {
    type: 'added' | 'changed' | 'fixed' | 'removed' | 'breaking'
    items: Array<{
      date: string
      badge: 'new' | 'improved' | 'fixed' | 'removed' | 'breaking'
      text: string
      sha?: string
      author?: string
    }>
  }
}>()

const sectionMeta = {
  added:    { label: 'Added',    colorClass: 'added' },
  changed:  { label: 'Changed',  colorClass: 'changed' },
  fixed:    { label: 'Fixed',    colorClass: 'fixed' },
  removed:  { label: 'Removed',  colorClass: 'removed' },
  breaking: { label: 'Breaking', colorClass: 'breaking' },
}

const badgeMeta = {
  new:      { label: 'NEW',      cls: 'b-new' },
  improved: { label: 'IMPROVED', cls: 'b-imp' },
  fixed:    { label: 'FIXED',    cls: 'b-fix' },
  removed:  { label: 'REMOVED',  cls: 'b-rem' },
  breaking: { label: 'BREAKING', cls: 'b-brk' },
}

const meta = computed(() => sectionMeta[props.section.type])
</script>

<template>
  <div class="rel-section">
    <div class="rel-sec-head" :class="meta.colorClass">
      <span class="ico" />
      {{ meta.label }}
      <span class="count">· {{ section.items.length }}</span>
    </div>
    <div class="rel-list">
      <div
        v-for="(item, i) in section.items"
        :key="i"
        class="rel-item"
      >
        <span class="ri-date">{{ item.date }}</span>
        <span class="badge ri-badge" :class="badgeMeta[item.badge].cls">
          {{ badgeMeta[item.badge].label }}
        </span>
        <span class="ri-text">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="item.text" />
          <template v-if="item.sha">
            <span class="sha">{{ item.sha }}</span>
          </template>
          <template v-if="item.author">
            <span class="author">{{ item.author }}</span>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rel-section {
  margin-bottom: 14px;
}

.rel-section:last-child {
  margin-bottom: 0;
}

.rel-sec-head {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-2);
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--border-1);
}

.rel-sec-head .count {
  color: var(--text-3);
  font-weight: 400;
  letter-spacing: 0.05em;
}

.ico {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  display: inline-block;
}

.added    .ico { background: var(--green); }
.changed  .ico { background: var(--cyan); }
.fixed    .ico { background: var(--amber); }
.removed  .ico { background: var(--red); }
.breaking .ico { background: var(--magenta); }

.rel-list {
  display: flex;
  flex-direction: column;
}

.rel-item {
  display: grid;
  grid-template-columns: 78px 78px 1fr;
  gap: 14px;
  padding: 7px 0;
  border-bottom: 1px solid var(--border-0);
  font-size: 12px;
  align-items: baseline;
}

.rel-item:last-child {
  border-bottom: none;
}

.ri-date {
  font-size: 10px;
  color: var(--text-2);
  letter-spacing: 0.04em;
}

.ri-badge {
  justify-self: start;
}

.ri-text {
  color: var(--text-1);
  line-height: 1.65;
}

.ri-text :deep(strong) {
  color: var(--text-0);
  font-weight: 500;
}

.ri-text :deep(code) {
  background: var(--bg-2);
  border: 1px solid var(--border-0);
  padding: 0 4px;
  font-size: 11px;
  color: var(--green);
  font-family: var(--font);
}

.sha {
  color: var(--cyan);
  font-size: 10px;
  letter-spacing: 0.04em;
  margin-left: 8px;
  opacity: 0.7;
}

.sha::before {
  content: '· ';
  color: var(--text-3);
  margin-right: 4px;
}

.author {
  color: var(--text-2);
  font-size: 10px;
  letter-spacing: 0.04em;
  margin-left: 6px;
}

/* badges */
.badge {
  display: inline-flex;
  padding: 1px 5px;
  font-size: 9px;
  font-weight: 600;
  border: 1px solid;
  letter-spacing: 0.08em;
  white-space: nowrap;
  text-transform: uppercase;
  font-family: var(--font);
}

.b-new { color: var(--green);   border-color: var(--green);   background: var(--green-dim); }
.b-imp { color: var(--cyan);    border-color: var(--cyan);    background: var(--cyan-dim); }
.b-fix { color: var(--amber);   border-color: var(--amber);   background: var(--amber-dim); }
.b-rem { color: var(--red);     border-color: var(--red);     background: var(--red-dim); }
.b-brk { color: var(--magenta); border-color: var(--magenta); background: var(--magenta-dim); }

@media (max-width: 900px) {
  .rel-item {
    grid-template-columns: 64px 70px 1fr;
    gap: 10px;
  }
}
</style>
