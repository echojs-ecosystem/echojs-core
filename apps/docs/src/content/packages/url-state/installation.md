---
title: Installation
description: Install @echojs/url-state and connect to @echojs/router.
package: "@echojs/url-state"
---

# Installation

## Package managers

:::install @echojs/url-state

For SPA URL sync via router:

:::install @echojs/router

:::install @echojs/hyperdom

## Standalone (tests / static pages)

Use `createBrowserUrlStateAdapter()` or `createMemoryUrlStateAdapter()` per param/group — no router required.

## Monorepo

```json
{
  "dependencies": {
    "@echojs/url-state": "workspace:*",
    "@echojs/router": "workspace:*"
  }
}
```

## Router registration

`createRouter` from `@echojs/router/hyperdom` calls `attachRouterQueryParams` — registers the router for `createQueryParams()` without importing `appRouter` in route modules (avoids circular imports).

## Minimal check

```ts
import { createMemoryUrlStateAdapter, createQueryParam, parseAsString } from "@echojs/url-state";

const adapter = createMemoryUrlStateAdapter("?q=hello");
const q = createQueryParam("q", parseAsString.withDefault(""), { adapter });

q.value(); // "hello"
```
