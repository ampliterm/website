---
title: CLI Command Reference
description: Every Artisan console command Ampliterm ships — what each one does, its arguments and options, and whether it runs on a schedule or by hand.
section: Resources
sectionOrder: 3
order: 0
badge: api
updatedAt: "July 14, 2026"
ogImage: "/og/docs-cli-commands-og.png"
---

## Running commands

Because Ampliterm is self-hosted, it exposes a set of **Artisan console commands** — the operational surface for loading market data, building the ticker universe, running strategies, and keeping fundamentals current. You run them from the application shell:

```
php artisan <command> [arguments] [--options]
```

If you run Ampliterm under Docker, prefix them with an exec into the app container, e.g. `docker compose exec app php artisan at:init`.

Two things to know before you read the catalog:

- **Scheduled vs. manual.** Commands tagged *(scheduled)* already run automatically via the task scheduler — you don't need to invoke them by hand, and this page lists their cadence so you know when data refreshes. Commands tagged *(manual)* are run on demand: first-time setup, one-off backfills, or research and debugging. For the scheduler to fire the scheduled jobs, a single cron entry (`* * * * * php artisan schedule:run`) must be running, which the Docker image handles for you.
- **Arguments vs. options.** *Arguments* are positional (e.g. a ticker symbol); a `?` means optional. *Options* are the `--flag` and `--key=value` forms; defaults are shown in parentheses. Anything that reaches out to Alpaca or SEC EDGAR is rate-limited on your own credentials.

## Setup

### `at:init` *(manual)*
Initialize the Ampliterm application and create the first super-admin account. Run this once, right after installing. With no options it prompts interactively; pass the options to script an unattended install.

**Options:** `--name=` super admin name (skips the prompt) · `--email=` super admin email · `--password=` super admin password.

## Market data & price history

### `at:load-stock-prices` *(manual)*
Load minute-by-minute price bars for a single symbol from the Alpaca market-data API. Useful for pulling in a ticker you've just added, or reloading a specific date range.

**Arguments:** `symbol` **(required)** — the stock ticker, e.g. `AAPL`.
**Options:** `--from=` start date (`Y-m-d`) · `--to=` end date (`Y-m-d`). Omit both to load the default window.

### `at:sync-stock-prices-command` *(manual)*
Sync stock prices for every ticker in the system, one after another. A straightforward whole-universe refresh with no parameters — for scheduled bulk syncing, prefer the batched command below.

### `at:batch-sync-stock-prices` *(scheduled)*
Sync prices for all **active** tickers using batched Alpaca requests, which is far kinder to the rate limit than syncing symbol-by-symbol. Runs nightly at **11:00 PM CT**. No parameters.

### `at:extend-history` *(manual)*
Backward-fill minute-bar history: fetch older bars from a target depth up to each symbol's earliest stored bar. Use it to deepen history beyond what the initial load pulled.

**Arguments:** `symbol?` — one symbol to deepen; omit to deepen the whole universe.
**Options:** `--years=` target history depth in years (**5**), clamped to the configured minimum and maximum backfill depth.

## Asset universe

### `at:sync-asset-universe` *(scheduled)*
Sync the Alpaca asset catalog into the tickers table, applying your configured Data Universe filters. Picks up IPOs, delistings, and tradability changes. Runs **weekdays at 6:30 AM ET** in production. Production-only unless `--force` — a development machine only needs a handful of hand-added tickers, not the full catalog.

**Options:** `--dry-run` fetch and filter without persisting anything · `--force` run outside production.

### `at:universe-backfill` *(manual)*
The Data Universe initial setup, run once when standing up a fresh instance: sync the Alpaca asset catalog, fan out company-info lookups, then start the wave-dispatched price backfill across the universe. Production-only unless `--force`.

**Options:** `--wave-size=` symbols per backfill wave (**500**) · `--force` run outside production.

### `at:sync-ticker-metadata` *(manual)*
Sync ticker metadata — logo, company info, and the like. (This path is pending migration to SEC EDGAR as the source.)

**Arguments:** `symbol?` — a single ticker; omit to sync all tickers.
**Options:** `--unsynced` only sync tickers not synced yet · `--force` re-sync even if already synced.

## Corporate actions

### `ticker:sync-splits` *(scheduled)*
Sync stock splits from the Alpaca market-data API so historical prices stay split-adjusted. Runs nightly at **11:30 PM CT**.

**Arguments:** `symbol?` — a single ticker; omit to sync all active tickers.

### `ticker:sync-dividends` *(scheduled)*
Sync dividend events from the Alpaca market-data API. Runs nightly at **11:45 PM CT**.

**Arguments:** `symbol?` — a single ticker; omit to sync all active tickers.

## Fundamentals (SEC EDGAR)

### `at:edgar-sync` *(scheduled)*
Sync SEC EDGAR filings and extract XBRL fundamentals for all tickers. Runs every morning at **7:00 AM ET**, after EDGAR's overnight update. By default it does both filings and fundamentals; the flags narrow it to one or the other.

**Options:** `--ticker=` sync a single ticker symbol · `--fundamentals` only extract XBRL fundamentals (skip filing sync) · `--filings` only sync filings (skip fundamentals).

## Strategies

### `strategies:run-live` *(scheduled)*
Advance each deployed strategy's live paper-trading session by the latest closed candles — load the new bars, step the engine forward, persist the result. Runs **every 5 minutes**; because the feed only yields newly-closed bars, running more often than the bar period is cheap. No parameters.

### `strategies:screen` *(scheduled)*
Sync the universe's daily bars, then screen every ticker against your screener-enabled strategies and classify the latest bar (warning / alert / triggered). Observe-and-alert only — it never places orders. Runs **weekdays at 6:00 PM ET**, after the close.

**Options:** `--ticker=*` restrict the screen to these tickers (repeatable; for a manual spot-check) · `--dry-run` report the resolved universe and strategies without syncing or screening.

### `strategies:debug` *(manual)*
Replay a strategy over historical candles and explain its per-candle arm/confirm decisions — the tool for understanding *why* a strategy did or didn't fire.

**Arguments:** `strategy` **(required)** — strategy id or name · `ticker` **(required)** — the stock ticker.
**Options:** `--from=` start date (`Y-m-d`) · `--to=` end date (`Y-m-d`) · `--timeframe=` candle timeframe — minute, hour, day, week, month (**day**) · `--window=` minimum candles of warmup before evaluation starts (**50**) · `--all` show every evaluated candle, not just the interesting ones.

## Signal simulation

### `aj:simulate` *(manual)*
Simulate trading signals against historical price data for a single ticker — the research workbench for testing signal ideas and, optionally, prediction accuracy. Run it with `--list-signals` first to see what's available.

**Arguments:** `ticker` **(required)** — the stock ticker to simulate.
**Options:**

- `--signal=*` — signals to test, repeatable, e.g. `EmaCrossover:8,21` or `RsiOversold:30`
- `--from=` / `--to=` — start and end date (`Y-m-d`)
- `--timeframe=` — candle timeframe: minute, hour, day, week, month (**day**)
- `--window=` — minimum candles before signal analysis starts (**50**)
- `--triggers-only` — only show triggers, skip trade tracking
- `--with-predictions` — show predictions at each interval
- `--predictions-limit=` — max prediction intervals to display (**50**)
- `--converging-only` — only show intervals where convergence is detected
- `--analyze-accuracy` — analyze prediction accuracy against actual crossovers
- `--list-signals` — list all available signals and exit

## Predictions & journal

### `at:check-predictions` *(scheduled)*
Dispatch the job that resolves pending price predictions — grading logged predictions against what actually happened. Runs **weekdays at 11:15 PM CT**. No parameters.

### `journal:send-prompt` *(scheduled)*
Send the end-of-day journal-prompt email to users who've opted in. Runs **weekdays at 3:00 PM CT**, around the close. No parameters.
