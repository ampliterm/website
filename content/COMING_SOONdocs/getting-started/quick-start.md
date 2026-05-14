---
title: Quick Start
description: Set up Ampliterm and log your first trade entry in under five minutes.
section: Getting Started
sectionOrder: 0
order: 1
updatedAt: "May 12, 2026"
---

## Step 1 — Deploy your instance

Ampliterm is self-hosted. Pull the latest release from GitHub and follow the deployment guide for your platform.

```bash
git clone https://github.com/your-org/ampliterm
cd ampliterm
cp .env.example .env
docker compose up -d
```

Open your browser at `http://localhost:3000` to confirm the instance is running.

## Step 2 — Create your first account

Navigate to your Ampliterm instance and click **Create Account** on the login screen. Set your username, password, and preferred timezone. These configure default display settings across the terminal.

## Step 3 — Log your first journal entry

Press `N` or click **New Entry** in the top-right of the Journal view.

1. **Set the ticker and direction** — Type the ticker symbol (e.g. `NVDA`) and select Long or Short. The terminal auto-populates current price and basic market data.
2. **Write your thesis** — Describe your reasoning. The thesis field supports Markdown. Be specific — entry trigger, price target, and invalidation level.
3. **Add tags and save** — Apply tags like `momentum`, `earnings-play`, or `macro`. Press `⌘S` or click **Save Entry**.

## Step 4 — Run your first simulation

From any journal entry, click **Run Simulation** to backtest the strategy hypothesis against historical data. Start with a short lookback window (90 days) and a single instrument. Widen the scope once you understand the output format.

## Next steps

- [Journal guide](/docs/user-guide/journal) — advanced entry features, templates, and the review workflow
- [Simulations guide](/docs/user-guide/simulations) — configuring parameters, reading results, comparing runs
- [API authentication](/docs/api-reference/authentication) — get your API key and make your first request
