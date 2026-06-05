---
title: Installation
description: Install @echojs-ecosystem/url-state and connect to @echojs-ecosystem/router.
package: "@echojs-ecosystem/url-state"
---

# Installation

## Package managers

:::install @echojs-ecosystem/url-state

For SPA URL sync via router:

:::install @echojs-ecosystem/router

:::install @echojs-ecosystem/hyperdom

## Standalone (tests / static pages)

Use `createBrowserUrlStateAdapter()` or `createMemoryUrlStateAdapter()` per param/group — no router required.

## Monorepo

```json
{
  "dependencies": {
    "@echojs-ecosystem/url-state": "workspace:*",
    "@echojs-ecosystem/router": "workspace:*"
  }
}
```

## Router registration

`createRouter` from `@echojs-ecosystem/router/hyperdom` calls `attachRouterQueryParams` — registers the router for `createQueryParams()` without importing `appRouter` in route modules (avoids circular imports).

## Minimal check

```ts
import { createMemoryUrlStateAdapter, createQueryParam, parseAsString } from "@echojs-ecosystem/url-state";

const adapter = createMemoryUrlStateAdapter("?q=hello");
const q = createQueryParam("q", parseAsString.withDefault(""), { adapter });

q.value(); // "hello"
```
