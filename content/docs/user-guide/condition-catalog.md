---
title: Condition Catalog
description: Every trigger and confirmation available in the Strategy Builder — what each one detects and how to tune it.
section: User Guide
sectionOrder: 1
order: 1
badge: guide
updatedAt: "July 8, 2026"
ogImage: "/og/docs-condition-catalog-og.png"
---

## Reading this catalog

These are the building blocks every strategy is made of — usable as the trigger, as confirmations, and (for state conditions) as bail-out guards. Two distinctions matter throughout:

- **Events vs. states.** An *event* happens on a candle — a cross, a spike, a pattern. A *state* is continuously true or false — "the trend is up," "volume is elevated." Events make natural triggers; states make natural confirmations and are the only conditions usable as **guards**.
- **Conviction: early vs. confirmed.** Some signals fire twice per setup: an **early signal** the moment the setup appears, and a **confirmed** event once price follows through. Early gets you in sooner with more false positives; confirmed trades later for higher conviction. Conditions that support this show a *Conviction* selector (default: confirmed).

Every condition's parameters have sensible defaults — the values below in parentheses. Periods are counted in the strategy's own candle size.

## Trend

### Moving Average Cross *(event)*
A faster EMA crosses a slower EMA — the classic trend-change event. **Parameters:** fast period (8), slow period (21), direction (crosses above / crosses below).

### MA Trend *(state)*
The standing relationship between a fast and slow EMA: trending up, trending down, or sideways. Use it as a confirmation ("the trend was already up"), or as a **bail-out guard** — abandon an armed setup the moment the trend breaks. **Parameters:** fast period (8), slow period (21), trend (up / down / sideways).

### Channel Breakout *(event)*
Price closes beyond the highest high or lowest low of the last N bars — a Donchian breakout, the signature of a consolidation resolving. **Parameters:** channel length (20 bars), direction (breakout above / breakdown below).

### VWAP Cross *(event)*
Price crosses the volume-weighted average price, or — in **reversion** mode — stretches a set percentage away from it and snaps back. VWAP is anchored: it accumulates from the start of a **session, week, month, or year** (default: week). Note the session anchor is intraday-only; it resets with every daily candle, so use week or longer on daily strategies (the builder enforces the degenerate combinations). **Parameters:** direction, mode (cross / reversion), anchor (week), deviation (1%), conviction.

## Momentum

### MACD Cross *(event)*
The MACD line crosses its signal line — bullish or bearish momentum shift. **Parameters:** fast (12), slow (26), signal (9), cross direction.

### RSI Overbought / Oversold *(event)*
RSI crosses into an extreme zone. Oversold is read as a buy setup, overbought as a sell. Supports conviction: early fires on entering the zone; confirmed waits for the follow-through. **Parameters:** period (14), oversold level (30), overbought level (70), signal direction, conviction.

### Stochastic %K/%D *(event)*
The stochastic oscillator crossing its extreme zones — a faster, twitchier cousin of RSI, with the %K/%D cross inside the zone as its high-conviction event. **Parameters:** %K period (14), %D smoothing (3), oversold (20), overbought (80), signal direction, conviction.

## Volatility

### Bollinger Band Touch *(event)*
Price interacts with the Bollinger envelope, in one of two philosophies: **reversion** (a touch of the lower band is a buy — price bounces back) or **breakout** (a push through the band is continuation). Same bands, opposite conclusions — pick the one matching your thesis. **Parameters:** period (20), standard deviations (2σ), mode (reversion / breakout), band (lower = buy / upper = sell), conviction.

### Volatility Squeeze *(event)*
The TTM squeeze: Bollinger Bands compress inside the Keltner Channel — the market coiling — and the condition fires when the squeeze **releases**, with the direction read from the release candle. Quiet consolidations that end violently are exactly what this catches. **Parameters:** release direction (bullish / bearish), period (20), BB width (2σ), Keltner width (1.5× ATR).

### Volatility Breakout *(event)*
A single candle moves more than k× the Average True Range — a regime change in volatility, whatever the cause. **Parameters:** direction, multiple (2× ATR), ATR period (14).

## Volume

### Relative Volume *(state)*
Volume is running at least k× its recent average. As a confirmation it says "there's real participation here"; as a **bail-out guard** it abandons setups when interest dries up. **Parameters:** multiple (1.5×), averaging window (20 bars).

### Volume Spike *(event)*
A single directional candle prints unusual volume — a burst of conviction, not just a state of elevation. The bullish/bearish read comes from the candle itself. **Parameters:** direction, multiple (3×), averaging window (50 bars).

## Patterns

### Engulfing Candle *(event)*
A candle whose body engulfs the prior candle's body after a move in the opposite direction — a classic reversal print. **Parameters:** type (bullish / bearish), minimum body size (60% of the prior), minimum prior move (1%).

### Hammer *(event)*
A bullish hammer — long lower shadow, small body — forming after a decline: sellers pushed, buyers absorbed it. **Parameters:** lower shadow ratio (2× body), minimum prior decline (1%).

### Shooting Star *(event)*
The hammer's bearish mirror: a long upper shadow after an advance — buyers pushed, sellers took it back. **Parameters:** upper shadow ratio (2× body), minimum prior advance (1%).

## Combining conditions

The catalog is deliberately composable — the interesting strategies come from confluence, not from any single condition. A few patterns that use the pieces well:

- **Event trigger + state confirmations.** Trigger on a Channel Breakout; confirm the MA Trend was already up and Relative Volume is elevated. The event marks the moment, the states establish the context.
- **Early signal + confirming event.** Trigger on an early Bollinger lower-band touch, then require a bullish Engulfing Candle within the next 3 bars — you're armed at the extreme, but you only buy the reversal print.
- **Guard the premise.** Whatever you're waiting for, add the state it depends on as a Bail Out guard — an uptrend-breakout setup should die the moment the uptrend does.

Each condition card shows a plain-English summary of exactly what it will do with your parameters — if the sentence doesn't say what you meant, adjust until it does.
