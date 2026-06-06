---
title: Catalog Filters
description: Workspace products filters with urlKeys, defaultVisibility, and HyperDOM bindings.
package: "@echojs-ecosystem/url-state"
---

# Catalog Filters

The workspace products page syncs search, pagination, stock filter, sort, view mode, and tags with the URL — a complete real-world param group.

## Problem

Let users share filtered catalog views via URL while keeping typed, validated state in the app.

## Param group

```ts
import {
  createQueryParams,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
} from "@echojs-ecosystem/url-state";

const productsQueryParams = createQueryParams(
  {
    q: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    inStock: parseAsBoolean.withDefault(false),
    sort: parseAsLiteral(["relevance", "price_asc", "price_desc", "name"] as const).withDefault(
      "relevance",
    ),
    view: parseAsLiteral(["grid", "list"] as const).withDefault("grid"),
    tag: parseAsArrayOf(parseAsString).withDefault([]),
  },
  {
    defaultVisibility: "show",
    shallow: true,
    history: "replace",
    urlKeys: { inStock: "stock" },
  },
);
```

## Read / write in view

```ts
const { q, page, inStock, view } = productsQueryParams.value();

input({
  value: () => productsQueryParams.value().q,
  onInput: (e) =>
    productsQueryParams.set({
      ...productsQueryParams.value(),
      q: (e.target as HTMLInputElement).value,
      page: 1,
    }),
});

button(
  {
    onClick: () =>
      productsQueryParams.update((v) => ({
        ...v,
        page: v.page + 1,
      })),
  },
  () => "Next page",
);
```

## Key points

- **`urlKeys: { inStock: "stock" }`** — cleaner URL (`?stock=true`)
- **`defaultVisibility: "show"`** — explicit defaults in URL for shareable links
- **Reset page to 1** when search query changes

## Live reference

| Resource | Path |
| --- | --- |
| Full page | `apps/example/src/pages/workspace/products/workspace-products.page.ts` |

## See also

- [Guides: createQueryParams](/docs/packages/url-state/guides/query-params)
- [Examples: Pagination](/docs/packages/url-state/examples/pagination)
