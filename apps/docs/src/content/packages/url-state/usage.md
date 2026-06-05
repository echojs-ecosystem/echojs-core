---
title: Usage
description: createQueryParam, createQueryParams, parsers, router integration, and catalog filters.
package: "@echojs/url-state"
---

# Usage

## Single param — `createQueryParam`

```ts
import { createQueryParam, parseAsInteger } from "@echojs/url-state";

const page = createQueryParam("page", parseAsInteger.withDefault(1));

page.value();
page.set(2, { history: "push" });
page.update((p) => p + 1);
page.reset();
```

## Param group — `createQueryParams`

```ts
import {
  createQueryParams,
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
  parseAsArrayOf,
} from "@echojs/url-state";

const filters = createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  inStock: parseAsBoolean.withDefault(false),
  view: parseAsLiteral(["grid", "list"] as const).withDefault("grid"),
  tag: parseAsArrayOf(parseAsString).withDefault([]),
});

filters.value();
filters.set({ q: "bike", page: 2 });
filters.update((v) => ({ ...v, page: v.page + 1 }));
filters.reset();
filters.clear();
```

## Router integration

```ts
import { createRouter } from "@echojs/router/hyperdom";
import { createQueryParams, parseAsInteger, parseAsString } from "@echojs/url-state";

export const appRouter = createRouter({ routes: appRoutes });

// On router — uses registered adapter automatically
export const filters = appRouter.createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});

// In a page module (no appRouter import — avoids cycles)
export const filters = createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});
```

`getUrlStateRouter()` returns the registered router when needed.

## `urlKeys` — rename query keys

```ts
const filters = createQueryParams(
  {
    inStock: parseAsBoolean.withDefault(false),
    page: parseAsInteger.withDefault(1),
  },
  {
    urlKeys: { inStock: "stock" },
  },
);
// URL uses ?stock=true, not ?inStock=true
```

Example: `apps/example/src/pages/workspace/products/workspace-products.page.ts`.

## History & navigation options

| Option | Values | Meaning |
| --- | --- | --- |
| `history` | `"push"` \| `"replace"` | History stack behavior |
| `shallow` | `boolean` | Router shallow update when supported |
| `scroll` | `boolean` | Scroll after URL change |
| `defaultVisibility` | `"hide"` \| `"show"` | Omit defaults from URL vs show `?page=1` |
| `limitUrlUpdates` | `debounce(ms)` / `throttle(ms)` / `false` | Rate-limit writes |

```ts
import { debounce } from "@echojs/url-state";

createQueryParams(schema, {
  history: "replace",
  shallow: true,
  defaultVisibility: "show",
  // limitUrlUpdates: debounce(500),
});
```

Per-call overrides: `page.set(2, { history: "push" })`.

## Built-in parsers

| Parser | Use |
| --- | --- |
| `parseAsString` | string |
| `parseAsInteger` / `parseAsFloat` | numbers |
| `parseAsBoolean` | boolean |
| `parseAsLiteral([...])` | union of literals |
| `parseAsStringLiteral` / `parseAsNumberLiteral` | typed literals |
| `parseAsArrayOf(parser)` | repeated keys or separator |
| `parseAsNativeArrayOf(parser)` | `?tag=a&tag=b` only |
| `parseAsJson(schema?)` | JSON + optional Standard Schema (Zod) |
| `parseAsIsoDate` / `parseAsTimestamp` | dates |

Chain: `parseAsInteger.withDefault(1).withOptions({ history: "replace" })`.

## Custom parsers

```ts
import { createCustomParser, createCustomMultiParser } from "@echojs/url-state";

const parseAsStars = createCustomParser({
  parse: (value) => { /* string | string[] | null */ },
  serialize: (value) => "★★★",
  eq: (a, b) => a === b,
});

const parseAsIds = createCustomMultiParser({
  parse: (values) => values.map(Number),
  serialize: (ids) => ids.map(String),
});
```

## Browser adapter (no router)

```ts
import { createBrowserUrlStateAdapter, createQueryParam, parseAsString } from "@echojs/url-state";

const q = createQueryParam("q", parseAsString.withDefault(""), {
  adapter: createBrowserUrlStateAdapter(),
});
```

## Memory adapter (tests)

```ts
import { createMemoryUrlStateAdapter, createQueryParams, parseAsString } from "@echojs/url-state";

const adapter = createMemoryUrlStateAdapter("?q=hello");
const state = createQueryParams(
  { q: parseAsString.withDefault("") },
  { adapter },
);
```

## HyperDOM views

Read param state in views or models:

```ts
const { q, page } = filters.value();
effect(() => {
  const { q } = filters.value();
  renderList(q);
});
```

Signals are available on param instances where exposed by the implementation — prefer `.value()` in models.

## Related

- API — `/docs/packages/url-state/api`
- Router usage — `/docs/packages/router/usage`
