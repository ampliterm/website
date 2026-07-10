---
title: Strategy Builder
description: Build trading logic as an explicit trigger → confirm flow, with exits, bail-out guards, risk rules, sizing, and an optional AI gate.
section: User Guide
sectionOrder: 1
order: 0
badge: guide
updatedAt: "July 8, 2026"
ogImage: "/og/docs-strategy-builder-og.png"
---

## What you're building

The Strategy Builder is where a trading idea becomes explicit, testable logic. Instead of "buy breakouts when volume looks good," you end up with something the engine can execute and you can audit: *price closes above the 20-bar high; volume printed at least 1.5× average within 2 bars; the trend held; enter long, stop 5%, target 12%.*

Every strategy follows the same flow: a **trigger** starts the clock, **confirmations** must line up around it, and an **action** fires when they do — wrapped in risk rules, sizing, and optional guards. If the concepts are new, read [Core Concepts](/docs/getting-started/core-concepts) first; this page is the hands-on tour.

Create a strategy from **Strategies → New Strategy**. You can start from scratch or from a **template** — one-click starting points like *Consolidation Breakout* (a Cup & Handle-style recipe: close above the 20-bar high, on a volume spike, in an uptrend, out of a volatility squeeze, with a 5% stop and 12% target). Templates are just pre-filled builder state; nothing saves until you save.

## Name, type, and timeframe

At the top you set the strategy's name, its type — **enter** (opens positions) or **sell** (a standalone exit strategy) — and its **candle period**: `5min`, `15min`, `1hour`, `1day`, or `1week`. The period is the bar size every part of the strategy thinks in. Timing windows are counted in these candles, so the same logic on a different period is genuinely a different strategy — pick the timeframe you actually trade.

## Step 1 — Trigger

The trigger is a single condition: the event that arms the strategy and anchors every timing window. Choose something that marks a moment — a breakout, a cross, a pattern — rather than a state. When the trigger fires, the strategy arms and starts watching for its confirmations.

## Step 2 — Confirm

Confirmations are the conditions that must line up around the trigger before the strategy acts. They live in a tree of **ALL / ANY** groups, and groups nest — "ALL of: volume elevated, AND ANY of: MACD bullish cross OR RSI recovering" is three cards and two groups.

Every confirmation carries its own **timing window** relative to the trigger:

- **At the trigger** — must be true on the trigger candle itself
- **Within prior N** — must have occurred in the N candles *before* the trigger
- **Within next N** — may arrive in the N candles *after* the trigger
- **Within ±N** — either side

And an **aggregation**: **occur once** (it happened somewhere in the window) or **hold throughout** (it stayed true for the whole window). The default is *occurred within the prior 10 candles*.

Lookahead windows are what make the builder feel like real trading: the trigger fires, and the strategy waits — armed — for follow-through to arrive. If a confirmation's window closes without it, the arm clears and the strategy waits for a fresh trigger. Nothing is ever evaluated with hindsight.

## Bail Out — invalidation guards

The amber **Bail Out** slot answers a different question than the confirm tree. Confirm asks *"when do I enter?"* — Bail Out asks *"when do I stop waiting?"*

Guards are **state** conditions (currently *MA Trend* and *Relative Volume*) checked on every candle while the strategy is armed. The moment one breaks — the trend flips, volume dries up — the setup is abandoned immediately, even if the confirmations still had time left. Event conditions (crosses, spikes, patterns) can't be guards, because an event can't "stay" true.

Without a guard, the alternative is awkward: a "trend must hold throughout" confirmation delays your entry until its whole window closes. A guard lets you enter as soon as confirmations pass, while still bailing the instant the premise dies.

## Step 3 — Action

What happens when everything passes. An **enter** strategy opens a **long position** on the deployed symbol; a **sell** strategy exits or reduces the held position. (Short entries aren't supported.)

## Risk rules

Four optional rules, enforced by the engine on every candle once a position is open:

| Rule | What it does |
|---|---|
| **Stop loss %** | Exit if price falls this far below entry. Also places a real resting stop order with the broker at entry, covering you between engine runs. |
| **Take profit %** | Exit at this gain |
| **Trailing stop %** | Exit if price falls this far from its high-water mark since entry |
| **Time stop** | Exit after this many bars, win or lose. Counted in candles, not wall-clock time. |

When more than one could fire on the same candle they resolve in a fixed order — stop loss, take profit, trailing stop, time stop, and only then your exit plan.

## AI Confirmation Gate

An optional last check before entry: an AI agent reviews the fully-confirmed setup against recent candles and scores it 0–100. Below your **minimum confidence** (default 60), the entry is vetoed and the strategy stands down; the verdict is recorded either way. You control how many recent candles it reads (default 30). If AI is unavailable, the gate **fails open** by default — the entry proceeds normally rather than silently blocking your strategy.

The gate is a filter on *your* logic, not a signal source — it can only veto entries your conditions produced, never create them. Its output is analysis, not advice.

## Position sizing

How much each entry buys, per strategy:

- **All-in** *(default)* — the full available balance
- **Percent of equity** — a fixed percentage of account equity
- **Fixed notional** — the same dollar amount every time
- **Fixed shares** — the same share count every time

Sizing supports fractional shares, so a percent-of-equity strategy sizes precisely on any account balance. Whatever the strategy asks for, the [portfolio risk governor](/docs/getting-started/core-concepts#risk-controls-layered) still has the final word.

## Step 4 — Exit Plan

Optionally, a second trigger → confirm tree that decides when to *leave* the position — the same building blocks, pointed at the exit. A strategy with no exit plan relies on its risk rules alone.

One subtlety worth knowing: the exit plan is **frozen into each position at entry**. Editing a strategy later changes future entries, but a position that's already open keeps the exit logic it was opened with.

## Include in daily screen

A toggle that opts the strategy into the [nightly screener](/docs/getting-started/core-concepts#one-engine-three-contexts). The screener evaluates daily candles, so it's a natural fit for `1day` strategies — pick another period and the builder nudges you (your timing windows would be read as day-counts), but it will still run if you want it to.

## While a position is open

If a deployed strategy currently holds a position, its candle period and trigger/confirm logic are **locked** until the position closes — the position was opened on that logic, and changing it mid-flight would make the ledger unauditable. Guards and screener settings stay editable.

## After you save

A saved strategy is a template — it doesn't watch anything yet. From here you can:

- **Backtest it** — attach it to a Simulation and see every trade it would have made
- **Screen for it** — enable the daily screen toggle and let the market come to you
- **Deploy it** — bind it to a ticker and let it trade (this is the consequential step)
- **Debug it** — replay it over history and inspect a per-candle timeline of exactly when it armed, which confirmations were pending, and why it did or didn't enter

The full list of available conditions — every trigger and confirmation you can build with, and their parameters — is on the next page: [Condition Catalog](/docs/user-guide/condition-catalog).
