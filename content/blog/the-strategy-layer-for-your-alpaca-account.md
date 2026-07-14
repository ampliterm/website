---
title: The Strategy Layer for Your Alpaca Account
excerpt: "Alpaca is a fantastic set of hands — it holds your capital, routes your orders, and gives you clean market data through an API. What it doesn't do is turn an idea into a rule, test that rule against history, and act on it the same way every single time. That's the gap Ampliterm fills. Connect your Alpaca account, pull your market picture in, build a strategy out of real technical conditions, and let it run — on paper until you trust it, live when you decide you do."
date: "2026-07-14"
author:
  name: "Dan Pastori"
  initials: DP
  role: Founder & Lead Developer
  bio: Dan built Ampliterm to help understand market cycles and trading strategies that actually work. Software developer by trade, but passionate about big data and stock trading, Ampliterm is the culmination of these two passions. It's a tool to meet you where you are at from beginner to quant.
tags:
  - label: Strategy
    variant: cyan
  - label: Execution
    variant: green
category: strategy
readTime: 10 min read
featured: true
imagePlaceholder: Ampliterm connected to an Alpaca account, strategy builder and live deployment
headerImage: "/headers/blog-strategy-layer-alpaca-header.png"
ogImage: "/og/blog-strategy-layer-alpaca-og.png"
---

## Your Brokerage Is a Great Set of Hands. It Isn't a Brain.

Alpaca does its job beautifully. It holds your capital, routes your orders in milliseconds, and hands you clean market data through a well-documented API. If you've ever wired up a script against it, you know how far that gets you — and exactly where it stops.

Because a brokerage account has no memory of your thesis. It doesn't know that you only want to buy the breakout when volume confirms it, that you always cut a loser at seven percent, or that a setup you loved last quarter stopped working in March. It executes what it's told, when it's told, and forgets everything the moment the order fills. The judgment — the *strategy* — has to live somewhere else.

That somewhere is usually a tangle of spreadsheets, a half-finished Python notebook, and a nagging feeling that you traded a rule differently on Tuesday than you did on Monday. Ampliterm is the layer that closes that gap. It sits on top of your Alpaca account, gives your ideas a durable structure, and executes them the same way every time — so the discipline is in the software, not in your willpower at 9:31 a.m.

---

## Connect Your Alpaca Account

Ampliterm runs on your own infrastructure, which means your Alpaca account connects to an instance you control. In the platform's Integrations settings, you enter your Alpaca API credentials — an **API key and secret**, with separate pairs for paper and live trading so the two never get confused. The keys are encrypted at rest. They live on your instance, alongside your data, and they never leave it.

This is a deliberate part of the design: your broker, your data, your keys. Ampliterm is not a middleman that pools your account with anyone else's or routes your orders through a shared service. It authenticates directly with Alpaca as *you*, using the credentials you supplied, against the endpoints Alpaca publishes. Nothing sits between your strategy and your fills except the code you're running.

Two connections get established from those keys:

- **The trading API** — for your account balances, open positions, order placement, and the market clock.
- **The market-data API** — for historical and recent price bars, the tradable asset universe, and corporate actions like splits and dividends.

You supply both key pairs once. Everything after that is Ampliterm talking to Alpaca on your behalf.

---

## It Pulls Your Market Picture In

A strategy is only as good as the data underneath it, so the first thing Ampliterm does is build a clean, local picture of the market from Alpaca's feeds.

- **Your account state** — equity, cash, and buying power, pulled straight from Alpaca so position sizing works against your *real* numbers, not a guess.
- **Open positions** — what you're actually holding, reconciled against what Ampliterm thinks it deployed.
- **Price history** — bars for the symbols you care about, ingested in rate-limited batches and stored locally so backtests and indicators run against a fast, consistent dataset instead of hammering the API every time.
- **The tradable universe** — Alpaca's asset catalog, so you're only ever building strategies on symbols you can actually trade.
- **Corporate actions** — splits and dividends, synced so your historical prices stay honest across a split instead of showing a phantom gap.

One detail matters more than it looks: when a strategy is running live, Ampliterm only ever reads **closed bars**. The still-forming candle — the one that can repaint before the bar actually completes — is dropped on purpose. It's a small discipline that prevents a whole category of look-ahead bugs, where a backtest looks brilliant because it quietly peeked at prices that hadn't happened yet.

---

## Build a Strategy That's Actually Yours

This is the heart of it. In Ampliterm, a strategy isn't code you have to write and it isn't a black box you have to trust. It's a structured definition you build yourself, out of real technical conditions, and you can read every part of it back.

You start by choosing the shape of the trade — whether this rule **enters** or **exits**, whether it **buys** or **sells**, and the **timeframe** it watches, from five-minute bars up to daily. Then you assemble the logic from the pieces Ampliterm gives you:

- **Indicators** — the standard technical toolkit, computed for you: EMA, SMA, RSI, MACD, ATR, relative volume, Bollinger Bands, Donchian channels, Stochastics, Keltner channels, and VWAP.
- **Signals** — named setups built on those indicators: EMA crossovers, MACD crosses, RSI overbought/oversold, Donchian breakouts, relative-volume spikes, VWAP crosses, ATR breakouts, Bollinger squeezes, and candlestick patterns like hammers, engulfings, and shooting stars.

Those become **conditions**, and conditions nest into a tree: one **trigger** that arms the setup, and a confirmation tree underneath it where you say *all of these* or *any of these* must also be true before a trade fires. On top of that logic, you layer the parts that keep you honest:

- **Risk rules** — stop-loss, take-profit, trailing stops, and time-based exits, defined up front rather than improvised mid-trade.
- **Position sizing** — go all-in, size to a percentage of equity, or pin a fixed dollar amount or share count. Your choice, applied consistently.
- **Guards** — invalidation conditions that watch a live position and bail out if the reason you entered stops being true.
- **An optional AI gate** — a confirmation step that asks a model to weigh in before a trade fires, with a minimum-confidence threshold you set. Optional, and off unless you turn it on.

Here's the part we won't soften: **Ampliterm does not tell you what to trade, and it will never give you financial advice.** Every condition in that tree is one you chose, expressing a thesis you already hold. The indicators and signals are building blocks; the conviction is entirely yours. Ampliterm's job is to take the rules *you* believe in and apply them without flinching, without second-guessing, and without the emotional drift that turns a good plan into a bad Tuesday. You bring the expertise. It brings the consistency.

---

## Backtest Before You Risk a Dollar

A rule you haven't tested is just a hope with extra steps. So before a strategy ever touches your account, you can run it through Ampliterm's simulation engine against your stored price history and see how it actually would have behaved.

The important guarantee here is that the *same* strategy definition drives both the backtest and the live engine. You're not testing one thing and deploying a slightly different thing — the logic that produced your backtest results is byte-for-byte the logic that will run tomorrow morning. What you tested is what you get.

---

## Execute — On Your Terms

When you're ready to put a strategy to work, you create a **deployment**: you point one strategy at one ticker and set it live. From there, Ampliterm runs the loop for you. A scheduler wakes up every few minutes during market hours, pulls the newly closed bars, steps your strategy forward, and — when your conditions are met — places the order through Alpaca.

Orders go in as **market orders**, and on entry Ampliterm also rests a protective **stop order** at your defined stop level as a catastrophe backstop, while the engine manages your trailing stops, take-profits, and time-based exits at each new bar. Every order carries a deterministic ID, so if the engine ever replays a bar, Alpaca recognizes the duplicate and rejects it — you don't get double-filled. Every placement, fill, and rejection is written to an audit log you can read back.

And critically, **you decide how real this gets:**

- By default, a strategy runs against a fully **simulated local paper account** — real logic, real data, zero dollars at risk. This is where you build trust.
- Point it at **Alpaca's paper environment** and orders route through Alpaca itself, still with paper money, so you can watch the full round trip against the live broker.
- **Live trading is deliberately hard to turn on by accident.** It takes a live execution mode *and* a separate master switch that ships turned off. Real money is never one careless click away.

Underneath all of it sits a risk governor enforcing the caps you set — maximum position size, open positions, notional exposure, and a daily loss limit that halts new entries for the rest of the day if it trips. The strategy proposes; your risk limits dispose.

---

## Alpaca Today, IBKR Next

Right now, Alpaca is the broker Ampliterm trades through — it's fully implemented, from data ingestion to order execution. **Interactive Brokers is next on the roadmap.**

That's not a from-scratch rewrite waiting to happen. Ampliterm's execution layer is built against a neutral broker interface: the strategy engine, the simulation engine, the risk governor, and the audit trail all sit above it and don't care which broker is underneath. Adding IBKR means teaching Ampliterm a new set of hands to route orders through — not rethinking the brain that decides what to route. When it lands, the strategies you build today will run against it unchanged.

---

## The Discipline Is in the Software

The hardest part of trading a strategy has never been coming up with it. It's running it the same way on the day it's working and the day it isn't — not widening a stop because you're sure it'll come back, not skipping the confirmation because this one *feels* different. That's the part willpower is bad at and software is good at.

Ampliterm doesn't replace your judgment. It gives it a place to live, a way to test it, and a machine that will execute it exactly as written against your Alpaca account — on paper until you're convinced, live when you say so. You bring the conviction. Ampliterm brings the discipline to act on it.
