---
title: Example
description: Catalog filters with createQueryParams from apps/example workspace.
package: "@echojs/url-state"
---

# Example — URL State

## Workspace products catalog (`apps/example`)

Фильтры синхронизируются с URL — страница **Workspace → Products**.

```ts
import {
  createQueryParams,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
} from "@echojs/url-state";

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

## Read / write in route view

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

## Single param

```ts
import { createQueryParam, parseAsInteger } from "@echojs/url-state";

const page = createQueryParam("page", parseAsInteger.withDefault(1));

page.set(2, { history: "push" });
page.reset();
```

## Router-bound group

```ts
import { createRouter } from "@echojs/router/hyperdom";

export const appRouter = createRouter({ routes: appRoutes });

export const filters = appRouter.createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});
```

## Live app

| Resource | Path |
| --- | --- |
| Full page | `apps/example/src/pages/workspace/products/workspace-products.page.ts` |
| Open in lab | Workspace module → products route |

## See also

- Router Example — `/docs/packages/router/example`
- Usage — `/docs/packages/url-state/usage`
