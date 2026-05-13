<script setup lang="ts">
const clock = ref('--:--:--')

onMounted(() => {
  const tick = () => {
    clock.value = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }
  tick()
  const interval = setInterval(tick, 1000)
  onUnmounted(() => clearInterval(interval))
})

const ticker = [
  { sym: 'NVDA', px: '881.40', chg: '+2.88%', up: true },
  { sym: 'AAPL', px: '198.03', chg: '−0.42%', up: false },
  { sym: 'META', px: '512.67', chg: '+1.02%', up: true },
  { sym: 'SPY',  px: '524.18', chg: '+1.24%', up: true },
]
</script>

<template>
  <div class="mockup-frame">
    <!-- Topbar -->
    <div class="mockup-topbar">
      <AppLogomark :size="14" />
      <span class="mockup-title">AMPLITERM</span>
      <span class="mockup-nav-item active">Chart</span>
      <span class="mockup-nav-item">Journal</span>
      <span class="mockup-nav-item">Simulate</span>
      <div class="mockup-right">
        <span class="mockup-clock">{{ clock }}</span>
        <div class="mockup-dot" aria-hidden="true"></div>
      </div>
    </div>

    <!-- Ticker strip -->
    <div class="mockup-ticker">
      <div v-for="t in ticker" :key="t.sym" class="tick-item">
        <span class="tick-sym" :class="t.up ? 'up' : 'dn'">{{ t.sym }}</span>
        <span class="tick-px">{{ t.px }}</span>
        <span class="tick-chg" :class="t.up ? 'up' : 'dn'">{{ t.chg }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="mockup-body">
      <!-- Chart column -->
      <div class="mockup-chart-col">
        <div class="mockup-chart-controls">
          <span class="mcc-btn">5D</span>
          <span class="mcc-btn">1M</span>
          <span class="mcc-btn active">6M</span>
          <span class="mcc-btn">1Y</span>
          <div class="mcc-sep"></div>
          <span class="mcc-btn active" style="color: var(--green);">SMA50</span>
          <span class="mcc-btn active" style="color: var(--amber);">SMA200</span>
          <span class="mcc-btn">BB</span>
          <div class="mcc-sep"></div>
          <span class="mcc-btn active">Vol</span>
          <span class="mcc-btn">RSI</span>
          <span class="mcc-btn">MACD</span>
        </div>

        <div class="mockup-chart-area">
          <svg width="100%" height="100%" viewBox="0 0 440 310" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- Grid -->
            <line x1="0" y1="60"  x2="440" y2="60"  stroke="#1a1a1a" stroke-width=".8"/>
            <line x1="0" y1="120" x2="440" y2="120" stroke="#1a1a1a" stroke-width=".8"/>
            <line x1="0" y1="180" x2="440" y2="180" stroke="#1a1a1a" stroke-width=".8"/>
            <line x1="0" y1="240" x2="440" y2="240" stroke="#1a1a1a" stroke-width=".8"/>
            <line x1="80"  y1="0" x2="80"  y2="310" stroke="#1a1a1a" stroke-width=".8"/>
            <line x1="160" y1="0" x2="160" y2="310" stroke="#1a1a1a" stroke-width=".8"/>
            <line x1="240" y1="0" x2="240" y2="310" stroke="#1a1a1a" stroke-width=".8"/>
            <line x1="320" y1="0" x2="320" y2="310" stroke="#1a1a1a" stroke-width=".8"/>
            <line x1="400" y1="0" x2="400" y2="310" stroke="#1a1a1a" stroke-width=".8"/>

            <!-- Green candles -->
            <g fill="#00e676" stroke="#00e676" stroke-width=".5">
              <line x1="12"  y1="225" x2="12"  y2="205" stroke-width="1"/><rect x="9"   y="210" width="6" height="12"/>
              <line x1="20"  y1="218" x2="20"  y2="198" stroke-width="1"/><rect x="17"  y="203" width="6" height="12"/>
              <line x1="28"  y1="210" x2="28"  y2="192" stroke-width="1"/><rect x="25"  y="196" width="6" height="10"/>
              <line x1="36"  y1="222" x2="36"  y2="200" stroke-width="1"/><rect x="33"  y="205" width="6" height="13"/>
              <line x1="52"  y1="215" x2="52"  y2="195" stroke-width="1"/><rect x="49"  y="200" width="6" height="12"/>
              <line x1="68"  y1="200" x2="68"  y2="182" stroke-width="1"/><rect x="65"  y="186" width="6" height="11"/>
              <line x1="76"  y1="192" x2="76"  y2="170" stroke-width="1"/><rect x="73"  y="174" width="6" height="14"/>
              <line x1="92"  y1="185" x2="92"  y2="163" stroke-width="1"/><rect x="89"  y="167" width="6" height="14"/>
              <line x1="108" y1="170" x2="108" y2="150" stroke-width="1"/><rect x="105" y="154" width="6" height="13"/>
              <line x1="124" y1="160" x2="124" y2="140" stroke-width="1"/><rect x="121" y="144" width="6" height="13"/>
              <line x1="148" y1="155" x2="148" y2="135" stroke-width="1"/><rect x="145" y="139" width="6" height="13"/>
              <line x1="164" y1="148" x2="164" y2="128" stroke-width="1"/><rect x="161" y="132" width="6" height="13"/>
              <line x1="188" y1="138" x2="188" y2="118" stroke-width="1"/><rect x="185" y="122" width="6" height="13"/>
              <line x1="220" y1="130" x2="220" y2="108" stroke-width="1"/><rect x="217" y="112" width="6" height="14"/>
              <line x1="252" y1="120" x2="252" y2="100" stroke-width="1"/><rect x="249" y="104" width="6" height="13"/>
              <line x1="276" y1="108" x2="276" y2="86"  stroke-width="1"/><rect x="273" y="90"  width="6" height="14"/>
              <line x1="308" y1="95"  x2="308" y2="72"  stroke-width="1"/><rect x="305" y="76"  width="6" height="14"/>
              <line x1="348" y1="82"  x2="348" y2="60"  stroke-width="1"/><rect x="345" y="64"  width="6" height="14"/>
              <line x1="388" y1="70"  x2="388" y2="48"  stroke-width="1"/><rect x="385" y="52"  width="6" height="14"/>
              <line x1="420" y1="60"  x2="420" y2="38"  stroke-width="1"/><rect x="417" y="42"  width="6" height="14"/>
            </g>

            <!-- Red candles -->
            <g fill="#ff4444" stroke="#ff4444" stroke-width=".5">
              <line x1="44"  y1="220" x2="44"  y2="200" stroke-width="1"/><rect x="41"  y="204" width="6" height="13"/>
              <line x1="60"  y1="208" x2="60"  y2="190" stroke-width="1"/><rect x="57"  y="193" width="6" height="12"/>
              <line x1="84"  y1="195" x2="84"  y2="178" stroke-width="1"/><rect x="81"  y="180" width="6" height="12"/>
              <line x1="100" y1="178" x2="100" y2="158" stroke-width="1"/><rect x="97"  y="162" width="6" height="12"/>
              <line x1="116" y1="165" x2="116" y2="147" stroke-width="1"/><rect x="113" y="150" width="6" height="12"/>
              <line x1="132" y1="158" x2="132" y2="142" stroke-width="1"/><rect x="129" y="145" width="6" height="10"/>
              <line x1="140" y1="162" x2="140" y2="148" stroke-width="1"/><rect x="137" y="150" width="6" height="9"/>
              <line x1="156" y1="152" x2="156" y2="138" stroke-width="1"/><rect x="153" y="141" width="6" height="9"/>
              <line x1="172" y1="145" x2="172" y2="130" stroke-width="1"/><rect x="169" y="133" width="6" height="9"/>
              <line x1="196" y1="135" x2="196" y2="120" stroke-width="1"/><rect x="193" y="123" width="6" height="9"/>
              <line x1="204" y1="132" x2="204" y2="118" stroke-width="1"/><rect x="201" y="121" width="6" height="9"/>
              <line x1="236" y1="126" x2="236" y2="110" stroke-width="1"/><rect x="233" y="114" width="6" height="9"/>
              <line x1="260" y1="116" x2="260" y2="100" stroke-width="1"/><rect x="257" y="103" width="6" height="10"/>
              <line x1="292" y1="102" x2="292" y2="88"  stroke-width="1"/><rect x="289" y="91"  width="6" height="9"/>
              <line x1="324" y1="90"  x2="324" y2="76"  stroke-width="1"/><rect x="321" y="79"  width="6" height="8"/>
              <line x1="364" y1="78"  x2="364" y2="64"  stroke-width="1"/><rect x="361" y="67"  width="6" height="8"/>
              <line x1="404" y1="66"  x2="404" y2="52"  stroke-width="1"/><rect x="401" y="55"  width="6" height="8"/>
            </g>

            <!-- SMA 50 (cyan) -->
            <polyline points="0,230 40,218 80,200 120,175 160,155 200,140 240,125 280,105 320,88 360,72 400,58 440,46"
              fill="none" stroke="#00b8d4" stroke-width="1" opacity=".7"/>

            <!-- SMA 200 (amber) -->
            <polyline points="0,250 80,235 160,215 240,190 320,165 400,140 440,128"
              fill="none" stroke="#f5a623" stroke-width="1" opacity=".7"/>

            <!-- Volume bars -->
            <rect x="8"  y="278" width="5" height="22" fill="#00e67630"/>
            <rect x="16" y="272" width="5" height="28" fill="#00e67630"/>
            <rect x="24" y="280" width="5" height="20" fill="#00e67630"/>
            <rect x="32" y="275" width="5" height="25" fill="#00e67630"/>
            <rect x="40" y="282" width="5" height="18" fill="#ff444430"/>
            <rect x="48" y="270" width="5" height="30" fill="#00e67630"/>
            <rect x="56" y="284" width="5" height="16" fill="#ff444430"/>
            <rect x="64" y="268" width="5" height="32" fill="#00e67630"/>
            <rect x="72" y="272" width="5" height="28" fill="#00e67630"/>
            <rect x="80" y="276" width="5" height="24" fill="#ff444430"/>

            <!-- Price labels -->
            <text x="426" y="52"  font-family="JetBrains Mono,monospace" font-size="7" fill="#606060">$884</text>
            <text x="426" y="122" font-family="JetBrains Mono,monospace" font-size="7" fill="#606060">$820</text>
            <text x="426" y="182" font-family="JetBrains Mono,monospace" font-size="7" fill="#606060">$756</text>
            <text x="426" y="242" font-family="JetBrains Mono,monospace" font-size="7" fill="#606060">$692</text>
          </svg>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="mockup-sidebar">
        <div class="msb-section">
          <div class="msb-head"><div class="msb-title">Key Stats</div></div>
          <div class="msb-stat"><span class="msb-label">Mkt Cap</span><span class="msb-val">2.17T</span></div>
          <div class="msb-stat"><span class="msb-label">P/E</span><span class="msb-val">68.4</span></div>
          <div class="msb-stat"><span class="msb-label">Win Rate</span><span class="msb-val up">68.4%</span></div>
          <div class="msb-stat"><span class="msb-label">RSI (14)</span><span class="msb-val amber">64.2</span></div>
          <div class="msb-stat"><span class="msb-label">ATR</span><span class="msb-val muted">$22.40</span></div>
        </div>

        <div class="msb-section msb-journal">
          <div class="msb-head"><div class="msb-title">Journal</div></div>
          <div class="mockup-journal">
            <div class="mj-entry">
              <div class="mj-header">
                <span class="badge badge-g">LONG</span>
                <span class="badge badge-a">EARN</span>
                <span class="mj-ts">09:47</span>
              </div>
              <div class="mj-body">Pre-market scan shows <span class="ticker-ref">$NVDA</span> accumulating above VWAP. Volume 1.4× avg.</div>
            </div>
            <div class="mj-entry">
              <div class="mj-header">
                <span class="badge badge-g">SETUP</span>
                <span class="mj-ts">Apr 18</span>
              </div>
              <div class="mj-body">Bull flag — 5 tight closes. Waiting for break above $862 with vol confirmation.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mockup-frame {
  background: var(--bg-1);
  border: 1px solid var(--border-1);
  overflow: hidden;
}

/* Topbar */
.mockup-topbar {
  height: 36px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border-1);
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 8px;
}

.mockup-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-0);
  margin-right: 8px;
}

.mockup-nav-item {
  font-size: 9px;
  letter-spacing: 0.07em;
  color: var(--text-2);
  padding: 0 8px;
  text-transform: uppercase;
  border-bottom: 1px solid transparent;
  line-height: 36px;
}

.mockup-nav-item.active {
  color: var(--green);
  border-bottom-color: var(--green);
}

.mockup-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mockup-clock {
  font-size: 9px;
  color: var(--text-2);
}

.mockup-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 4px var(--green);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Ticker */
.mockup-ticker {
  display: flex;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border-0);
}

.tick-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-right: 1px solid var(--border-0);
}

.tick-sym { font-size: 10px; font-weight: 700; }
.tick-px  { font-size: 10px; color: var(--text-1); }
.tick-chg { font-size: 9px; }
.up { color: var(--green); }
.dn { color: var(--red); }

/* Body */
.mockup-body {
  display: flex;
  height: 360px;
}

.mockup-chart-col {
  flex: 1;
  border-right: 1px solid var(--border-0);
  display: flex;
  flex-direction: column;
}

.mockup-chart-controls {
  height: 28px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border-0);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
}

.mcc-btn {
  font-size: 8px;
  color: var(--text-2);
  padding: 2px 5px;
  cursor: pointer;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.mcc-btn.active {
  color: var(--text-0);
  background: var(--bg-3);
}

.mcc-sep {
  width: 1px;
  height: 10px;
  background: var(--border-1);
  margin: 0 4px;
}

.mockup-chart-area {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: var(--bg-0);
}

/* Sidebar */
.mockup-sidebar {
  width: 180px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.msb-section {
  border-bottom: 1px solid var(--border-0);
}

.msb-journal {
  flex: 1;
}

.msb-head {
  padding: 5px 10px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border-0);
}

.msb-title {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-2);
}

.msb-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
}

.msb-label { font-size: 9px; color: var(--text-2); }
.msb-val   { font-size: 10px; font-weight: 600; color: var(--text-0); }
.msb-val.up    { color: var(--green); }
.msb-val.amber { color: var(--amber); }
.msb-val.muted { color: var(--text-1); }

/* Journal */
.mockup-journal { padding: 10px; }

.mj-entry {
  padding: 8px;
  border: 1px solid var(--border-0);
  background: var(--bg-0);
  margin-bottom: 6px;
}

.mj-header {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

.mj-ts {
  font-size: 7px;
  color: var(--text-2);
  margin-left: auto;
}

.mj-body {
  font-size: 8px;
  color: var(--text-1);
  line-height: 1.5;
}

.ticker-ref {
  color: var(--green);
  font-weight: 600;
}

/* Badges */
.badge {
  display: inline-flex;
  padding: 1px 4px;
  font-size: 7px;
  font-weight: 600;
  border: 1px solid;
  letter-spacing: 0.04em;
}

.badge-g {
  color: var(--green);
  border-color: var(--green);
  background: var(--green-dim);
}

.badge-a {
  color: var(--amber);
  border-color: var(--amber);
  background: var(--amber-dim);
}
</style>
