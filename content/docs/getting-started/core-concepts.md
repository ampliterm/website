---
title: Core Concepts
description: The mental model behind Ampliterm — strategies, deployments, trades, execution modes, and the single engine that runs them all.
section: Getting Started
sectionOrder: 0
order: 2
updatedAt: "July 8, 2026"
ogImage: "/og/docs-core-concepts-og.png"
---

## The big idea

Everything in Ampliterm follows from one design decision: **your trading logic is a real, inspectable object** — not a hunch, not a chart annotation, not a note to yourself. You define the logic once, and the exact same logic runs in three places:

- a **backtest**, replaying it against history
- the **nightly screener**, watching the market for it
- a **live session**, acting on it through your brokerage account

There is one engine underneath all three. What changes between them is only where the price data comes from and what happens when the logic says "enter" — a backtest simulates the fill, the screener just tells you, and a live session places a real order. Because the logic itself never changes, a strategy that behaves a certain way in a backtest behaves the same way when it's watching or trading the market. **What you test is what runs.**

## Strategy → Deployment → Trade

Three nouns carry most of the weight in Ampliterm. Get these and everything else falls into place.

### Strategy

A strategy is a reusable **template** of trading logic. It is deliberately not tied to any ticker — "breakout from consolidation on rising volume" is an idea about price behavior, not about one stock. A strategy defines:

- **A trigger** — the single event that starts the clock (say, price breaking above its 20-bar channel).
- **A confirmation tree** — supporting conditions that must line up around the trigger, combined with ALL/ANY logic, each with its own timing window ("volume spike within 2 bars", "uptrend held for the last 5 bars"). Confirmations don't have to land on the same bar as the trigger; the strategy stays *armed* and waits for them.
- **Bail-out guards** *(optional)* — invalidation conditions checked while the strategy is armed. If one breaks, the setup is abandoned and the strategy waits for a fresh trigger.
- **Exit logic** *(optional)* — a second condition tree that decides when to leave a position.
- **Risk rules** — stop-loss, take-profit, trailing stop, and time stop. When several could apply on the same bar, they resolve in a fixed order: stop-loss first, then take-profit, trailing stop, time stop, and finally the exit tree.
- **Position sizing** — all-in, a percentage of equity, a fixed dollar amount, or a fixed share count (fractional shares supported).
- **An AI confirmation gate** *(optional)* — right before an entry fires, an AI agent scores the setup 0–100 against recent price action; below your threshold, the entry is vetoed.
- **A timeframe** — the bar size the strategy thinks in (5-minute, 1-hour, 1-day, …). Timing windows are tuned to a timeframe, so the same idea on a different timeframe is a different strategy.

### Deployment

A deployment applies a strategy to a specific ticker. This is the consequential moment: **an active deployment trades.** The strategy stays a clean template; the deployment is the thing the engine actually runs, and the thing every resulting position and order is attributed to.

Deployments have three states: **active** (the engine evaluates it), **paused** (opens nothing new, but still manages exits for any position it already holds), and **retired** (done — a deployment can't be retired while it still holds an open position).

### Trade

Every position the engine opens or closes is recorded in your trade ledger — entry, exit, quantity, and realized profit or loss, attributed to the deployment that produced it. Open rows are your active positions; closed rows are your history. You never type a trade into this ledger; it is written exclusively by the engine, which is exactly what makes it a trustworthy record of how your strategies actually behave.

## Candles and the no-look-ahead rule

The engine consumes price data one **closed** candle at a time — a bar that is still forming is never evaluated. This sounds like a small detail, but it's the rule that keeps backtests honest: the engine can never act on information that wasn't knowable at the time, so a backtest can't accidentally cheat, and live behavior matches it.

The same discipline applies inside a strategy. Indicators are computed incrementally as each bar arrives, confirmations may resolve on bars *after* the trigger (that's what the timing windows are for), and an armed strategy simply waits — pending — until its confirmations are satisfied, fail, or run out of time.

## One engine, three contexts

| | Backtest | Screener | Live session |
|---|---|---|---|
| **When it runs** | On demand | Weeknights after the close | Every few minutes during market hours |
| **Price data** | Historical candles | End-of-day candles | Latest closed bars from your broker |
| **When logic fires** | Simulated fill, recorded in the backtest results | A screener hit — **triggered**, **alert**, or **warning** — plus an email digest | A sized order placed on your brokerage account |
| **How to use it** | Attach strategies to a Simulation | Toggle "Include in daily screen" on a strategy | Deploy a strategy onto a ticker |

The screener's three tiers map directly onto the engine's internal state: **triggered** means the full entry logic satisfied on the latest bar, **alert** means the trigger fired and confirmations are still pending, and **warning** means a setup is forming — a signal is converging but hasn't triggered yet.

## Execution modes

Live sessions run in one of three execution modes, and the progression is deliberately paper-first:

1. **Local paper** *(default)* — orders fill instantly inside your own instance at the engine's reference price. Clean, slippage-free results that line up with backtests. No orders ever leave your server.
2. **Alpaca paper** — real orders placed against your Alpaca paper account. Same engine, same order path as real trading, fake money. This is where you learn how your strategy behaves against a real broker — order handling, market hours, fills.
3. **Live** — real orders on your funded Alpaca account. This mode is locked behind explicit platform- and account-level safeguards that you must deliberately enable.

All three modes run the identical engine and order-handling code — only the destination of the order changes. Whatever you validate on paper holds when you move up a rung.

## Risk controls, layered

Automated trading deserves defense in depth, and Ampliterm applies it at four levels:

- **Per-strategy risk rules** — the stop-loss / take-profit / trailing / time stops you define on each strategy, enforced by the engine on every bar.
- **Broker-resting protective stop** — when a strategy has a stop-loss, a real stop order is also placed with the broker at entry. It protects you at market speed even between engine runs or if your server is down.
- **Portfolio risk governor** — account-wide caps you set once: maximum open positions, maximum notional per symbol and in total, and a **daily-loss kill switch** that halts new entries when your day's losses cross your limit.
- **The AI gate** *(optional, per strategy)* — a final pre-entry veto based on an AI read of current conditions.

## Glossary

| Term | Meaning |
|---|---|
| **Strategy** | A reusable, ticker-less template of entry/exit logic, risk rules, and sizing |
| **Deployment** | A strategy applied to a ticker; active deployments trade |
| **Trade** | An engine-recorded position in your ledger, open or closed |
| **Trigger** | The single event that arms a strategy |
| **Confirmation** | A supporting condition, with its own timing window, that must resolve before entry |
| **Guard ("bail out")** | An invalidation condition that abandons an armed setup |
| **Simulation** | A backtest run of one or more strategies over historical data |
| **Screener hit** | A strategy matching (or forming) on last night's close: triggered, alert, or warning |
| **Execution mode** | Where orders go: local paper, Alpaca paper, or live |

Nothing on this page is trading advice — Ampliterm executes *your* logic, and the [disclaimer](/docs/getting-started/overview#important-disclaimer-please-read) applies to everything it does.
