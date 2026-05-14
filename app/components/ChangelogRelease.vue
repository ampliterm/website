<script setup lang="ts">
const props = defineProps<{
  release: {
    version: string
    title?: string
    type: 'major' | 'minor' | 'patch' | 'beta' | 'alpha'
    date: string
    codename?: string
    commits?: number
    contributors?: number
    intro: string
    sections: Array<{
      type: 'added' | 'changed' | 'fixed' | 'removed' | 'breaking'
      items: Array<{
        date: string
        badge: 'new' | 'improved' | 'fixed' | 'removed' | 'breaking'
        text: string
        sha?: string
        author?: string
      }>
    }>
  }
}>()

const versionId = computed(() =>
  `v${props.release.version.replace(/\./g, '-')}`
)

const typeLabel = {
  major: 'MAJOR',
  minor: 'MINOR',
  patch: 'PATCH',
  beta:  'BETA',
  alpha: 'ALPHA',
}

const formattedDate = computed(() => {
  const d = new Date(props.release.date + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
})
</script>

<template>
  <article class="release" :id="versionId">
    <a class="rel-anchor" :href="`#${versionId}`">#{{ versionId }}</a>

    <div class="rel-head">
      <div class="rel-version">
        v{{ release.version }}
        <template v-if="release.title">
          <em> — </em>{{ release.title }}
        </template>
      </div>
      <span class="rel-tag" :class="release.type">{{ typeLabel[release.type] }}</span>
      <div class="rel-meta">
        {{ formattedDate }}
        <template v-if="release.commits">
          <span class="dot" />
          {{ release.commits }} commits
        </template>
        <template v-if="release.contributors">
          <span class="dot" />
          {{ release.contributors }} contributors
        </template>
      </div>
    </div>

    <div v-if="release.codename" class="rel-codename">codename: {{ release.codename }}</div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="rel-intro" v-html="release.intro" />

    <ChangelogSection
      v-for="(section, i) in release.sections"
      :key="i"
      :section="section"
    />
  </article>
</template>

<style scoped>
.release {
  border-bottom: 1px solid var(--border-0);
  padding: 36px 36px 40px;
  position: relative;
  scroll-margin-top: 72px;
}

.release:last-child {
  border-bottom: none;
}

.rel-anchor {
  position: absolute;
  top: 32px;
  right: 32px;
  font-size: 9px;
  color: var(--text-3);
  letter-spacing: 0.08em;
  text-decoration: none;
}

.rel-anchor:hover {
  color: var(--cyan);
  text-decoration: none;
}

.rel-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.rel-version {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-0);
}

.rel-version em {
  font-style: normal;
  color: var(--green);
}

.rel-tag {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  padding: 2px 6px;
  border: 1px solid;
  text-transform: uppercase;
  font-family: var(--font);
}

.rel-tag.major { color: var(--green);   border-color: var(--green);   background: var(--green-dim); }
.rel-tag.minor { color: var(--cyan);    border-color: var(--cyan);    background: var(--cyan-dim); }
.rel-tag.patch { color: var(--text-1);  border-color: var(--border-2); background: var(--bg-3); }
.rel-tag.beta  { color: var(--magenta); border-color: var(--magenta); background: var(--magenta-dim); }
.rel-tag.alpha { color: var(--magenta); border-color: var(--magenta); background: var(--magenta-dim); }

.rel-meta {
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

.rel-codename {
  font-size: 11px;
  color: var(--cyan);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.rel-codename::before {
  content: '// ';
  color: var(--text-3);
}

.rel-intro {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.7;
  margin-bottom: 20px;
  max-width: 680px;
}

.rel-intro :deep(strong) {
  color: var(--text-0);
  font-weight: 500;
}

.rel-intro :deep(code) {
  background: var(--bg-2);
  border: 1px solid var(--border-0);
  padding: 1px 6px;
  font-size: 11px;
  color: var(--green);
  font-family: var(--font);
}

@media (max-width: 900px) {
  .release {
    padding: 24px 20px;
  }

  .rel-anchor {
    display: none;
  }

  .rel-meta {
    display: none;
  }
}
</style>
