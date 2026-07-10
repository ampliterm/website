---
title: Backtesting
description: Replay your strategies against history and inspect every trade, trigger, and statistic they would have produced.
section: User Guide
sectionOrder: 1
order: 2
badge: guide
updatedAt: "July 8, 2026"
ogImage: "/og/docs-simulations-og.png"
---

## What a simulation is

A **Simulation** is Ampliterm's backtest: your saved strategies replayed against historical candles, bar by bar, through the [same engine](/docs/getting-started/core-concepts#one-engine-three-contexts) that screens the market nightly and trades live. Nothing is approximated into an equity formula — the engine actually arms on triggers, waits for confirmations, respects guards, applies risk rules, and books simulated fills, exactly as it would in a live session. The output is a full record of every decision.

Results are computed when you create the simulation and you land straight on them — no queue to wait on.

## Creating a simulation

From **Simulate → New Simulation**, the setup takes a name (optional), a **ticker**, a **timeframe** (minute, hour, day, week, or month candles), a **date range**, and a **window size** — how many candles of context the engine carries as it walks forward (default 50, up to 500; indicators like a 200-bar moving average need a window at least that deep).

Then pick what to test — at least one of:

- **Trading strategies** — your saved strategies. These drive the actual trades. If a strategy is tuned to a different candle period than the simulation runs, the builder warns you: its timing windows will be counted in the simulation's bars and mean something different than intended.
- **Trading signals** — individual signals from the catalog, as a **display overlay**. These don't trade; they mark every trigger on the chart, which is a fast way to eyeball a signal's behavior on a ticker before you build a strategy around it. For signals that support it, you can also include **predictions** — the forward-looking "this setup is converging" estimates.

Two switches change the run's character:

- **Triggers Only** skips trading entirely and just records where signals fired. It's the quick-look mode — note that attached strategies won't run in it.
- **Apply AI Confirmation Gate** honors the [AI gate](/docs/user-guide/strategy-builder#ai-confirmation-gate) of any attached strategy that has one, calling the AI at each would-be entry (one call per trade, not per candle). By default backtests make **no** AI calls — the gate is skipped so runs are free and perfectly reproducible. Turning it on costs tokens and makes results slightly non-deterministic, since AI verdicts can vary between runs. Use it when you specifically want to measure what the gate adds.

## Reading the results

The results page opens with the headline stats: **win rate**, **total trades**, **wins/losses**, **total P&L** (dollars and percent), **total triggers**, and **total candles** evaluated. Below that:

- **The chart** — price with your triggers and trades annotated in context.
- **Trades table** — every position the strategies opened: entry, exit, duration, and per-trade P&L, including *why* the exit happened (stop, target, time stop, or exit logic).
- **Triggers table** — every signal firing, including ones that never became trades because confirmations failed or windows expired.

That last distinction is where backtests earn their keep: seeing how many triggers *didn't* survive your confirmations tells you as much about a strategy as the trades that did.

You can also attach [journal entries](/docs/user-guide/journal) to a simulation — useful for writing down what you concluded before you tweak the strategy and run it again.

## What a backtest deliberately doesn't model

Honesty matters more than flattering numbers, so know what the simulated fills assume:

- **Fills happen at candle close.** Real intrabar prices — and the overnight gap on daily bars — aren't modeled.
- **Except stops, which are pessimistic.** When price gaps through a stop-loss, the simulation fills you at the worse of the open or your stop level — a backtest should under-promise on stops rather than flatter them.
- **Position sizing isn't applied.** Backtest results are per-trade P&L — effectively each trade in isolation — so sizing policies and account balance don't shape them. Sizing takes effect in paper and live trading.
- **No commission or slippage parameters.** Fills are clean by design, matching Local Paper mode, so backtest → paper comparisons are apples to apples.

Backtest performance is hypothetical by definition — see the [disclaimer](/docs/getting-started/overview#important-disclaimer-please-read). The point of a simulation isn't to promise future returns; it's to find out whether your logic does what you meant, and to kill bad ideas cheaply.

## Where backtests fit in the workflow

A tight loop looks like this: build a strategy → simulate it over a meaningful stretch of history → read the trades *and* the near-misses → refine → repeat. When results hold up, climb the ladder: enable the daily screen to watch the whole market for the setup, run it on paper, and only then consider deploying it further.

The screener closes this loop from the other end: every hit on the [Screener](/docs/getting-started/core-concepts#one-engine-three-contexts) page deep-links to a pre-filled simulation — the strategy and ticker already attached — so "it triggered last night" to "here's how it would have done historically" is one click.
