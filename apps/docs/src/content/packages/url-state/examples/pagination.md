---
title: Pagination
description: Single page param with push history for back-button friendly navigation.
package: "@echojs-ecosystem/url-state"
---

# Pagination

For simple page navigation, a single `createQueryParam` with `history: "push"` lets users undo page changes with the browser Back button.

## Problem

Track current page in the URL without a full filter schema.

## Single param

```ts
import { createQueryParam, parseAsInteger } from "@echojs-ecosystem/url-state";

const page = createQueryParam("page", parseAsInteger.withDefault(1));

page.value();
page.set(2, { history: "push" });
page.update((p) => p + 1, { history: "push" });
page.reset();
```

## When to push vs replace

| Action | History |
| --- | --- |
| Next / Previous page | `"push"` — Back returns to previous page |
| Filter text change | `"replace"` — avoid cluttering history |

In a param group, override per call:

```ts
filters.update((v) => ({ ...v, page: v.page + 1 }), { history: "push" });
```

## See also

- [Guides: History & Sync](/docs/packages/url-state/guides/history-and-sync)
- [Examples: Catalog Filters](/docs/packages/url-state/examples/catalog-filters)
