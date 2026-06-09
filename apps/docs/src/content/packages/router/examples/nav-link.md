---
title: NavLink Sidebar
description: Declarative sidebar navigation with NavLink.
package: '@echojs-ecosystem/router'
---

# NavLink Sidebar

Use `NavLink` for sidebar links — active class tracks `$isOpened` without full
page reload.

```ts
import { NavLink } from '@echojs-ecosystem/router/hyperdom'

NavLink({
  to: homePage,
  activeClass: 'is-active',
  class: 'nav-link',
  children: 'Home',
})

NavLink({
  to: userPage,
  params: { id: '42' },
  query: { tab: 'profile' },
  children: 'User',
})
```

- `preventDefault` + `page.go()` — **no full page reload**
- `activeClass` when `to.$isOpened` is true

## Related

- [Navigation guide](/docs/packages/router/guides/navigation)
- [NavLink](/docs/packages/router/api/nav-link)
