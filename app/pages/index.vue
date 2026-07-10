<script setup lang="ts">
useScrollReveal('.reveal')

const waitlistOpen = ref(false)

/* ─────────────────────────────────────────────────────────────
   MARKETING CONTENT
   Edit copy here — no need to touch the template below.
───────────────────────────────────────────────────────────── */

const hero = {
  eyebrow: 'The strategy layer your brokerage account is missing',
  headlinePre: 'Trade with',
  headlineMid: 'evidence,',
  headlineEnd: 'not',
  headlineAccent: 'instinct.',
  subtext:
    'Ampliterm is the <strong>self-hosted strategy layer</strong> for your brokerage account. Build trading logic as explicit, testable rules — backtest it against history, screen the market for it nightly, and when it fires, Ampliterm places the trade on your own <strong>Alpaca</strong> account. IBKR is next.',
  ctaPrimary:   { label: 'Join the waitlist', href: '#pricing' },
  ctaSecondary: { label: 'See features →',       href: '#features' },
  notes: ['One-time payment.', 'Self-hosted, forever.', 'Trades execute on your brokerage account.'],
}

const metrics = [
  { value: '1',    accent: '',  label: 'Engine — backtest · screen · trade' },
  { value: '100',  accent: '%', label: 'Your data, your server' },
  { value: '1',    accent: '×', label: 'One-time payment' },
  { value: '0',    accent: '',  label: 'Third-party data brokers' },
]

const features = {
  eyebrow: 'Features',
  headline: 'Everything serious traders need.\nNothing they don\'t.',
  subtext:
    'Built for retail investors on Alpaca who want their strategy logic to be as rigorous as their broker\'s execution — not a simplified app designed for beginners.',
  items: [
    {
      name: 'Strategy Builder',
      desc: 'Compose trading logic as an explicit trigger → confirmation tree with per-condition timing windows. Add bail-out guards, exit logic, stop/target/trailing/time risk rules, position sizing, and an optional AI confirmation gate — every rule inspectable, every strategy reusable across tickers.',
      tag: 'ALL/ANY logic · Risk rules · AI gate',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="6" y="1" width="4" height="3" fill="none" stroke="#00e676" stroke-width="1.2"/>
        <rect x="1" y="11" width="4" height="3" fill="none" stroke="#00e676" stroke-width="1.2" opacity=".7"/>
        <rect x="11" y="11" width="4" height="3" fill="none" stroke="#00e676" stroke-width="1.2" opacity=".7"/>
        <path d="M8 4v3M8 7H3v4M8 7h5v4" stroke="#00e676" stroke-width="1" opacity=".5"/>
      </svg>`,
    },
    {
      name: 'Automated Trading',
      desc: 'Deploy a strategy onto a ticker and the engine trades it on your own Alpaca account. Paper-first by design — simulated local fills, then Alpaca paper, then live behind deliberate safeguards — with a portfolio risk governor, daily-loss kill switch, and broker-resting protective stops.',
      tag: 'Alpaca · Paper-first · Risk governor',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="9" width="14" height="6" fill="none" stroke="#00e676" stroke-width="1.2"/>
        <path d="M8 1v5.5M5.5 4.5 8 7l2.5-2.5" fill="none" stroke="#00e676" stroke-width="1.2"/>
        <rect x="4" y="11.5" width="8" height="1" fill="#00e676" opacity=".4"/>
      </svg>`,
    },
    {
      name: 'Backtesting',
      desc: 'Replay any strategy against history through the exact engine that trades live — closed candles only, no look-ahead. Inspect every trade, every trigger that didn\'t survive confirmation, and honest fill assumptions with pessimistic gap-through stops.',
      tag: 'One engine · Honest fills',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polyline points="1,13 5,7 8,9 11,4 15,6" fill="none" stroke="#00b8d4" stroke-width="1.5"/>
        <circle cx="5" cy="7" r="1" fill="#00b8d4"/>
        <circle cx="11" cy="4" r="1" fill="#00b8d4"/>
      </svg>`,
    },
    {
      name: 'Nightly Screener',
      desc: 'Every weekday close, your screener-enabled strategies sweep your watchlist and tier the results: triggered, alert, or warning — with streak tracking and an email digest. Jump from any hit into a pre-filled backtest in one click.',
      tag: 'EOD screen · Email digest',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="8,1 15,14 1,14" fill="none" stroke="#00e676" stroke-width="1.2"/>
        <line x1="5" y1="10" x2="11" y2="10" stroke="#00e676" stroke-width="1" opacity=".5"/>
      </svg>`,
    },
    {
      name: 'Cortex AI',
      desc: 'A conversational analyst inside the terminal. It evaluates indicators with the engine\'s own math, reads your open trades and journal for context, and critiques strategy drafts as you build them. Bring your own AI key — every response is analysis, never advice.',
      tag: 'Analysis · Never advice',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1v14M1 8h14M3.2 3.2l9.6 9.6M12.8 3.2l-9.6 9.6" stroke="#00b8d4" stroke-width="1" opacity=".35"/>
        <circle cx="8" cy="8" r="2.5" fill="none" stroke="#00b8d4" stroke-width="1.2"/>
      </svg>`,
    },
    {
      name: 'Charts & Indicators',
      desc: 'Candlestick charts with SMA, EMA, Bollinger Bands, VWAP, RSI, MACD, ATR, and relative volume — every value computed server-side by the same code the engine trades on. The RSI on your chart is the RSI your strategy fires on.',
      tag: 'TradingView Lightweight Charts',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="6" width="14" height="1" fill="#f5a623" opacity=".3"/>
        <rect x="1" y="9" width="14" height="1" fill="#f5a623" opacity=".3"/>
        <rect x="4" y="3" width="1.5" height="10" fill="#f5a623"/>
        <rect x="8" y="5" width="1.5" height="6" fill="#f5a623"/>
        <rect x="12" y="2" width="1.5" height="12" fill="#f5a623"/>
      </svg>`,
    },
    {
      name: 'SEC EDGAR Fundamentals',
      desc: 'Financials pulled straight from sec.gov — standardized XBRL metrics across the income statement, balance sheet, and cash flow, plus filings with AI summaries and sentiment. Every number traceable to the exact filing that reported it. No data vendor, no extra fees.',
      tag: 'Primary source · No data fees',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 1h7l3 3v11H3z" fill="none" stroke="#f5a623" stroke-width="1.2"/>
        <path d="M10 1v3h3" fill="none" stroke="#f5a623" stroke-width="1"/>
        <rect x="5" y="7" width="6" height="1" fill="#f5a623" opacity=".5"/>
        <rect x="5" y="9.5" width="6" height="1" fill="#f5a623" opacity=".5"/>
        <rect x="5" y="12" width="4" height="1" fill="#f5a623" opacity=".5"/>
      </svg>`,
    },
    {
      name: 'Research Suite',
      desc: 'A markdown journal with automatic <span class="ticker-inline">$TICKER</span> detection, an Intel feed that captures articles, files, and transcripts (with a browser extension for clipping), and price predictions that score your calls against what actually happened.',
      tag: 'Journal · Intel · Predictions',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="2" fill="#00e676" opacity=".6"/>
        <rect x="2" y="6" width="9" height="1.5" fill="#00e676" opacity=".4"/>
        <rect x="2" y="9.5" width="11" height="1.5" fill="#00e676" opacity=".4"/>
        <rect x="2" y="13" width="7" height="1.5" fill="#00e676" opacity=".3"/>
      </svg>`,
    },
    {
      name: 'Self-Hosted & Private',
      desc: 'Runs entirely on your server as licensed Docker images. Your broker keys, trade history, and research never leave hardware you control. One-time purchase. No SaaS fees. No telemetry.',
      tag: 'Self-hosted · No telemetry · Lifetime license',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" fill="none" stroke="#a0a09e" stroke-width="1"/>
        <rect x="5" y="5" width="6" height="6" fill="none" stroke="#a0a09e" stroke-width="1" opacity=".6"/>
        <rect x="7.5" y="7.5" width="1" height="1" fill="#a0a09e"/>
      </svg>`,
    },
  ],
}

const pricing = {
  eyebrow: 'Pricing',
  headline: 'One price.\nOwn it forever.',
  subtext:
    'No monthly fees. No per-seat pricing. No data access charges. Pay once, self-host, and use Ampliterm as long as you trade. Your data stays yours.',
  tier: 'Professional License',
  price: 'One-time',
  cadence: 'Founding price announced at launch',
  items: [
    'Strategy builder with a 15-condition catalog',
    'Automated trading on your Alpaca account — paper & live modes',
    'Unlimited backtests on the same engine that trades',
    'Nightly strategy screener with email digests',
    'Cortex AI assistant (bring your own AI key)',
    'SEC EDGAR fundamentals & filings with AI summaries',
    'Research journal, Intel capture & price predictions',
    'One year of feature updates included',
  ],
  comparison: [
    { label: 'Lifetime license — no renewal',       included: true },
    { label: 'Runs entirely on your server — licensed Docker images', included: true },
    { label: 'All current features',                included: true },
    { label: 'One year of feature updates included',included: true },
    { label: 'Your data stays on your server',      included: true },
    { label: 'No usage-based pricing',              included: true },
    { label: 'Monthly SaaS subscription',           included: false },
    { label: 'Per-seat fees',                       included: false },
    { label: 'Data brokerage or telemetry',         included: false },
  ],
  ctaLabel: 'Join the waitlist',
  ctaHref: '#',
  footnote: 'Lifetime license · No renewal, ever\nSelf-host on any server or local machine\nRequires an Alpaca account — data & execution run on your own brokerage connection',
}

const terminalCta = {
  comment: '// ready to trade with evidence?',
  command: '$ ampliterm --deploy-strategy',
  subtext:
    'Join traders who build their logic as testable rules, backtest every thesis, and let discipline they defined in advance place the trade — on their own server, on their own terms.',
  ctaLabel: 'Join the waitlist',
  ctaHref: '#pricing',
}

useHead({
  title: 'The Strategy Layer for Your Brokerage Account',
  meta: [
    { name: 'description', content: 'Self-hosted strategy builder that backtests, screens, and executes trades on your own Alpaca account. Build explicit trading logic, test it against history, deploy it paper-first. One-time payment.' },
  ],
})

useSeoMeta({
  title: 'The Strategy Layer for Your Brokerage Account',
  description: 'Self-hosted strategy builder that backtests, screens, and executes trades on your own Alpaca account. Build explicit trading logic, test it against history, deploy it paper-first. One-time payment.',
  ogImage: 'https://ampliterm.com/og/home-og.png',
  ogTitle: 'The Strategy Layer for Your Brokerage Account',
  ogDescription: 'Self-hosted strategy builder that backtests, screens, and executes trades on your own Alpaca account. Build explicit trading logic, test it against history, deploy it paper-first. One-time payment.',
  ogUrl: 'https://ampliterm.com',
  ogType: 'website',
  ogLocale: 'en_US',
  ogSiteName: 'Ampliterm',
  ogImageWidth: 1200,
  ogImageHeight: 630,
})
</script>

<template>
  <div>
    <AppNav @prompt-waitlist="waitlistOpen = true" />

    <!-- ── HERO ── -->
    <section class="hero">
      <div class="hero-left">
        <div class="hero-eyebrow">{{ hero.eyebrow }}</div>

        <h1 class="hero-h1">
          {{ hero.headlinePre }}<br>
          {{ hero.headlineMid }}<br>
          {{ hero.headlineEnd }} <em>{{ hero.headlineAccent }}</em>
        </h1>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="hero-sub" v-html="hero.subtext"></p>

        <div class="hero-cta-row">
          <button class="cta-primary" @click="waitlistOpen = true">{{ hero.ctaPrimary.label }}</button>
          <a class="cta-secondary" :href="hero.ctaSecondary.href">{{ hero.ctaSecondary.label }}</a>
        </div>

        <div class="hero-note">
          <template v-for="(note, i) in hero.notes" :key="note">
            <span>{{ note }}</span>
            <template v-if="i < hero.notes.length - 1"> &nbsp;·&nbsp; </template>
          </template>
        </div>
      </div>

      <div class="hero-right">
        <LandingHeroMockup />
      </div>
    </section>

    <!-- ── METRICS STRIP ── -->
    <div class="metrics-strip">
      <div v-for="m in metrics" :key="m.label" class="metric-item">
        <div class="metric-val">{{ m.value }}<em v-if="m.accent">{{ m.accent }}</em></div>
        <div class="metric-label">{{ m.label }}</div>
      </div>
    </div>

    <!-- ── FEATURES ── -->
    <div class="features-outer" id="features">
      <div class="features-inner">
        <div class="section-eyebrow">{{ features.eyebrow }}</div>
        <h2 class="section-h2" style="white-space: pre-line;">{{ features.headline }}</h2>
        <p class="section-sub">{{ features.subtext }}</p>

        <div class="features-grid">
          <div
            v-for="feat in features.items"
            :key="feat.name"
            class="feature-card reveal"
          >
            <div class="fc-icon" v-html="feat.icon"></div>
            <div class="fc-name">{{ feat.name }}</div>
            <div class="fc-desc">
              <span v-if="feat.soon" class="fc-soon">Coming soon</span>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="feat.desc"></span>
            </div>
            <div class="fc-tag">{{ feat.tag }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── PRICING ── -->
    <div class="pricing-outer" id="pricing">
      <div class="pricing-inner">
        <div class="pricing-left">
          <div class="section-eyebrow">{{ pricing.eyebrow }}</div>
          <h2 class="section-h2" style="white-space: pre-line;">{{ pricing.headline }}</h2>
          <p class="section-sub">{{ pricing.subtext }}</p>

          <table class="compare-table" id="self-host">
            <thead>
              <tr>
                <th>What you get</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pricing.comparison" :key="row.label">
                <td>{{ row.label }}</td>
                <td :class="row.included ? 'check' : 'cross'">{{ row.included ? '✓' : '✗' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pricing-right">
          <div class="price-card">
            <div class="price-tier">{{ pricing.tier }}</div>
            <div class="price-amount">{{ pricing.price }}</div>
            <div class="price-cadence">{{ pricing.cadence }}</div>
            <hr class="price-divider">
            <ul class="price-list">
              <li v-for="item in pricing.items" :key="item" class="price-item">{{ item }}</li>
            </ul>
            <button class="price-cta" @click="waitlistOpen = true">{{ pricing.ctaLabel }}</button>
            <div class="price-footnote" style="white-space: pre-line;">{{ pricing.footnote }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── TERMINAL CTA ── -->
    <div class="terminal-cta">
      <div class="terminal-cta-inner">
        <div class="tcta-pre">{{ terminalCta.comment }}</div>
        <div class="tcta-cmd">{{ terminalCta.command }}<span class="cursor" aria-hidden="true"></span></div>
        <p class="tcta-sub">{{ terminalCta.subtext }}</p>
        <button class="cta-primary" @click="waitlistOpen = true">{{ terminalCta.ctaLabel }}</button>
      </div>
    </div>

    <AppFooter />

    <WaitlistModal :open="waitlistOpen" @close="waitlistOpen = false" />
  </div>
</template>

<style scoped>
/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 40px 80px;
  gap: 60px;
  max-width: 1320px;
  margin: 0 auto;
}

.hero-left {
  flex: 1;
  max-width: 560px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 28px;
}

.hero-eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: var(--green);
}

.hero-h1 {
  font-size: clamp(32px, 4.5vw, 58px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--text-0);
  margin-bottom: 24px;
}

.hero-h1 em {
  font-style: normal;
  color: var(--green);
}

.hero-sub {
  font-size: 14px;
  color: var(--text-1);
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 460px;
  font-weight: 400;
}

:deep(.hero-sub strong) {
  color: var(--text-0);
  font-weight: 500;
}

.hero-cta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  background: var(--green);
  color: #000;
  border: 2px solid var(--green);
  transition: all 0.15s;
  cursor: pointer;
}

.cta-primary:hover {
  background: #33ff88;
  border-color: #33ff88;
  text-decoration: none;
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  font-family: var(--font);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-1);
  border: 1px solid var(--border-2);
  transition: all 0.15s;
}

.cta-secondary:hover {
  color: var(--text-0);
  border-color: var(--text-1);
  text-decoration: none;
}

.hero-note {
  margin-top: 20px;
  font-size: 10px;
  color: var(--text-2);
  letter-spacing: 0.06em;
}

.hero-note span {
  color: var(--text-1);
}

.hero-right {
  flex: 1;
  max-width: 640px;
}

/* ── METRICS STRIP ── */
.metrics-strip {
  border-top: 1px solid var(--border-0);
  border-bottom: 1px solid var(--border-0);
  padding: 20px 40px;
  display: flex;
  align-items: stretch;
  overflow-x: auto;
}

.metric-item {
  flex: 1;
  min-width: 160px;
  padding: 0 40px;
  border-right: 1px solid var(--border-0);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-item:first-child { padding-left: 0; }
.metric-item:last-child  { border-right: none; }

.metric-val {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-0);
  letter-spacing: -0.01em;
}

.metric-val em {
  font-style: normal;
  color: var(--green);
}

.metric-label {
  font-size: 10px;
  color: var(--text-2);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ── FEATURES ── */
.features-outer {
  border-top: 1px solid var(--border-0);
  border-bottom: 1px solid var(--border-0);
}

.features-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 100px 40px;
}

.section-eyebrow {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-eyebrow::before {
  content: '';
  width: 16px;
  height: 1px;
  background: var(--green);
}

.section-h2 {
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-0);
  margin-bottom: 12px;
  line-height: 1.15;
}

.section-sub {
  font-size: 13px;
  color: var(--text-1);
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: 56px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border-0);
  border: 1px solid var(--border-0);
}

.feature-card {
  background: var(--bg-0);
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: background 0.15s;
}

.feature-card:hover {
  background: var(--bg-1);
}

/* scroll reveal */
.feature-card.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease, background 0.15s;
}

.feature-card.reveal.revealed {
  opacity: 1;
  transform: none;
}

.fc-icon {
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.fc-name {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--text-0);
}

.fc-desc {
  font-size: 12px;
  color: var(--text-1);
  line-height: 1.7;
  flex: 1;
}

:deep(.fc-desc .ticker-inline) {
  color: var(--green);
  font-weight: 600;
}

.fc-soon {
  display: inline-block;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  border: 1px dashed var(--border-1);
  padding: 4px 8px;
  margin-bottom: 8px;
}

.fc-tag {
  font-size: 9px;
  color: var(--text-2);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border-0);
}

/* ── PRICING ── */
.pricing-outer {
  background: var(--bg-1);
  border-top: 1px solid var(--border-0);
}

.pricing-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 100px 40px;
  display: flex;
  gap: 80px;
  align-items: flex-start;
}

.pricing-left { flex: 1; }

.pricing-right {
  width: 400px;
  flex-shrink: 0;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
}

.compare-table th {
  text-align: left;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-2);
  padding: 8px 0;
  border-bottom: 1px solid var(--border-1);
}

.compare-table td {
  padding: 10px 0;
  font-size: 12px;
  color: var(--text-1);
  border-bottom: 1px solid var(--border-0);
  vertical-align: top;
}

.compare-table td:last-child { text-align: right; }
.compare-table .check { color: var(--green); font-weight: 700; }
.compare-table .cross { color: var(--text-3); }

.price-card {
  border: 1px solid var(--border-1);
  background: var(--bg-0);
  padding: 40px;
}

.price-tier {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-tier::before {
  content: '';
  width: 12px;
  height: 1px;
  background: var(--green);
}

.price-amount {
  font-size: 52px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-0);
  line-height: 1;
  margin-bottom: 4px;
}

.price-amount sub {
  font-size: 20px;
  font-weight: 400;
  vertical-align: super;
  margin-right: 2px;
  color: var(--text-1);
}

.price-cadence {
  font-size: 12px;
  color: var(--text-2);
  margin-bottom: 32px;
  letter-spacing: 0.04em;
}

.price-divider {
  border: none;
  border-top: 1px solid var(--border-1);
  margin: 24px 0;
}

.price-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 32px;
  list-style: none;
}

.price-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  color: var(--text-1);
}

.price-item::before {
  content: '→';
  color: var(--green);
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 1px;
}

.price-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--green);
  color: #000;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;
}

.price-cta:hover {
  background: #33ff88;
  text-decoration: none;
}

.price-footnote {
  margin-top: 14px;
  font-size: 10px;
  color: var(--text-2);
  text-align: center;
  letter-spacing: 0.04em;
  line-height: 1.6;
}

/* ── TERMINAL CTA ── */
.terminal-cta {
  border-top: 1px solid var(--border-0);
  border-bottom: 1px solid var(--border-0);
  padding: 80px 40px;
  text-align: center;
}

.terminal-cta-inner {
  max-width: 600px;
  margin: 0 auto;
}

.tcta-pre {
  font-size: 11px;
  color: var(--text-2);
  letter-spacing: 0.08em;
  margin-bottom: 24px;
}

.tcta-cmd {
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 700;
  color: var(--text-0);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 1.1em;
  background: var(--green);
  vertical-align: text-bottom;
  animation: blink 1.1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.tcta-sub {
  font-size: 13px;
  color: var(--text-1);
  margin: 16px 0 36px;
  line-height: 1.7;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    padding: 80px 24px 60px;
  }

  .hero-right {
    max-width: 100%;
    width: 100%;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .pricing-inner {
    flex-direction: column;
  }

  .pricing-right {
    width: 100%;
  }

  .features-inner,
  .pricing-inner {
    padding: 60px 24px;
  }

  .metrics-strip {
    padding: 20px 24px;
  }

  .metric-item {
    min-width: 120px;
    padding: 0 20px;
  }

  .pricing-inner {
    gap: 40px;
  }

  .terminal-cta {
    padding: 56px 20px;
  }
}

@media (max-width: 600px) {
  .metrics-strip {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
  }

  .metric-item {
    min-width: 0;
    padding: 0 16px;
  }

  .metric-item:nth-child(odd) { padding-left: 0; }
  .metric-item:nth-child(2n) { border-right: none; }

  .metric-val {
    font-size: 22px;
  }

  .feature-card {
    padding: 24px 20px;
  }

  .price-card {
    padding: 24px 20px;
  }
}
</style>
