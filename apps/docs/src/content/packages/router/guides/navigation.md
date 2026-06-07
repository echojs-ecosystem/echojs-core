---
title: Navigation & NavLink
description: Imperative go, NavLink, Link, and typed route resolution.
package: '@echojs-ecosystem/router'
---

# Navigation & NavLink

Navigate imperatively via page objects or declaratively with HyperDOM link
components.

## Imperative

```ts
homePage.go()
userPage.go({ id: '42' }, { query: { tab: 'profile' }, replace: true })
userPage.open({ id: '1' }) // alias for go
```

Each page exposes `$isOpened`, `$params`, `$query`, `$data`, `$pending`,
`$error`, `go()`, `open()`, and `preload()` (lazy pages).

## HyperDOM NavLink (preferred in UI)

```ts
import { NavLink } from '@echojs-ecosystem/router/hyperdom'

NavLink({
  to: userPage,
  params: { id: '42' },
  query: { tab: 'profile' },
  activeClass: 'is-active',
  class: 'nav-link',
  children: 'User',
})
```

- `preventDefault` + `page.go()` — **no full page reload**
- `activeClass` when `to.$isOpened` is true

## Plain Link

```ts
import { Link } from '@echojs-ecosystem/router/hyperdom'

Link({ href: '/docs/guides/routing', children: 'Routing guide' })
Link({ to: homePage, children: 'Home' })
```

## Typed route map

`createRoutes` infers `router.routes` keys from `name` fields — use for
autocomplete when resolving links in code.

```ts
router.resolve(userPage, { id: '1' }, { query: { tab: 'a' } })
// → "/users/1?tab=a"
```

## Related

- [NavLink Sidebar example](/docs/packages/router/examples/nav-link)
- [Imperative Navigation example](/docs/packages/router/examples/imperative-nav)
