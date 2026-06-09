---
title: NavLink
description: Like `Link` with `activeClass` when the target route is open.
package: '@echojs-ecosystem/router'
keywords: [NavLink, router, navigation]
---

@echojs-ecosystem/router

## Usage

```ts
import { NavLink } from '@echojs-ecosystem/router'

NavLink({
  to: docsPage,
  params: { slug: 'intro' },
  class: 'nav-item',
  activeClass: 'nav-item--active',
  children: 'Introduction',
})
```

## Type Declarations

```ts
export type NavLinkMatch = 'exact' | 'partial'

export type NavLinkProps<Params, Query> = LinkProps<Params, Query> & {
  activeClass?: string
  class?: string
  match?: NavLinkMatch
  activeOn?: readonly Route<any, any>[]
}

export const NavLink: <Params, Query>(props: NavLinkProps<Params, Query>) => Child
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `match` | `exact \| partial` | `exact` | How to detect active state |
| `activeClass` | `string` | optional | Class when active |
| `activeOn` | `Route[]` | optional | Extra routes that mark active |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| element | `Child` | Anchor with reactive active class |

### Related

- [Link](/docs/packages/router/api/link)
