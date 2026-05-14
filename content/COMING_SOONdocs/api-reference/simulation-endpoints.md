---
title: Simulation Endpoints
description: Create and retrieve simulation runs via the REST API.
section: API Reference
sectionOrder: 2
order: 3
badge: api
updatedAt: "May 12, 2026"
---

## Create simulation

```http
POST /api/v1/simulations
```

Kicks off a new simulation run. The simulation executes asynchronously — poll the status endpoint or use a webhook to receive results.

### Body parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `entry_id` | string | Yes | Journal entry to run simulation against |
| `lookback` | integer | No | Days of history (default: 365) |
| `iterations` | integer | No | Monte Carlo iterations (default: 1000) |
| `universe` | string[] | No | Symbols to include (default: watchlist) |

## Get simulation

```http
GET /api/v1/simulations/:id
```

Returns simulation status and results (when complete).

## List simulations

```http
GET /api/v1/simulations
```

Returns all simulations for the workspace, most recent first.
