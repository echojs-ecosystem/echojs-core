---
title: URL state
description: Typed query parameters for filters and shareable UI — @echojs/url-state vs raw router query.
keywords: [query params, parseAsInteger, createQueryParams]
---

# URL state

**URL state** is application data stored in the **query string** (`?page=2&q=echo`) that users can bookmark, share, or refresh without losing context. EchoJS implements it with `@echojs/url-state` — typed parsers, defaults, and batch updates — on top of the same `location.search` the [router](/docs/state/router-state) already sees.

## URL state vs router query

| | Router `page.$query` | `@echojs/url-state` |
| --- | --- | --- |
| Type | Plain record from parser | Parsed `number`, `boolean`, enums, arrays |
| Defaults | Manual `??` | `.withDefault(...)` |
| Updates | `page.go({ query })` | `.set()`, `.update()`, `.reset()` |
| Use when | One-off in `beforeLoad` | Filters, pagination, view mode |

Both reflect the **same URL**. Pick url-state when multiple features read/write the same keys with validation.

## Single param

```ts
import { createQueryParam, parseAsInteger } from "@echojs/url-state";

const page = createQueryParam("page", parseAsInteger.withDefault(1));

page.value();       // number
page.set(2);        // pushes history entry
page.reset();       // back to default
```

## Param groups

```ts
import {
  createQueryParams,
  parseAsString,
  parseAsInteger,
  parseAsLiteral,
} from "@echojs/url-state";

export const catalogFilters = createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  view: parseAsLiteral(["grid", "list"] as const).withDefault("grid"),
});

catalogFilters.set({ q: "bike", page: 1 });
catalogFilters.update((v) => ({ ...v, page: v.page + 1 }));
```

## With router instance

```ts
export const filters = appRouter.createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});
```

Registers the adapter so reads/writes stay in sync with navigation.

## Link to server state

```ts
const products = productsQuery.with(() => ({
  q: catalogFilters.value().q,
  page: catalogFilters.value().page,
}));
```

Changing `page` in the URL updates the query key → new fetch (unless cached and fresh).

## What should not go in the URL

| Avoid in query string | Prefer |
| --- | --- |
| Large JSON blobs | Server state + id in URL |
| Secrets, tokens | [Client store](/docs/state/client-store) / httpOnly cookie |
| Transient modal open | [Local UI state](/docs/state/local-ui-state) |
| Whole form draft | [Form state](/docs/state/form-state) |

Path **params** (`:id`) identify **resources**; query keys usually hold **view options** (tab, sort, page).

## vs router params

| Path param `:userId` | Query `?tab=posts` |
| --- | --- |
| Part of route matching | Optional |
| Changes which route tree runs | Same page, different view |
| `page.$params` | url-state or `page.$query` |

## Related

- [State overview](/docs/state/overview)
- [Router state](/docs/state/router-state)
- [Server state](/docs/state/server-state)
- [URL State package](/docs/packages/url-state/usage)
