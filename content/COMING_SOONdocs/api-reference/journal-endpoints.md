---
title: Journal Endpoints
description: Create, read, update, and query journal entries via the REST API.
section: API Reference
sectionOrder: 2
order: 2
badge: api
updatedAt: "May 12, 2026"
---

## List entries

```http
GET /api/v1/entries
```

Returns a paginated list of journal entries for the authenticated user's workspace.

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `per_page` | integer | Results per page (default: 20, max: 100) |
| `status` | string | Filter by entry state: `OPEN`, `CLOSED`, `DRAFT`, `INVALIDATED` |
| `ticker` | string | Filter by ticker symbol |
| `tags` | string | Comma-separated tag filter |

## Get entry

```http
GET /api/v1/entries/:id
```

Returns a single journal entry by ID, including all revisions.

## Create entry

```http
POST /api/v1/entries
```

Creates a new journal entry. Required fields: `ticker`, `direction`, `thesis`.

## Update entry

```http
PATCH /api/v1/entries/:id
```

Updates a journal entry. Creates a new revision preserving the previous state.

## Close position

```http
POST /api/v1/entries/:id/close
```

Closes the position and locks the entry. Required body: `{ "exit_price": 0.00 }`.
