---
title: Ampliterm Documentation
description: What Ampliterm is, how it connects to your brokerage account, and how these docs are organized.
section: Getting Started
sectionOrder: 0
order: 0
updatedAt: "July 8, 2026"
ogImage: "/og/docs-overview-og.png"
---

## What is Ampliterm?

**Ampliterm is the strategy layer your brokerage account is missing.**

Your broker already holds your money, streams your market data, and executes your orders. What it doesn't give you is a place to think: to define trading logic precisely, test it against history, watch the market for your setups, and act on them with discipline instead of emotion.

That's Ampliterm. You build strategies as explicit, inspectable logic — trigger conditions, confirmation rules, exits, invalidation guards, risk limits. Ampliterm backtests that logic, screens the market for it nightly, and when a deployed strategy fires, places the trade on your own brokerage account. **Alpaca is supported today. Interactive Brokers is planned.**

## Your broker, your data

Ampliterm doesn't resell market data or lock you into a proprietary feed. It uses the data entitlements you already have with your broker — if you trade on Alpaca, Ampliterm runs on Alpaca's market data under your own account. When new brokers are added, the same principle applies: your broker is both the data source and the execution venue.

This is a deliberate design decision. It keeps your costs down, keeps the data licensing clean, and means the prices your strategies are evaluated against are the same prices your orders fill against.

## Core modules

### Strategy Builder

Compose trading logic visually: a trigger condition, a tree of confirmation rules with timing windows, optional exit logic, and "bail out" guards that invalidate a setup before entry. Attach risk rules (stop-loss, take-profit, trailing stop, time stop), position sizing, and an optional AI confirmation gate. Strategies are reusable templates — you deploy them onto specific tickers when you're ready.

### Backtesting

Run any strategy against historical price data across timeframes and inspect every simulated trade, trigger, and statistic. Backtests run on the **same engine** that powers the screener and live execution — what you test is what runs.

### Screener

Every weekday evening, Ampliterm replays your screener-enabled strategies against end-of-day data across your universe and tiers the results: triggered, alert, or warning. Get an email digest, then jump straight from a hit into a pre-filled backtest.

### Automated trading

Deploy a strategy onto a ticker and the engine takes it from there — evaluating candles, entering and exiting positions, and recording every trade in a unified ledger. Execution is paper-first: simulated local fills or a real Alpaca paper account, with a portfolio risk governor and a daily-loss kill switch standing guard. Live execution on a funded account is gated behind explicit safeguards you opt into.

### Cortex

An AI research assistant built into the terminal. Cortex can evaluate indicators and signals on any ticker, and it knows your context — your open trades, journal entries, and deployments. Every response is analysis, never advice.

### Research suite

Ticker pages with server-computed indicators, SEC filings with AI summaries, and fundamentals; a markdown trading journal; an intel feed for clipping and analyzing research; and price predictions you can score yourself against over time.

## Self-hosted, on your terms

Ampliterm runs on your own server, distributed as Docker images through [SelfHost Pro](https://selfhostpro.com). You pull the image, run your instance, and your brokerage API keys never leave hardware you control. Updates ship the same way — pull and restart.

## How this documentation is organized

- **Getting Started** — what Ampliterm is, core concepts, setup, and keyboard reference
- **User Guide** — step-by-step guides for every feature in the terminal

## Important disclaimer — please read

Ampliterm is self-directed software. It is a tool you configure and control, not a source of financial guidance.

- **No investment advice.** Nothing in Ampliterm or this documentation — including strategy templates, signals, screener results, backtest output, indicators, and Cortex responses — constitutes investment, financial, legal, or tax advice, or a recommendation to buy, sell, or hold any security.
- **Not a broker or adviser.** Ampliterm is not a broker-dealer, investment adviser, or fiduciary. All trades are executed through your own brokerage account under your agreements with your broker.
- **You are responsible for your strategies.** Every strategy is authored, configured, and deployed by you. Automated orders placed by Ampliterm are carried out on your instructions, and you are solely responsible for their outcomes.
- **Backtests are hypothetical.** Simulated and historical performance has inherent limitations and does not guarantee future results. Markets change; past behavior of a strategy is not a promise of future behavior.
- **Automated trading carries additional risk.** Software defects, data errors, connectivity failures, and market gaps can produce losses larger than anticipated. Use paper trading to validate any strategy before considering live deployment.
- **Trading involves substantial risk of loss.** Only trade with capital you can afford to lose. If you are unsure whether trading or a particular strategy is appropriate for you, consult a licensed financial adviser.
