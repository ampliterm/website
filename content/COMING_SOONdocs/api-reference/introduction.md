---
title: API Introduction
description: Programmatic access to your Ampliterm journal, simulations, and intel feed via REST API.
section: API Reference
sectionOrder: 2
order: 0
badge: api
updatedAt: "May 12, 2026"
---

## Overview

The Ampliterm REST API gives you programmatic access to all data in your self-hosted instance. Use it to build custom dashboards, automate journal logging from your broker, or pipe simulation results into your own analytics.

## Base URL

```
http://your-instance.internal/api/v1
```

Replace `your-instance.internal` with the hostname or IP of your Ampliterm deployment.

## Versioning

The API is versioned via the URL path (`/v1`). Breaking changes will increment the version. Older versions remain supported for a minimum of 12 months after a new version is released.

## Request format

All requests use JSON. Set the `Content-Type: application/json` header on requests with a body. Responses are always JSON.

## Error format

```json
{
  "error": {
    "code": "INVALID_TICKER",
    "message": "Ticker symbol 'NVDAA' not found",
    "status": 422
  }
}
```
