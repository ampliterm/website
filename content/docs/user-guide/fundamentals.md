---
title: Fundamentals & Filings
description: Company financials pulled straight from SEC EDGAR — standardized XBRL metrics with full filing provenance, synced daily.
section: User Guide
sectionOrder: 1
order: 7
badge: guide
updatedAt: "July 9, 2026"
ogImage: "/og/docs-fundamentals-og.png"
---

## Straight from the source

Every fundamental number in Ampliterm comes from **SEC EDGAR** — the filings public companies are legally required to submit to sec.gov. Not a data vendor's repackaging of them, not an aggregator's estimate: the structured **XBRL** figures from the filings themselves, synced to your instance daily.

That's a deliberate choice with real consequences. The data is authoritative (it's what the company signed its name to), it's free (no fundamental-data subscription stacked on top of your license), and it's traceable — every value in Ampliterm carries its provenance.

## What gets pulled

Each weekday morning, before the market opens, your instance syncs two things for every ticker you track:

- **Filings** — 10-Ks, 10-Qs, 8-Ks and the rest, as they land on EDGAR. These power the filings list on each [ticker page](/docs/user-guide/markets), including the AI summaries and sentiment reads.
- **Financial facts** — the XBRL company facts, standardized into a consistent set of metrics across the income statement (revenue, gross profit, operating income, net income, basic and diluted EPS, R&D, operating expenses), balance sheet (assets, liabilities, cash and equivalents, goodwill and intangibles), and cash flow (operating cash flow, capital expenditure) — plus sector-specific metrics where they apply, like net interest income and credit-loss provisions for banks, or premiums earned and policyholder claims for insurers.

Standardizing XBRL is messier than it sounds — companies tag the same concept differently across eras and industries — and Ampliterm resolves that with a priority-ordered concept map, so "revenue" means the same thing across your whole universe. One subtle correctness detail: quarterly filings report both the three-month figure and the year-to-date cumulative for the same end date; Ampliterm extracts the true quarterly slice, so quarter-over-quarter comparisons aren't polluted by cumulative values.

## Every number has a receipt

Each metric value is stored with its fiscal year and period, the form type it came from, the filing date, and the SEC accession number. When a chart shows a revenue step you don't believe, you can trace it to the exact filing that reported it — and read that filing's AI summary while you're there.

## Where you'll see it

On a ticker's **fundamentals view**: financial-statement tables and trend charts across fiscal periods, alongside the key stats. It's designed for the questions that precede a trade — is revenue actually growing, what happened to margins after that guidance cut, is the cash position what the narrative claims — answered from primary-source data on your own server.

## The polite-guest footnote

SEC EDGAR is a free public resource with fair-access rules, and Ampliterm is deliberately a polite guest: all EDGAR requests are rate-limited well inside sec.gov's published policy. The daily sync spreads its work accordingly — fundamentals arrive on a schedule, not on demand, which is exactly the right trade for data that changes quarterly.
