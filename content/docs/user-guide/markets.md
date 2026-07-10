---
title: Markets
description: The research core — ticker pages with engine-grade indicators, SEC filings with AI summaries, fundamentals, and a straight line from research to deployment.
section: User Guide
sectionOrder: 1
order: 6
badge: guide
updatedAt: "July 8, 2026"
ogImage: "/og/docs-markets-og.png"
---

## The research core

**Markets** is where you study the stocks your strategies will trade. It's a browsable, filterable universe of tickers, each with a research page that pulls the whole picture into one place: price and indicators, fundamentals, SEC filings, your journal entries, your predictions — and a deploy button, because research that can't become action is just reading.

Browse and filter the list by watched status, sector, market cap, signal, or your own tags, sorted by market cap by default — or jump anywhere with the **⌘K** command palette by ticker or company name.

## Adding and watching tickers

Add a ticker and Ampliterm gets to work in the background: it backfills **five years of price history** from your broker's data and fetches the company profile. From then on prices stay synced incrementally.

**Watching** a ticker is a one-click toggle with real consequences: your watchlist is a filter on the Markets list, and it defines your [screener universe](/docs/user-guide/screener#what-gets-screened) — watch a stock and your screener-enabled strategies start evaluating it every night.

## The ticker page

### The chart

The price chart supports multiple timeframes with a full indicator suite: SMA 20/50/200, Bollinger Bands, EMA 12/26, RSI, MACD, ATR, relative volume, and session VWAP on intraday timeframes. One detail worth knowing: **every indicator value is computed server-side by the same code the trading engine uses** — not re-derived in your browser by a charting library. The RSI you see on the chart is the RSI your strategy would have traded on. Corporate actions are handled too: splits and dividends sync automatically, with split-adjusted views.

### Key stats and fundamentals

Alongside the chart: key statistics and a fundamentals section built from **SEC XBRL data** — the structured figures companies file with the SEC, synced daily. Revenue, earnings, and balance-sheet trends come from the primary source, not a third-party aggregator. The full story of the EDGAR pipeline — what's pulled, how it's standardized, and the provenance behind every number — is on the [Fundamentals & Filings](/docs/user-guide/fundamentals) page.

### SEC filings, with AI summaries

The filings list tracks the company's EDGAR filings (10-Ks, 10-Qs, 8-Ks, and the rest) as they're published. When AI is configured on your instance, each filing gets an **AI-generated summary with a sentiment read** — bullish, bearish, or neutral — so you can triage a dense filing in seconds and decide whether it deserves a real read. As with everything [Cortex](/docs/user-guide/cortex)-adjacent: it's analysis to prioritize your attention, not a signal to act on.

### Your layer on top

The rest of the page is yours: [journal entries](/docs/user-guide/journal) attached to the ticker (write one right from the page), your [price predictions](/docs/user-guide/predictions) with their track record, and freeform **tags** for organizing the universe your way — tags become filters on the Markets list.

## From research to action

The ticker page closes the loop with the **Apply Strategy** panel: pick any of your built strategies and deploy it to this ticker on the spot. It's the same [consequential action](/docs/user-guide/deployments-and-trades#from-template-to-trading) as deploying from the strategy page — the panel shows your execution mode and buying power, and the confirmation says plainly that an active deployment will place trades.

That's the intended rhythm of Markets: study the chart, check what the filings and fundamentals actually say, write down your thesis, and when a strategy fits the setup — deploy it, on the page where you did the work.
