---
title: SEC Filings. Direct From The Source
excerpt: "Every financial metric you need to build a fundamental thesis is buried in SEC EDGAR — in standardized XBRL format, publicly accessible, completely free. The problem is extracting it accurately and getting it into a form that's useful for analysis. Ampliterm handles the full pipeline: automatic filing sync, structured XBRL extraction, AI analysis tuned for regulatory documents, and a fundamentals view that puts twenty quarters of clean data in front of you without any manual effort."
date: "2026-05-25"
author:
  name: "Dan Pastori"
  initials: DP
  role: Founder & Lead Developer
  bio: Dan built Ampliterm to help understand market cycles and trading strategies that actually work. Software developer by trade, but passionate about big data and stock trading, Ampliterm is the culmination of these two passions. It's a tool to meet you where you are at from beginner to quant.
tags:
  - label: Strategy
    variant: cyan
  - label: Fundamentals
    variant: amber
category: fundamentals
readTime: 12 min read
featured: false
imagePlaceholder: SEC Filings and Fundamentals View
headerImage: "/headers/blog-sec-filings-header.png"
ogImage: "/og/blog-sec-filings-og.png"
---

## The Data Is All There. The Work Is Getting to It.

Every publicly traded company in the United States files financial statements with the SEC. Annual reports, quarterly reports, material event disclosures. Every revenue figure, every EPS print, every balance sheet item — tagged in XBRL, publicly accessible through the EDGAR API, completely free.

The reason most traders don't use this data directly isn't access. It's work. Resolving a ticker symbol to a CIK number, fetching filing histories, parsing XBRL company facts, filtering out comparative restatements, handling the fiscal calendar edge cases that make automated extraction unreliable — all of that is real engineering work, and it has nothing to do with making better trading decisions.

Ampliterm does that work for you. You add a ticker to your watchlist. Ampliterm pulls its complete filing history from EDGAR, extracts every financial metric from the structured XBRL data, and runs AI analysis on each filing — automatically, in the background. By the time you open the fundamentals view for a name, the full financial picture is already there.

---

## Automatic Filing Sync

When you start tracking a ticker in Ampliterm, the platform resolves that symbol to its SEC CIK number — the identifier EDGAR uses to track every filing a company has ever submitted. From there, it pulls the full recent filing history: every **10-K annual report**, every **10-Q quarterly report**, every **8-K current report** on file.

New filings are synced automatically. When a company files its earnings, that 10-Q or 10-K appears in Ampliterm. When an 8-K lands — an M&A announcement, a guidance update, an executive change, a material contract — it gets pulled in and queued for processing without any action on your part.

Filings are globally deduplicated by accession number. If multiple users track the same ticker, the filing is fetched and analyzed once. You get the benefit of a shared infrastructure without any of the overhead.

---

## AI Analysis Built for Regulatory Documents

Every filing that enters Ampliterm is processed by a specialized AI analysis agent — one specifically tuned for SEC regulatory documents rather than news articles or general financial content.

The distinction matters. Earnings filings follow rigid disclosure conventions. The data is formal, structured, and highly specific. The analysis agent runs at an extremely low temperature to reflect that — this is factual extraction, not interpretation — and its instructions are tailored to each form type:

**For 10-K annual reports**, the analysis extracts full-year revenue with year-over-year growth rate, full-year diluted EPS with YoY change, operating margin and trend direction, free cash flow or operating cash flow, the most material risk factor changes from the prior year, any capital return program — buybacks, dividends — and forward guidance if provided.

**For 10-Q quarterly reports**, the analysis captures quarterly revenue with both YoY and QoQ growth rates, quarterly diluted EPS and YoY change, any guidance raise, cut, or reaffirmation, notable expense or margin changes, and management's commentary on business conditions.

**For 8-K current reports**, the analysis leads with the event type — Earnings Release, M&A, Executive Change, Guidance Update, Dividend Declaration, Share Buyback, Regulatory Action, Debt Offering — then extracts the key figures or terms, the named parties involved, and the expected financial impact if disclosed.

Each filing analysis produces a 2–3 sentence market-relevant summary and between 4 and 7 tight bullet points. Bullet points lead with the metric or event name — no filler preamble — and use exact numbers from the document wherever possible. If the filing shows "Revenue $26.0B, +78% YoY," that's what the bullet reads — not "revenue increased significantly."

Sentiment for each filing is classified as bullish, bearish, or neutral based on what the disclosure actually contains: results versus expectations, outlook changes, balance sheet developments. A numeric sentiment score from **-1.0** (severe deterioration) to **+1.0** (strong outperformance) is attached to each filing and displayed alongside the classification.

---

## The Filings Feed: Every Material Disclosure, at a Glance

The filings panel on any ticker page shows the company's recent SEC submissions in chronological order. Each row displays the form type badge, the filing title, the AI-determined sentiment classification, and the filing date.

Click any filing to expand it in place: the AI summary, the full bullet list, and a direct link to the original document on SEC.gov. Everything the analysis extracted, displayed in seconds, without opening a separate window, navigating EDGAR, or reading the full document yourself.

For traders who use filing-driven catalysts — who watch for guidance changes, material event 8-Ks, or management tone shifts in quarterly commentary — this is where Ampliterm surfaces those signals with zero lag.

---

## XBRL Fundamentals: Extracted Directly From the Source

Alongside filing sync, Ampliterm extracts structured financial data from the EDGAR XBRL Company Facts API — the same structured data the SEC uses for financial comparisons across all public companies.

The extraction covers the full range of financial statement line items across three statements:

**Income statement:** Revenue, gross profit, operating income, net income, diluted EPS (and basic), R&D expense, cost of revenue, operating expenses, income tax expense.

**Balance sheet — assets:** Cash and equivalents, cash and short-term investments, total assets, current assets, non-current assets, accounts receivable, inventory, property/plant/equipment, intangible assets, goodwill, long-term investments, short-term investments.

**Balance sheet — liabilities and equity:** Total liabilities, current liabilities, non-current liabilities, accounts payable, short-term debt, long-term debt, capital lease obligations, shareholders' equity, retained earnings, treasury stock, shares outstanding.

**Cash flow:** Operating cash flow, capital expenditures.

**Banking and insurance supplements:** For financial institutions — net interest income, interest income, interest expense, provision for credit losses, non-interest income and expense, loans and leases, deposits. For insurers — premiums earned (net), premiums written (net), policyholder benefits and claims, net investment income. These sector-specific metrics feed into sector-aware chart and ratio configurations so the analysis adapts to the business model, not just the GAAP labels.

---

## On Data Accuracy

The accuracy contract on Ampliterm's fundamentals data is explicit: every value corresponds to a single XBRL entry that SEC EDGAR published. No values are derived, computed, or inferred. If a company doesn't tag a particular metric in a particular period, that period simply doesn't appear for that metric — rather than a synthetic value being estimated from adjacent data.

This matters in practice. EDGAR's XBRL data has real edge cases that naive extraction gets wrong. The most common:

**Comparative-period restatements.** 10-Qs and 10-Ks bundle comparative data from earlier periods under their own accession number. Without filtering this correctly, a single metric can appear twice for the same quarter — once in the original filing and once restated in the following year's 10-K. Ampliterm uses each filing's true reporting period end — derived from flow-duration entries rather than any simple max-date heuristic — to exclude comparative re-appearances and surface only the authoritative value for each period.

**Restatement handling.** When a company genuinely restates a prior period — different from a comparative re-appearance — the later filed_at date on the same fiscal period takes precedence. Restatements are surfaced as corrections, not duplicates.

**Duration mismatches.** EDGAR's quarterly data can include both 3-month quarterly figures and year-to-date cumulative figures under the same accession. For income-statement and cash-flow metrics — flow metrics that accumulate — Ampliterm uses duration windows: 80–100 days for quarters, 350–380 days for annual periods. A 9-month YTD entry is excluded even if it carries a Q3 fiscal period tag.

**4-4-5 and 53-week calendars.** Fiscal calendars that use a 4-4-5 week structure, or that periodically run 53 weeks rather than 52, produce period lengths that would fail a simple ≈365-day or ≈90-day check. The extraction windows are deliberately wide enough to handle retail, manufacturing, and other sectors that commonly use these non-calendar fiscal years.

**XBRL concept evolution.** Accounting standard changes have caused companies to adopt different XBRL tags for the same line item over time. Revenue, for example, shifted from `Revenues` and `SalesRevenueNet` to the post-ASC 606 canonical `RevenueFromContractWithCustomerExcludingAssessedTax`. Ampliterm's concept maps define priority-ordered fallback chains so historical data from pre-standard-change filings populates the same metric as current-period data, without mixing up related-but-distinct figures.

---

## The Fundamentals View

The fundamentals view for any tracked ticker is a three-pane workspace: charts on the left, a full financial statement table in the center, and a metrics sidebar on the right.

**Period controls** at the top of the chart column let you toggle between quarterly and annual data, and set the lookback window — the last 4, 8, 12, or 20 periods. A pulsing green dot confirms the data is sourced directly from SEC EDGAR, with the last updated date displayed alongside.

### Charts

**Revenue & Gross Profit.** Side-by-side bars for revenue and gross profit per period, with a gross margin percentage overlay rendered as a dashed line against its own right-hand axis. Hovering any period shows a tooltip with the exact revenue figure, gross profit, and gross margin for that quarter or fiscal year.

**Net Income & EPS Diluted.** Net income bars with EPS overlay. Each bar's height reflects the absolute net income for the period; the EPS line tracks per-share earnings against a secondary axis. The hover tooltip shows net income, diluted EPS, and computed net margin.

**Margin Trend.** A sector-aware multi-line chart. For standard companies, this renders gross margin, operating margin, and net margin as trend lines over the selected period range — letting you see margin compression or expansion at a glance across multiple cycles. For banks, the chart switches to efficiency ratio (non-interest expense divided by total revenue) and net margin. For insurers, loss ratio (policyholder benefits and claims divided by premiums earned) and net margin. The rendering engine is identical — only the series definitions change based on the company's sector classification.

All charts lift the pen at missing data points rather than interpolating across gaps — so a quarter with no revenue data in EDGAR shows as a break in the line rather than a misleading interpolated value.

### Financial Statement Table

The center panel renders the full multi-period financial statement — income statement, balance sheet, and cash flow line items as rows, with each period as a column. Quarterly and annual views are separate tabs. The table scrolls horizontally when the period count exceeds the viewport, so you can hold twenty quarters of data in view by scrolling rather than truncating the history.

### Valuation and Returns Sidebar

The right sidebar computes current valuation ratios and capital efficiency metrics from the trailing twelve months (TTM) of reported data.

**Valuation:** P/E, P/S, P/B, EV/Operating Income (as an operating income proxy for EV/EBITDA since depreciation is not separately tagged in XBRL), and FCF yield — all computed from TTM fundamentals and current market cap.

**Per-Share & Returns:** EPS (diluted), book value per share, FCF per share, and revenue per share — each with a YoY delta badge showing the percentage change against the prior TTM period. Return on equity, return on assets, and return on invested capital, each with a year-over-year percentage point change. Debt-to-equity ratio. Values crossing meaningful thresholds — ROE above 15%, ROA above 10%, ROIC above 15% — are highlighted in green.

Beneath the ratios, a SEC Filings quick-access list links directly to the company's 10-K, 10-Q, and 8-K filings on SEC.gov. Each row shows the form type badge, the period label or filing date, and an external link indicator. One click opens the original document.

---

## Fundamentals as a Trade Filter, Not an Afterthought

The way most traders use fundamental data is reactive: they look something up when they're already in a name, usually to confirm a thesis they've already formed on price. That's better than nothing, but it means the fundamental picture isn't actually filtering the opportunity — it's rationalizing a decision already made on other grounds.

The more systematic approach is to have the fundamental picture already in place before a setup develops. When a name you've been watching for technical reasons breaks out, you already know whether the business behind it is accelerating or decelerating. You already know what the last three earnings cycles looked like. You already know what management said about forward guidance and whether the margin trend supports or undermines the price action.

That context doesn't emerge from glancing at a P/E ratio. It comes from having reviewed the actual filing history, having a read on the sentiment arc across recent quarters, and knowing whether the most recent 8-K disclosed something that changes the near-term picture.

Ampliterm's EDGAR integration is built to make that context low-effort to develop and easy to keep current. The filing sync runs automatically. The XBRL data is extracted without any manual intervention. The AI analysis is already done when you open the view. The charts and ratios update as new filings come in.

The analytical work — deciding what the data means for your specific setup — is yours. The data pipeline isn't.

---

## Every Filing, Every Quarter, From the Primary Source

There's a category of data service that aggregates financial data from third-party vendors, applies their own normalization logic, and presents you with numbers that may or may not match what the company actually filed. These services are often convenient, but the data lineage is opaque, and the normalization decisions are invisible.

Ampliterm's fundamentals data has one source: the SEC EDGAR XBRL API. The CIK resolution comes from the SEC's own company ticker map. The filing documents come from the SEC's archives. The financial metrics come from the XBRL tags the company itself submitted. When you see a revenue figure in Ampliterm, it corresponds to a specific XBRL concept tag in a specific filing with a specific accession number.

That traceability isn't a footnote — it's the whole point. When you're building a thesis around a specific metric trend, you want to know that the numbers reflect what the company actually reported, in the period it actually covered, without any synthetic interpolation filling in the gaps.

---

## Building the Fundamental Discipline

The traders who consistently integrate fundamental context into their decisions share one habit: they do it before the setup develops, not after. They have an existing read on the names they trade — how the business has been performing, what the recent sentiment arc looks like across filings, whether the trajectory of margins and returns supports or undermines the price structure they're watching.

Building that read from scratch takes time. Ampliterm is designed to compress that time significantly. Two minutes on the fundamentals view for any name gives you twenty quarters of clean XBRL data, three charts showing the trajectory of the business, TTM valuation and returns ratios computed automatically, and the AI-analyzed content of every 10-K, 10-Q, and 8-K the company has filed.

The foundation is already there. What you do with it is the edge.
