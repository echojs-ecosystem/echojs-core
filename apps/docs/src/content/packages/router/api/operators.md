---
title: Operators
description: redirect, guardRoute, and chainRoute route operators.
package: '@echojs-ecosystem/router'
---

# Operators

Route operators attach to `route` entries in `createRoutes` (not `routeView`).

| Export                | Description             |
| --------------------- | ----------------------- |
| `redirect(options)`   | Redirect route helper   |
| `guardRoute(options)` | Guard wrapper           |
| `chainRoute(options)` | `beforeOpen` hook chain |

## redirect

```ts
redirect({ from, to, mapParams, mapQuery })
```

## guardRoute

```ts
guardRoute({ route, canOpen, otherwise })
```

## chainRoute

```ts
chainRoute({ route, beforeOpen })
```

## In the tree

```ts
{ path: "old-path", name: "old", route: redirect({ from: "...", to: "..." }) }
```

## Related

- [Guards & Redirects guide](/docs/packages/router/guides/guards-and-redirects)
