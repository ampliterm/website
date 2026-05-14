---
title: Authentication
description: Authenticate API requests using bearer tokens generated from your Ampliterm instance.
section: API Reference
sectionOrder: 2
order: 1
badge: api
updatedAt: "May 12, 2026"
---

## Generating an API key

Navigate to **Settings → API Keys** in your Ampliterm instance and click **New Key**. Give the key a name and select the permission scope. Copy the key immediately — it will not be shown again.

## Using your API key

Pass your API key as a bearer token in the `Authorization` header of every request:

```http
GET /api/v1/entries
Authorization: Bearer at_live_xxxxxxxxxxxxxxxxxxxx
```

## Key scopes

| Scope | Description |
|-------|-------------|
| `read:journal` | Read journal entries and revisions |
| `write:journal` | Create and update journal entries |
| `read:simulations` | Read simulation results |
| `write:simulations` | Create and run simulations |
| `read:intel` | Read intel signals |
| `admin` | Full access including settings and user management |

## Revoking a key

Keys can be revoked at any time from **Settings → API Keys**. Revoked keys return `401 Unauthorized` immediately.
