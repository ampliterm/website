---
title: Core Concepts
description: Key terms and mental models you'll encounter throughout the terminal and API.
section: Getting Started
sectionOrder: 0
order: 2
updatedAt: "May 12, 2026"
---

## Journal Entries

An **entry** is the fundamental unit of Ampliterm. Each entry captures a single trade thesis at a specific moment in time. Entries are immutable once saved — amendments create a new revision linked to the original, preserving a full audit trail.

### Entry states

| State | Description |
|-------|-------------|
| `DRAFT` | Not yet saved. Local only, not synced. |
| `OPEN` | Position is active. Entry is editable for addendums. |
| `CLOSED` | Position exited. P&L is final. Entry locked. |
| `INVALIDATED` | Thesis was invalidated without taking the trade. Still archived for learning. |

## Simulations

A **simulation** is a backtest run against a strategy defined in a journal entry. Simulations are non-destructive — you can run multiple simulations on the same entry with different parameters and compare them side-by-side.

## Intel Signals

An **intel signal** is a discrete market event surfaced by the Intel Feed — earnings beats, analyst upgrades, unusual options activity, or macro data releases. Signals can be attached to journal entries or trigger simulation run conditions.

> Intel signals are informational only and do not constitute financial advice. Ampliterm does not execute trades on your behalf.

## Workspaces

A **workspace** is an isolated environment with its own journal, watchlists, and simulation history. Multiple users on the same Ampliterm instance can each have their own workspace with independent data.
