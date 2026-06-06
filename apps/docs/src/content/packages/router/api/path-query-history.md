---
title: Path, Query & History
description: Path utilities, query parsing, and history adapters.
package: "@echojs-ecosystem/router"
---

# Path, Query & History

## Path & query

| Export | Description |
| --- | --- |
| `matchPath`, `buildPath`, `normalizePathname` | Path utilities |
| `splitLocation`, `joinLocation`, `joinRoutePaths` | URL helpers |
| `parseQuery`, `stringifyQuery`, `parseQueryValues` | Query parsing |
| `flattenRouteTree`, `matchRouteChain` | Matching internals (also public) |
| `buildNamedRoutes` | Flatten tree to named map |

## Query strings

Built-in `parseQuery` / `stringifyQuery`:

- Arrays use repeated keys: `?tag=a&tag=b`
- Available on `page.$query` and `beforeLoad` context

## History

| Export | Description |
| --- | --- |
| `createBrowserHistory()` | `pushState` / `popstate` |
| `createHashHistory()` | Hash-based |
| `createMemoryHistory()` | In-memory stack |
| `resolveHistory(config)` | Normalize `history` option |

| Value | Use |
| --- | --- |
| `"browser"` | Real URLs (production SPA) |
| `"hash"` | `#!` routing |
| `"memory"` | Tests, SSR-less demos |
| `RouterHistory` object | Custom adapter |

## Related

- [Installation](/docs/packages/router/installation) — history modes
- [URL State package](/docs/packages/url-state) — typed query params
