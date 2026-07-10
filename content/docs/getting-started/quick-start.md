---
title: Quick Start
description: Stand up your Ampliterm instance, connect Alpaca, and take a strategy from built to deployed.
section: Getting Started
sectionOrder: 0
order: 1
updatedAt: "July 9, 2026"
ogImage: "/og/docs-quick-start-og.png"
---

## What you'll need

- A server with **Docker** (and Docker Compose) — Ampliterm runs as a small container stack
- An **Ampliterm license from [SelfHost Pro](https://selfhostpro.com)** — that's where the images and compose bundle come from
- A **domain name** pointed at your server — the stack terminates HTTPS itself with automatic Let's Encrypt certificates
- An **Alpaca account** with API keys (paper keys are enough to start — see [Connecting Alpaca](/docs/getting-started/connecting-alpaca))

## Step 1 — Install the stack

Grab the Ampliterm compose bundle through your SelfHost Pro license and follow the install instructions that come with it. The Ampliterm-specific configuration lives in `.env` — most importantly your **domain** (used for routing and the HTTPS certificate) and the **certificate email** for Let's Encrypt.

Then bring it up:

```bash
docker compose up -d
```

That one stack is everything Ampliterm needs: the app itself, a scheduler (which runs the nightly screener and data syncs), a queue worker, a websocket server, the time-series database, and the search engine — behind a proxy that provisions and renews HTTPS automatically. There's nothing to install on the host beyond Docker, and database migrations run automatically as the app container boots.

## Step 2 — Initialize

One command sets up the application and your admin account:

```bash
docker compose exec php php artisan at:init
```

It generates the application key, confirms migrations, and walks you through creating the **super admin** — the account that administers the instance. Then open `https://your-domain` and sign in.

## Step 3 — Connect Alpaca

Head to **Super Admin → Integrations** and set up the Alpaca connection: paper API keys, execution mode (leave it on **Local Paper** for now), and your market data plan. This single connection powers both market data and trade execution — the full walkthrough, including what each mode means, is in [Connecting Alpaca](/docs/getting-started/connecting-alpaca).

While you're there: if you want [Cortex](/docs/user-guide/cortex), the AI assistant, add an AI provider key under the same Integrations page. It's optional — everything else works without it.

## Step 4 — Add tickers and start watching

Open **Markets** and add the tickers you actually trade. Each one backfills five years of price history in the background. **Watch** the ones you care about — your watchlist is what the nightly screener will sweep.

## Step 5 — Build, test, deploy

Now the real loop, with each step one click from the last:

1. **Build a strategy** in [the Strategy Builder](/docs/user-guide/strategy-builder) — start from the *Consolidation Breakout* template if you want a working example to dissect.
2. **Backtest it** with a [Simulation](/docs/user-guide/simulations) and read what it actually did — the trades *and* the triggers that didn't survive confirmation.
3. **Turn on the daily screen** so the [screener](/docs/user-guide/screener) watches your whole watchlist for the setup every night and emails you the hits.
4. When you trust it, **deploy it** to a ticker in Local Paper mode and watch real engine behavior appear in your [Trades ledger](/docs/user-guide/deployments-and-trades) — with zero risk.

That's the intended shape of Ampliterm: logic first, evidence second, deployment last. Take your time on each rung — the [paper-first ladder](/docs/getting-started/core-concepts#execution-modes) exists so that by the time real money is involved, nothing about your strategy's behavior is a surprise.

## Updating

Updates ship through SelfHost Pro the same way the install did: pull the new image and `docker compose up -d` again. Migrations run automatically on boot.
