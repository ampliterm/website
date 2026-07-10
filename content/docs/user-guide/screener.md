---
title: Screener
description: The nightly strategy screen — which of your setups fired today, which are waiting on confirmation, and which are forming.
section: User Guide
sectionOrder: 1
order: 3
badge: guide
updatedAt: "July 8, 2026"
ogImage: "/og/docs-screener-og.png"
---

## Your strategies, watching the close

Every weekday evening after the market closes, Ampliterm replays your screener-enabled strategies against the day's closing prices across your universe of tickers, and tells you which setups **fired**, which are **waiting on confirmation**, and which are **forming**. Results land on the Screener page and in an email digest.

The screener places **no orders** and touches no positions — it's pure observe-and-alert, and the lowest-risk way to use the trading engine. It runs on the [same engine](/docs/getting-started/core-concepts#one-engine-three-contexts) as your backtests and live sessions, so a screener hit means your actual strategy logic matched, not some simplified approximation of it.

## What gets screened

Nothing is screened implicitly — you opt in per strategy:

- **The strategies:** enter-type strategies with the **"Include in daily screen"** toggle on in the [Strategy Builder](/docs/user-guide/strategy-builder#include-in-daily-screen).
- **The tickers:** your watchlisted tickers plus any ticker you have an active deployment on. Your strategies are only evaluated against tickers relevant to *you*.
- **The candles:** the screen always runs on daily bars. Strategy timing windows are measured in bars, so a strategy tuned to another period still screens — its windows are just read as day-counts (the builder nudges you about this when you opt in a non-daily strategy).

## The three tiers

Each strategy × ticker pair is classified by the state of the most recent daily bar — one hit, highest tier wins:

| Tier | Plain meaning |
|---|---|
| **TRIGGERED** | It happened today — the trigger fired *and* every confirmation was satisfied on the latest bar. If this were a live deployment, this is the bar it would have entered on. |
| **ALERT** | The trigger fired and the strategy is armed, but some confirmations are still gathering within their timing windows. Worth a look tonight — it may confirm in the coming days. |
| **WARNING** | Nothing has fired, but a signal your strategy uses is measurably converging toward its trigger — the setup is forming. |

Every hit expands in place to show its work. Triggered and alert hits show a **checks** panel — each condition in your logic, met or pending, with current readings and the window countdown. Warnings show a **convergence** table — the signal's current value, the level it triggers at, and the slope, with a note like *"EMA Crossover converging toward a buy trigger — est. ~2 bars."*

Hits also carry a streak badge: **NEW** the first night, **DAY-N** as the same setup persists across runs — so you can tell tonight's fresh setup from the one you've been watching all week.

## A note on warnings

The WARNING tier is powered by prediction-capable signals — crossovers and convergence-style conditions (Moving Average Cross, MACD, Channel Breakout, VWAP Cross, Volatility Squeeze) that can measure how close they are to firing. Pure pattern signals (Hammer, Engulfing, Shooting Star) fire or they don't — there's no "almost a hammer." A strategy built only on patterns will produce triggered and alert hits, but never warnings. If you want early notice, include at least one prediction-capable condition in the entry logic.

## The email digest

When a run completes, users with hits get a digest email — triggered first, then alerts, then warnings, each with its streak badge, one-line note, and links back to the ticker and strategy. The digest is on by default and controlled per-user under **Settings → Notifications** (the *screener digest* event).

To keep the email worth opening, there's built-in noise control: a warning that hasn't changed in 5 consecutive runs is dropped from the email (a footer counts what was omitted), and if stale warnings are all you have, no email is sent at all. Triggered and alert hits are never suppressed — and the Screener page always shows everything.

## The Screener page

**Screener** in the main nav shows recent runs as a strip of date chips with your per-tier counts, a summary band, and the night's hits grouped by tier with a strategy filter. Everything is scoped to your own strategies, and the page is read-only.

Each hit carries a **▶ Backtest** deep-link that opens a new simulation with the strategy and ticker already attached — so the natural next move after "it triggered last night" is one click: [see how it would have done historically](/docs/user-guide/simulations), then decide with data whether it deserves a deployment.

## Where the screener fits

Think of the tiers as a funnel that matches the trading workflow: **warnings** tell you what to research, **alerts** tell you what to watch this week, and **triggered** hits tell you what your logic would have acted on today. Many users run strategies in the screener for weeks — validating that the setups it surfaces are ones they'd actually want — before ever deploying one to trade.
