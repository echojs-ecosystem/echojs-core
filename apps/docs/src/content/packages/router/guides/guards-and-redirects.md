---
title: Guards & Redirects
description: authorizationGuard, redirect, guardRoute, chainRoute, and legacy createRoute.
package: "@echojs-ecosystem/router"
---

# Guards & Redirects

Protect routes, redirect legacy paths, and chain hooks before a route opens.

## authorizationGuard

Configure on `createRouter`:

```ts
const router = createRouter({
  history: "browser",
  routes: appRoutes,
  authorizationGuard: {
    isAuthorized: () => $session.value() != null,
    allowedUnauthorizedPaths: ["/", "/login"],
    redirectTo: "/login",
    redirectWhenAuthorized: "/",
  },
});
```

| Field | Role |
| --- | --- |
| `isAuthorized()` | Boolean or reactive check |
| `allowedUnauthorizedPaths` | Guest-only URLs |
| `allowedAuthorizedPaths` | Optional allow-list when logged in |
| `redirectTo` | Path or `(ctx) => path` when unauthorized |
| `redirectWhenAuthorized` | After login redirect |

## Operators

| Operator | Purpose |
| --- | --- |
| `redirect({ from, to, mapParams, mapQuery })` | Path redirect |
| `guardRoute({ route, canOpen, otherwise })` | Conditional open |
| `chainRoute({ route, beforeOpen })` | Hook before route opens |

Combine with `route` entries in `createRoutes` (not `routeView`):

```ts
{ path: "old-path", name: "old", route: redirect({ from: "...", to: "..." }) }
```

## Legacy createRoute (no UI)

For redirects and guards without a view:

```ts
import { createRoute } from "@echojs-ecosystem/router";

const legacy = createRoute("legacy-redirect");
legacy.go({ id: "1" });
legacy.close();
```

## Limitations (v0)

- No file-based routing generator
- No async guard cancellation
- Simple 404 via `notFoundView`

## Related

- [Operators API](/docs/packages/router/api/operators)
- [Router Lifecycle](/docs/packages/router/guides/router-lifecycle)
