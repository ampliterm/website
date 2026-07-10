---
title: Settings & API Tokens
description: Your profile, notification preferences, security sessions, and the API tokens that connect the browser extension.
section: User Guide
sectionOrder: 1
order: 11
badge: guide
updatedAt: "July 8, 2026"
ogImage: "/og/docs-account-settings-og.png"
---

## Two levels of settings

Ampliterm splits configuration by who it belongs to. Everything under **Settings** is yours — profile, notifications, risk controls, tokens. Instance-wide concerns — the broker connection, the AI provider, user management — live in the **Super Admin** console and are covered in [Connecting Alpaca](/docs/getting-started/connecting-alpaca). This page tours the user side.

## Profile

**Settings → Profile** holds your identity and preferences:

- **Identity** — display name, email, and password.
- **Display currency** — USD, EUR, or GBP for money formatting.
- **Split-adjusted prices** — whether historical prices display adjusted for stock splits. Adjusted charts read smoothly across a split; unadjusted shows the prices as they actually printed. Pick the lens you think in.
- **Prediction accuracy** — the tolerance that decides when a [price prediction](/docs/user-guide/predictions) counts as accurate. Set it once, honestly, and let the scoring do its work.

## Notifications

**Settings → Notifications** controls the channels (email and push) and then each event individually — all on by default:

| Event | When it fires |
|---|---|
| **Order Filled** | A buy or sell order executes |
| **Order Rejected** | The broker or a risk limit rejected an order |
| **Daily Loss Limit Reached** | Your kill switch tripped and entries are halted |
| **Screener Digest** | The [nightly screen](/docs/user-guide/screener#the-email-digest) finished with hits for you |
| **Journal Reminder** | The end-of-day nudge to write |
| **Prediction Result** | A prediction resolved — accurate or not |
| **Stock Split** | A split hit a ticker you care about |

The trading events deserve a moment's thought before you turn them off: an automated system that can't reach you when an order is rejected or your loss limit trips is quieter than you want it to be.

## System

**Settings → System** is your trading safety net — the portfolio risk caps, the daily-loss kill switch, and the paper-account reseed. It's covered in detail in [Connecting Alpaca](/docs/getting-started/connecting-alpaca#step-4-set-your-risk-controls) and [Deployments & Trades](/docs/user-guide/deployments-and-trades#your-paper-account).

## API Tokens

**Settings → API Tokens** issues personal access tokens for connecting things to your instance — today, chiefly the **browser extension** that [clips research into Intel](/docs/user-guide/intel-feed#capture-from-anywhere) from wherever you're reading.

Create a token with a recognizable name and copy it immediately — **it's shown exactly once**, then stored hashed like a password. Paste it into the extension and you're connected. Each integration should get its own named token, so revoking one (one click, instant) never breaks another. Since your instance is self-hosted, a token only grants access to *your* server — there's no third-party in the middle.

## Authentication & sessions

**Settings → Authentication** shows your active sessions and offers the big red button: **sign out everywhere**, revoking every session at once. If a device goes missing or something looks off, this plus a password change (in Profile) is the response.

## A note on the User Integrations card

You may also notice a **User Integrations** section in Settings for storing your own Alpaca credentials (with TradingView marked as coming soon). On current builds, the connection that actually powers market data and trading is the **instance-level** one configured in [Super Admin → Integrations](/docs/getting-started/connecting-alpaca#step-1-enter-your-api-keys) — set your keys there.
