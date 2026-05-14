---
title: Webhooks
description: Receive real-time notifications when events occur in your Ampliterm instance.
section: API Reference
sectionOrder: 2
order: 5
badge: api
updatedAt: "May 12, 2026"
---

## Overview

Webhooks send an HTTP POST to a URL you configure whenever specific events occur. Use webhooks to react to simulation completions, new intel signals, or journal entry state changes.

## Registering a webhook

Navigate to **Settings → Webhooks** and click **New Webhook**. Enter your endpoint URL and select the event types to subscribe to.

## Events

| Event | Trigger |
|-------|---------|
| `entry.created` | New journal entry saved |
| `entry.closed` | Position closed on an entry |
| `simulation.completed` | Simulation run finished |
| `intel.signal` | New intel signal matching your watchlist |

## Payload format

```json
{
  "event": "simulation.completed",
  "timestamp": "2026-05-12T14:32:00Z",
  "data": {
    "simulation_id": "sim_abc123",
    "entry_id": "entry_xyz456",
    "status": "completed"
  }
}
```

## Retries

Failed webhook deliveries (non-2xx response) are retried up to 3 times with exponential backoff: 1 minute, 5 minutes, 30 minutes.
