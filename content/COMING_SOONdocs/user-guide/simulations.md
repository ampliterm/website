---
title: Simulations
description: Test any strategy hypothesis against historical data. Compare multiple runs, adjust parameters, and understand the distribution of possible outcomes.
section: User Guide
sectionOrder: 1
order: 1
badge: guide
updatedAt: "May 12, 2026"
---

## Simulation parameters

| Parameter | Type | Default | Notes |
|-----------|------|---------|-------|
| `lookback` | integer | 365 | Days of historical data to include |
| `universe` | string[] | watchlist | Symbols to include. Use `SP500` for the full index |
| `iterations` | integer | 1000 | Monte Carlo iterations. Higher = slower but more accurate |
| `commission` | number | 0.005 | Per-share commission in USD |
| `slippage` | number | 0.001 | Slippage model as fraction of price |

## Reading results

Simulation results display four key panels: **Equity curve**, **Drawdown chart**, **Return distribution**, and the **Trade log**. The green line on the equity curve represents the median outcome; the shaded band represents the 10th–90th percentile range.

> Past simulation results do not guarantee future performance. Monte Carlo outputs are probabilistic, not predictive.

## Comparing runs

Select two or more simulation runs from the history panel and press `C` to open the side-by-side comparison view. Differences in parameter settings are highlighted automatically.
