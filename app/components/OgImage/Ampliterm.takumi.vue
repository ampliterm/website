<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  eyebrow?: string
}>(), {
  title: 'Ampliterm',
})
</script>

<template>
  <div
    style="
      width: 1200px;
      height: 630px;
      background: #0a0a0a;
      display: flex;
      flex-direction: column;
      font-family: 'JetBrains Mono', monospace;
      position: relative;
      overflow: hidden;
    "
  >
    <!-- Background watermark: large faint logomark -->
    <div
      style="
        position: absolute;
        right: -60px;
        bottom: -80px;
        opacity: 0.04;
      "
    >
      <svg width="640" height="746" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 22,20 2,20" fill="none" stroke="#00e676" stroke-width="1.5" stroke-linejoin="miter" />
        <line x1="6.5" y1="14.5" x2="17.5" y2="14.5" stroke="#00e676" stroke-width="1" />
        <line x1="12" y1="20" x2="12" y2="27" stroke="#00e676" stroke-width="1" stroke-dasharray="1.5,2" />
        <line x1="9" y1="27" x2="15" y2="27" stroke="#00e676" stroke-width="1" />
      </svg>
    </div>

    <!-- Subtle horizontal scan lines -->
    <div
      style="
        position: absolute;
        inset: 0;
        background-image: repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 41px,
          rgba(255, 255, 255, 0.012) 41px,
          rgba(255, 255, 255, 0.012) 42px
        );
      "
    />

    <!-- Green top accent bar -->
    <div style="width: 100%; height: 3px; background: #00e676; flex-shrink: 0;" />

    <!-- Main content area -->
    <div
      style="
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 40px 72px 0 72px;
        position: relative;
      "
    >
      <!-- Header row: logo + wordmark | eyebrow badge -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <svg width="32" height="38" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,2 22,20 2,20" fill="none" stroke="#00e676" stroke-width="1.5" stroke-linejoin="miter" />
            <line x1="6.5" y1="14.5" x2="17.5" y2="14.5" stroke="#00e676" stroke-width="1" opacity="0.5" />
            <line x1="12" y1="20" x2="12" y2="27" stroke="#00e676" stroke-width="1" stroke-dasharray="1.5,2" opacity="0.6" />
            <line x1="9" y1="27" x2="15" y2="27" stroke="#00e676" stroke-width="1" opacity="0.4" />
          </svg>
          <span
            style="
              color: #f0f0ee;
              font-size: 18px;
              font-weight: 600;
              letter-spacing: 0.12em;
            "
          >AMPLITERM</span>
        </div>

        <div
          v-if="eyebrow"
          style="
            color: #00e676;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.2em;
            border: 1px solid #00e676;
            padding: 5px 12px;
          "
        >{{ eyebrow }}</div>
      </div>

      <!-- Title + description: vertically centered in remaining space -->
      <div
        style="
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        "
      >
        <div style="display: flex; align-items: stretch; gap: 28px;">
          <!-- Left green accent bar -->
          <div style="width: 3px; background: #00e676; flex-shrink: 0;" />

          <div style="display: flex; flex-direction: column; gap: 18px;">
            <div
              style="
                color: #f0f0ee;
                font-size: 52px;
                font-weight: 700;
                line-height: 1.2;
                max-width: 900px;
              "
            >{{ title }}</div>

            <div
              v-if="description"
              style="
                color: #a0a09e;
                font-size: 17px;
                font-weight: 400;
                line-height: 1.6;
                max-width: 820px;
              "
            >{{ description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer bar -->
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 72px;
        height: 48px;
        border-top: 1px solid #2a2a2a;
        background: #111111;
        flex-shrink: 0;
      "
    >
      <span
        style="
          color: #606060;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
        "
      >RESEARCH TERMINAL</span>
      <span
        style="
          color: #3a3a3a;
          font-size: 10px;
          letter-spacing: 0.08em;
        "
      >ampliterm.com</span>
    </div>
  </div>
</template>
