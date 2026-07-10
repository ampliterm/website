---
title: Deployments & Trades
description: Deploy a strategy onto a ticker, let the engine trade it, and read the ledger it writes — plus every safety layer in between.
section: User Guide
sectionOrder: 1
order: 4
badge: guide
updatedAt: "July 8, 2026"
ogImage: "/og/docs-deployments-and-trades-og.png"
---

## From template to trading

A saved strategy watches nothing and trades nothing — it's a template. **Deploying** it onto a ticker is what puts it to work, and it's deliberately the consequential moment in Ampliterm: the deploy button lives on the strategy's page, and confirming it means exactly what the dialog says — while active, the deployment is checked every few minutes and *will* place trades on that ticker when its trigger and confirmations fire.

One strategy can be deployed to any number of tickers, and every position and order that results is attributed to its specific deployment — so your ledger always answers "which strategy, on which symbol, produced this trade."

## How a live session works

During market hours, the engine wakes every few minutes, pulls the newest **closed** candles for each deployed ticker from your broker, and advances each deployment's logic exactly as a backtest would — trigger, confirmations, guards, gate, fill. Two details worth understanding:

- **The strategy's own timeframe sets the pace.** The engine polls every few minutes, but a 1-hour strategy only has something to evaluate when a new hourly bar closes — most polls simply find nothing new. Forming bars are never evaluated, live or backtest alike.
- **State survives restarts.** An armed setup, an open position, a half-resolved confirmation window — all of it persists. A worker restart or a server reboot resumes the engine exactly where it left off.

## The deployment lifecycle

| Status | Meaning |
|---|---|
| **Active** | Evaluated every run — can open and close positions |
| **Paused** | Opens nothing new, but **still manages exits** for any position it already holds — pausing never strands an open position |
| **Retired** | Done. A deployment can't be retired while it still holds an open position |

While a deployment holds a position, the strategy's period and entry logic are [locked against edits](/docs/user-guide/strategy-builder#while-a-position-is-open) until the position closes.

## The Trades ledger

**Trades** in the main nav is the unified record of everything the engine has done across all your strategies and deployments: symbol, side, strategy, entry and exit dates and prices, shares, P&L in dollars and percent, holding time, and which engine (paper or live) filled it. Filter by status or result, or search by symbol.

You never type into this ledger — it's written exclusively by the engine as fills happen, which is what makes it a trustworthy record of how your strategies actually behave rather than how you remember them behaving.

The page header shows the effective execution mode (**Paper** or **Live money**) so there's never ambiguity about what current fills mean, and two banners appear only when they matter:

- **RISK** — your daily-loss kill switch has tripped; new entries are halted for the day.
- **ATTENTION** — reconciliation found positions recorded as open that the engine no longer holds. These *orphaned* rows are flagged, never silently closed — check your broker and resolve them deliberately.

## Orders, and the safety around them

When a deployment decides to enter, the order path applies several protections regardless of execution mode:

- **Sizing first.** The entry is sized by the strategy's [sizing policy](/docs/user-guide/strategy-builder#position-sizing) against real account balance — and the **portfolio risk governor** checks it against your caps (max open positions, per-symbol and total notional, daily loss) before anything is placed.
- **Orders can't duplicate.** Every order carries a deterministic ID, so a retry or restart can never accidentally place the same trade twice.
- **A protective stop rests at the broker.** If the strategy has a stop-loss, a real GTC stop order is placed with the broker at entry, calculated from the actual fill price. It protects you at market speed even between engine runs — or with your server switched off. (One edge: brokers can't attach resting stops to fractional-share entries; the engine still enforces the stop itself at candle close.)
- **Everything is audited.** Order placements, fills, and rejections are recorded in the audit log with the strategy owner as the actor.

## The market boundary — what live trading adds to the picture

Backtests end at the candle close; real markets have opening bells, gaps, and halts. The engine handles the boundary explicitly rather than pretending it isn't there:

- **Daily-bar exits ride the overnight gap.** A day candle closes after the market does, so an exit decided on that bar is placed immediately but fills at the **next open**. The overnight gap is real — this is the main honest difference from a backtest's close-price fill, and the broker-resting stop exists precisely to cap it.
- **Entries never queue blind.** An entry decided while the market is closed isn't left sitting as an order overnight — it's held by the engine and executed at the top of the next session, at the then-current price. If conditions gapped away from the setup, the risk governor and your guards still apply at that moment.
- **Time stops count candles, not clock time.** A trading halt or missing bars extends the hold in real time — deliberately, because the backtest counts the same way. Sim and live agree on what "10 bars" means.

## Your paper account

Local Paper mode runs against a real, persistent paper account on your instance: a seeded starting balance, with cash and equity derived from the actual fill history your strategies produce. It's crash-safe and consistent — replaying a candle can't double-count a fill. When you want a clean slate for a new round of testing, reseed it from **Settings → System**. (Open positions are marked at cost in the current version, so equity reflects what you paid rather than a live mark.)

## Going live

Real-money mode uses the identical engine, order path, sizing, governor, and ledger you've been exercising on paper — going live changes the destination of orders, nothing else. It requires [both keys turned](/docs/getting-started/connecting-alpaca#step-2-choose-an-execution-mode): Live selected as the execution mode *and* the server's master switch enabled.

Before you turn them, the paper ladder is the whole point: backtest until the logic does what you mean, run Local Paper until the results look like your backtests, run Alpaca Paper until you've seen real order handling across market opens, closes, and gaps — and only then decide, deliberately, with the [disclaimer](/docs/getting-started/overview#important-disclaimer-please-read) in mind. Automated trading with real money is a serious decision, and every trade the engine places is your instruction.
