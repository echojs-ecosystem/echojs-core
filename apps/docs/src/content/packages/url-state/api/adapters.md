---
title: Adapters
description: Browser, memory, and router URL state adapters.
package: "@echojs-ecosystem/url-state"
---

# Adapters

Adapters bridge param state to a URL source — browser history, in-memory strings for tests, or the EchoJS router.

## Exports

| Export | Description |
| --- | --- |
| `createBrowserUrlStateAdapter()` | `window` history |
| `createMemoryUrlStateAdapter(initialSearch?)` | Tests — e.g. `"?q=hello"` |
| `createRouterUrlStateAdapter(router)` | Router-backed |
| `attachRouterQueryParams(router)` | Adds `router.createQueryParams` |
| `getUrlStateRouter()` | Registered router |

## Browser adapter

```ts
import { createBrowserUrlStateAdapter, createQueryParam, parseAsString } from "@echojs-ecosystem/url-state";

const q = createQueryParam("q", parseAsString.withDefault(""), {
  adapter: createBrowserUrlStateAdapter(),
});
```

## Memory adapter (tests)

```ts
import { createMemoryUrlStateAdapter, createQueryParams, parseAsString } from "@echojs-ecosystem/url-state";

const adapter = createMemoryUrlStateAdapter("?q=hello");
const state = createQueryParams(
  { q: parseAsString.withDefault("") },
  { adapter },
);
```

## Router adapter

Registered automatically by `createRouter` from `@echojs-ecosystem/router/hyperdom`. See [Router Adapter guide](/docs/packages/url-state/guides/router-adapter).

## See also

- [Guides: Router Adapter](/docs/packages/url-state/guides/router-adapter)
- [Examples: Memory URL](/docs/packages/url-state/examples/memory-url)
