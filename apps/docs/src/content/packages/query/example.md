---
title: Examples
description:
  Practical @echojs-ecosystem/query patterns — JSONPlaceholder, models, status
  UI, docs loader.
package: '@echojs-ecosystem/query'
---

# Examples

Focused, copy-paste patterns for data fetching in EchoJS apps. Definitions live
in feature API modules; models bind with `.with()`; views read status helpers.

> [!tip] Run the interactive lab in the EchoJS example app at `/docs/query`, or
> try the [Playground](/docs/packages/query/playground).

## Pick an example

| Example                                                              | Teaches                          |
| -------------------------------------------------------------------- | -------------------------------- |
| [JSONPlaceholder](/docs/packages/query/examples/jsonplaceholder)     | Query definitions and cache keys |
| [Query Demo Model](/docs/packages/query/examples/query-demo-model)   | Reactive `.with()` binding       |
| [View Status Helpers](/docs/packages/query/examples/status-helpers)  | `Show` + `isPending` / `hasData` |
| [Docs Markdown Loader](/docs/packages/query/examples/doc-content)    | Long `staleTime`, SEO effect     |
| [Provider Defaults](/docs/packages/query/examples/provider-defaults) | App-wide default options         |

## Shared pattern

```ts
// features/*/api/*.queries.ts — definitions
export const getUserQuery = createQuery({ queryKey, queryFn, ... });

// model — instances
const user = getUserQuery.with(() => ({ id: $selectedUserId.value() }));

// view — read only
Show(() => user.hasData(), () => p(null, () => user.data()!.name));
```

## Related

- [Guides & Concepts](/docs/packages/query/guides/query-definitions)
- [Functions](/docs/packages/query/functions)
