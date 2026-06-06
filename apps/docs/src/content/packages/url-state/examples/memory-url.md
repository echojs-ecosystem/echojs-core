---
title: Memory URL
description: createMemoryUrlStateAdapter for unit tests and headless scenarios.
package: "@echojs-ecosystem/url-state"
---

# Memory URL

The memory adapter simulates URL search params in a string — no browser or router required. Ideal for unit tests and SSR-less logic verification.

## Problem

Test param parsing, serialization, and set/update logic without `window` or a full router setup.

## Setup

```ts
import { createMemoryUrlStateAdapter, createQueryParams, parseAsString } from "@echojs-ecosystem/url-state";

const adapter = createMemoryUrlStateAdapter("?q=hello");
const state = createQueryParams(
  { q: parseAsString.withDefault("") },
  { adapter },
);

state.value().q; // "hello"
```

## Single param

```ts
import { createMemoryUrlStateAdapter, createQueryParam, parseAsString } from "@echojs-ecosystem/url-state";

const adapter = createMemoryUrlStateAdapter("?q=hello");
const q = createQueryParam("q", parseAsString.withDefault(""), { adapter });

q.value(); // "hello"
q.set("world");
// adapter reflects updated search string
```

## Testing updates

```ts
state.set({ q: "bike" });
expect(state.value().q).toBe("bike");

state.reset();
expect(state.value().q).toBe("");
```

## See also

- [API: Adapters](/docs/packages/url-state/api/adapters)
- [Installation](/docs/packages/url-state/installation)
