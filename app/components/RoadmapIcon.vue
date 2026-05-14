<script setup lang="ts">
const props = defineProps<{ icon: string }>()

const icons: Record<string, string> = {
  delta:    `<polygon points="7,1 13,12 1,12" fill="none" stroke="#00e676" stroke-width="1.3"/><line x1="3.5" y1="8.5" x2="10.5" y2="8.5" stroke="#00e676" stroke-width="1" opacity=".5"/>`,
  grid:     `<rect x="1.5" y="1.5" width="5" height="5" fill="none" stroke="#00b8d4" stroke-width="1.2"/><rect x="7.5" y="1.5" width="5" height="5" fill="none" stroke="#00b8d4" stroke-width="1.2" opacity=".7"/><rect x="1.5" y="7.5" width="5" height="5" fill="none" stroke="#00b8d4" stroke-width="1.2" opacity=".7"/><rect x="7.5" y="7.5" width="5" height="5" fill="none" stroke="#00b8d4" stroke-width="1.2" opacity=".4"/>`,
  keyboard: `<rect x="1" y="3" width="3" height="3" fill="none" stroke="#f5a623" stroke-width="1"/><rect x="5.5" y="3" width="3" height="3" fill="none" stroke="#f5a623" stroke-width="1"/><rect x="10" y="3" width="3" height="3" fill="none" stroke="#f5a623" stroke-width="1"/><rect x="3.25" y="8" width="7.5" height="3" fill="none" stroke="#f5a623" stroke-width="1"/>`,
  document: `<rect x="2" y="1.5" width="10" height="11" fill="none" stroke="#e040fb" stroke-width="1.2"/><line x1="4" y1="4.5" x2="10" y2="4.5" stroke="#e040fb" stroke-width="1"/><line x1="4" y1="7" x2="10" y2="7" stroke="#e040fb" stroke-width="1" opacity=".6"/><line x1="4" y1="9.5" x2="8" y2="9.5" stroke="#e040fb" stroke-width="1" opacity=".4"/>`,
  mobile:   `<rect x="3.5" y="1" width="7" height="12" fill="none" stroke="#00b8d4" stroke-width="1.2"/><line x1="3.5" y1="3" x2="10.5" y2="3" stroke="#00b8d4" stroke-width="1" opacity=".5"/><line x1="3.5" y1="11" x2="10.5" y2="11" stroke="#00b8d4" stroke-width="1" opacity=".5"/><circle cx="7" cy="12" r=".5" fill="#00b8d4"/>`,
  chart:    `<polyline points="1,11 4,7 6,9 9,4 13,2" fill="none" stroke="#00e676" stroke-width="1.2"/><line x1="1" y1="13" x2="13" y2="13" stroke="#00e676" stroke-width=".8" opacity=".5"/><line x1="1" y1="13" x2="1" y2="1" stroke="#00e676" stroke-width=".8" opacity=".5"/>`,
  team:     `<circle cx="4.5" cy="5" r="2" fill="none" stroke="#e040fb" stroke-width="1.2"/><circle cx="9.5" cy="5" r="2" fill="none" stroke="#e040fb" stroke-width="1.2" opacity=".7"/><path d="M1.5 12 Q4.5 8.5 7 10 Q9.5 8.5 12.5 12" fill="none" stroke="#e040fb" stroke-width="1.2"/>`,
  api:      `<path d="M2 7 L5 4 M5 4 L8 7 M8 7 L11 4 M11 4 L14 7" fill="none" stroke="#f5a623" stroke-width="1.2" transform="translate(-1,1)"/><circle cx="3" cy="10" r="1" fill="#f5a623"/><circle cx="7" cy="10" r="1" fill="#f5a623"/><circle cx="11" cy="10" r="1" fill="#f5a623"/>`,
  sync:     `<path d="M2 7 Q7 2 12 7 Q7 12 2 7 Z" fill="none" stroke="#00b8d4" stroke-width="1.2"/><circle cx="7" cy="7" r="1.5" fill="#00b8d4"/>`,
  function: `<text x="7" y="10" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#00e676" font-weight="700">f(x)</text>`,
  ai:       `<circle cx="7" cy="7" r="5" fill="none" stroke="#e040fb" stroke-width="1.2"/><circle cx="5" cy="6" r=".8" fill="#e040fb"/><circle cx="9" cy="6" r=".8" fill="#e040fb"/><path d="M5 9 Q7 10.5 9 9" fill="none" stroke="#e040fb" stroke-width="1"/>`,
  options:  `<polygon points="7,2 12,12 2,12" fill="none" stroke="#a0a09e" stroke-width="1.2"/><circle cx="7" cy="9" r="1" fill="#a0a09e"/>`,
  globe:    `<circle cx="7" cy="7" r="5" fill="none" stroke="#a0a09e" stroke-width="1.2"/><line x1="2" y1="7" x2="12" y2="7" stroke="#a0a09e" stroke-width="1"/><path d="M7 2 Q11 7 7 12 Q3 7 7 2" fill="none" stroke="#a0a09e" stroke-width="1"/>`,
  report:   `<rect x="2" y="3" width="10" height="8" fill="none" stroke="#a0a09e" stroke-width="1.2"/><line x1="4" y1="6" x2="10" y2="6" stroke="#a0a09e" stroke-width="1"/><line x1="4" y1="8" x2="8" y2="8" stroke="#a0a09e" stroke-width="1" opacity=".6"/>`,
  voice:    `<path d="M3 11 L7 4 L11 11 Z" fill="none" stroke="#a0a09e" stroke-width="1.2"/><circle cx="7" cy="2" r="1.2" fill="#a0a09e"/>`,
  default:  `<rect x="2" y="2" width="10" height="10" fill="none" stroke="#606060" stroke-width="1"/>`,
}

const iconContent = computed(() => icons[props.icon] ?? icons.default)
</script>

<template>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <g v-html="iconContent" />
  </svg>
</template>
