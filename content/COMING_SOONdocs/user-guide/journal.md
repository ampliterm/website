---
title: Journal
description: The Journal is your structured trade research layer. Every thesis, position, and outcome lives here — searchable, filterable, and linked to simulations.
section: User Guide
sectionOrder: 1
order: 0
badge: guide
updatedAt: "May 12, 2026"
---

## Creating entries

Press `N` or click **New Entry**. Every entry requires a ticker and a written thesis. All other fields are optional but strongly recommended for effective review.

### Entry fields

| Field | Type | Notes |
|-------|------|-------|
| `ticker` | string | Equity, ETF, options contract, crypto, or custom instrument |
| `direction` | enum | `LONG` · `SHORT` · `NEUTRAL` |
| `thesis` | markdown | Required. Your research rationale. Supports headings, lists, inline code, and `[[ticker]]` references |
| `entry_price` | number | Auto-filled from market data if left blank at time of save |
| `target_price` | number | Used to calculate R:R ratio automatically |
| `stop_price` | number | Used to calculate R:R ratio automatically |
| `tags` | string[] | Freeform. Recommended: strategy type, sector, catalyst |
| `timeframe` | enum | `intraday` · `swing` · `position` · `macro` |

## Review workflow

At position close, re-open the entry and click **Close Position**. Enter your actual exit price — Ampliterm calculates P&L, R realized, and updates your win-rate stats automatically.

> **Tip:** Use the **Weekly Review** view (`G R`) to see all entries from the past 7 days grouped by outcome. This is the fastest way to identify patterns in your trading.

## Templates

Save any entry as a template via the `···` menu → **Save as Template**. Templates pre-fill common fields for your recurring setups — for example, a momentum breakout template with your standard position sizing and tags pre-applied.
