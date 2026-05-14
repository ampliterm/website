---
title: Intel Endpoints
description: Query and filter intel signals via the REST API.
section: API Reference
sectionOrder: 2
order: 4
badge: api
updatedAt: "May 12, 2026"
---

## List signals

```http
GET /api/v1/intel/signals
```

Returns intel signals, filtered by watchlist by default.

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Signal type: `EARNINGS`, `ANALYST`, `FLOW`, `MACRO`, `NEWS` |
| `ticker` | string | Filter to a specific symbol |
| `since` | ISO 8601 | Return signals after this timestamp |
| `watchlist` | boolean | Limit to watchlist symbols (default: `true`) |

## Attach signal to entry

```http
POST /api/v1/entries/:entry_id/signals/:signal_id
```

Links an intel signal to a journal entry.
