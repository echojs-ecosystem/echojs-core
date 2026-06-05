<div align="center">

# @echojs/router

**Typed SPA routing — routes as signal-backed objects, not components.**

[![npm](https://img.shields.io/npm/v/@echojs/router)](https://www.npmjs.com/package/@echojs/router)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/router)

</div>

---

Programmatic router for EchoJS. Syncs **URL ↔ route state** with guards, lazy loading, layouts, and Hyperdom bindings (`Link`, `NavLink`).

## Features

- **Route views** — `createRouteView`, `createLayoutView`, `createLazyRouteView`
- **Signal-backed state** — `$path`, `$params`, `$query`, `$activePage`, `$pending`, `$error`
- **Guards & redirects** — `authorizationGuard`, `guardRoute`, `redirect`, `chainRoute`
- **History adapters** — `browser`, `hash`, `memory`, or custom
- **Hyperdom** — `@echojs/router/hyperdom` for `Link`, `NavLink`, `createRouter`

## Install

```bash
npm install @echojs/router @echojs/reactivity @echojs/hyperdom
```

## Quick start

```ts
import { createRouteView, createRoutes, createRouter } from "@echojs/router";

const homePage = createRouteView({
  name: "home",
  view: () => "Home",
});

const router = createRouter({
  history: "browser",
  routes: createRoutes([{ path: "/", name: "home", routeView: homePage }]),
});

router.start();
router.go("/");
```

### Hyperdom

```ts
import { createRouter, NavLink } from "@echojs/router/hyperdom";

const router = createRouter({ history: "browser", routes });
router.start();

NavLink({ to: homePage, activeClass: "active", children: "Home" });
```

## API

| Export | Description |
|--------|-------------|
| `createRouter` | Router instance |
| `createRoutes` | Route tree builder |
| `createRouteView` / `createLayoutView` | Page & layout views |
| `createLazyRouteView` | Code-split routes |
| `createRoute` | Legacy imperative routes |
| `guardRoute`, `redirect`, `chainRoute` | Route operators |

## Related packages

| Package | Role |
|---------|------|
| [`@echojs/url-state`](https://www.npmjs.com/package/@echojs/url-state) | Typed search params |
| [`@echojs/framework`](https://www.npmjs.com/package/@echojs/framework) | App bootstrap with router provider |

## Documentation

[echojs.dev/docs/packages/router](https://echojs.dev/docs/packages/router)
