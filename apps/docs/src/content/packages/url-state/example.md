---
title: Examples
description: Practical @echojs-ecosystem/url-state patterns — catalog filters, pagination, memory adapter.
package: "@echojs-ecosystem/url-state"
---

# Examples

Focused, copy-paste patterns for shareable URL state. Param groups sync filters and pagination with the address bar — users can bookmark and share links.

> [!tip]
> Open **Workspace → Products** in the EchoJS example app to see catalog filters live.

## Pick an example

| Example | Teaches |
| --- | --- |
| [Catalog Filters](/docs/packages/url-state/examples/catalog-filters) | Full filter schema with `urlKeys` |
| [Pagination](/docs/packages/url-state/examples/pagination) | Single param, `history: "push"` |
| [Memory URL](/docs/packages/url-state/examples/memory-url) | Test adapter without browser |

## Shared pattern

```ts
const filters = createQueryParams({ q: parseAsString.withDefault(""), page: parseAsInteger.withDefault(1) });

// read in view
input({ value: () => filters.value().q, onInput: /* set */ });

// write
filters.update((v) => ({ ...v, page: v.page + 1 }));
```

## Related

- [Guides & Concepts](/docs/packages/url-state/guides/important-defaults)
- [API Reference](/docs/packages/url-state/api)
