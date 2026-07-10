---
title: Connecting Alpaca
description: Add your Alpaca API keys, choose an execution mode and data plan, and set your risk controls.
section: Getting Started
sectionOrder: 0
order: 3
updatedAt: "July 8, 2026"
ogImage: "/og/docs-connecting-alpaca-og.png"
---

## One connection, two jobs

Connecting Alpaca powers both halves of Ampliterm: **market data** (price history, live bars, corporate actions — the data your strategies are evaluated against) and **trade execution** (the orders placed when a deployed strategy fires). This is the "your broker, your data" principle in practice — one connection, and the prices your logic sees are the prices your orders fill against.

Because Ampliterm is self-hosted, connecting a broker is an instance-owner task: the account that installs Ampliterm holds the **Super Admin** role, and the broker connection lives in the Super Admin console. Your keys are stored encrypted on your own server and never leave it.

## Before you start

You'll need an Alpaca account and API keys, generated from your Alpaca dashboard. Two things to know:

- **Paper and live are separate key pairs.** Alpaca issues distinct credentials for its paper-trading environment and for your funded account.
- **Paper keys are enough for almost everything.** Market data, backtesting, the screener, and both paper execution modes all run on your paper key pair. You only need live keys for real-money trading.

## Step 1 — Enter your API keys

Go to **Super Admin → Integrations** and find the **Alpaca** section:

1. Enter your **Paper API Key** and **Paper API Secret**.
2. Optionally enter your **Live API Key** and **Live API Secret** (you can add these later — they're only used in Live mode).
3. Flip the **Enabled** toggle on and save.

Keys are write-only: once saved, Ampliterm shows only that a key is present, never the key itself. To rotate a key, just enter the new one over it. Keys are encrypted at rest, and every change to the integration is recorded in the audit log.

## Step 2 — Choose an execution mode

The **Execution Mode** selector decides where orders go when a deployed strategy fires. The engine is identical in all three — only the destination changes. (These are the same modes described in [Core Concepts](/docs/getting-started/core-concepts#execution-modes).)

| Mode | What happens on a fill | Good for |
|---|---|---|
| **Local Paper** *(default)* | Orders fill instantly inside your instance at the engine's reference price | Clean, slippage-free validation that lines up with backtests |
| **Alpaca Paper** | Real orders placed on Alpaca's paper environment | Learning how your strategy behaves against a real broker — order handling, market hours, fills |
| **Live** | Real orders on your funded Alpaca account | Real trading, after you've validated on paper |

Live mode has one extra lock: a **master switch** on the server itself (the `ALPACA_LIVE_TRADING_ENABLED` environment variable). If you select Live without the master switch on, Ampliterm deliberately falls back to Local Paper rather than guessing — real money requires turning two keys.

We recommend climbing the ladder in order: validate a strategy in backtests, run it on Local Paper, promote it to Alpaca Paper, and only then consider Live.

## Step 3 — Pick your market data plan

The **Market Data Plan** setting tells Ampliterm which Alpaca data subscription your keys carry:

- **Basic** — Alpaca's default data tier. Ampliterm still receives the full consolidated (SIP) tape — real volume from all exchanges — on a 15-minute delay.
- **Algo Trader Plus** — Alpaca's upgraded tier: the same consolidated tape with no delay, and much higher API rate limits (up to 10,000 requests per minute).

Match this setting to what your Alpaca account actually has — it controls how fast and how recently Ampliterm can pull data. On Basic, strategies simply evaluate bars 15 minutes behind the market; for end-of-day workflows like the screener, the delay doesn't matter at all.

## Step 4 — Set your risk controls

Each user sets their own trading limits under **Settings → System**. These are the account-wide caps enforced by the portfolio risk governor on every entry, regardless of what any individual strategy says:

- **Daily loss limit** with a **halt-on-loss toggle** — the kill switch. When the day's realized losses cross your limit, new entries stop.
- **Max position size** and **max open positions**
- **Max notional per symbol** and **max total notional**

Changes to risk controls are audited. The same page shows your **paper trading account** — its seeded starting balance and fill history — with a reseed option to reset it for a fresh round of testing (Local Paper mode only).

## That's it

With keys saved and the integration enabled, Ampliterm starts pulling market data as you add tickers, and your strategies have somewhere to trade. Head to the Strategy Builder next — or start in Markets and get a feel for the research side first.
