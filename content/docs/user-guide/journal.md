---
title: Journal
description: Write the thesis down — markdown entries with trade parameters, AI summaries, and links to the tickers and backtests they're about.
section: User Guide
sectionOrder: 1
order: 8
badge: guide
updatedAt: "July 8, 2026"
ogImage: "/og/docs-journal-og.png"
---

## The memory layer

The engine gives your trading logic; the Journal gives it memory. It's where you write down *why* — the thesis behind a position, the read on a chart, the lesson from a trade that didn't work — in a form you can search, filter, and confront later. Strategies keep you honest about logic; the journal keeps you honest about judgment.

## Writing an entry

Entries are **markdown** — headings, lists, emphasis, whatever structure the thought needs. The editor watches as you type: mention a ticker symbol and it's detected and attached automatically, linking the entry to that ticker's page.

Around the text, an entry can carry the trade's parameters as structured fields: entry date, your **confidence**, entry / target / stop prices, position size and amount, the strategy it relates to, and **bias tags** — labels for the assumptions and biases in play, so you can later filter for "every time I wrote 'fear of missing out' in an entry" and see how those trades went. Attach chart screenshots or any other images alongside.

## Connected to everything else

Journal entries don't live in a vacuum:

- **Tickers** — entries attach to symbols (automatically via detection, or written straight from a [ticker page](/docs/user-guide/markets)) and appear on those pages.
- **Simulations** — attach entries to a [backtest](/docs/user-guide/simulations) to record what you concluded from a run before you tweak the strategy and lose the context.
- **Cortex** — the AI assistant can [search your journal](/docs/user-guide/cortex#what-cortex-can-actually-do), so "what did I say about this stock last quarter?" is a question you can literally ask.

## AI analysis

With AI configured on your instance, entries get an AI-generated **summary and sentiment read** — useful when an old entry is long and you just need the gist while scanning history. As everywhere in Ampliterm, it's a reading aid, not a judgment on your trade.

## Journal reminders

There's a **journal reminder** email (a notification preference, on by default, under Settings → Notifications) your instance can send at end of day — a nudge to write while the day's decisions are still fresh. The habit is the point: entries written the same day beat memories reconstructed a week later.
