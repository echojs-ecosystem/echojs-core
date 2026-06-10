---
title: Examples
description:
  Practical @echojs-ecosystem/async patterns — JSONPlaceholder, models, status
  UI, docs loader.
package: '@echojs-ecosystem/async'
---

# Examples

Focused, copy-paste patterns for data fetching in EchoJS apps. Definitions live
in feature API modules; models bind with `.with()`; views read status helpers.

> [!tip] Run the interactive lab in the EchoJS example app at `/docs/query`, or
> try the [Playground](/docs/packages/async/playground).

## Pick an example

| Example                                                              | Teaches                          |
| -------------------------------------------------------------------- | -------------------------------- |
| [JSONPlaceholder](/docs/packages/async/examples/jsonplaceholder)     | Query definitions and cache keys |
| [Query Demo Model](/docs/packages/async/examples/query-demo-model)   | Reactive `.with()` binding       |
| [View Status Helpers](/docs/packages/async/examples/status-helpers)  | `Show` + `isPending` / `hasData` |
| [Docs Markdown Loader](/docs/packages/async/examples/doc-content)    | Long `staleTime`, SEO effect     |
| [Provider Defaults](/docs/packages/async/examples/provider-defaults) | App-wide default options         |

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

- [Guides & Concepts](/docs/packages/async/guides/query-definitions)
- [Functions](/docs/packages/async/functions)
