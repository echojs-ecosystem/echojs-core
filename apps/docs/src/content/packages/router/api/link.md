---
title: Link
description: HyperDOM `<a>` that navigates via a typed route or `href`.
package: '@echojs-ecosystem/router'
keywords: [Link, router, navigation]
---

@echojs-ecosystem/router

## Usage

```ts
import { Link } from '@echojs-ecosystem/router'

Link({
  to: docsPage,
  params: { slug: 'intro' },
  children: 'Introduction',
})
```

## Type Declarations

```ts
export type LinkProps<Params, Query> = {
  to?: Route<Params, Query>
  href?: string
  params?: Params
  query?: Query
  replace?: boolean
  children?: Child
}

export const Link: <Params, Query>(props: LinkProps<Params, Query>) => Child
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `to` | `Route` | optional | Typed route — prevents default + `go()` |
| `href` | `string` | optional | Plain URL when `to` omitted |
| `params` / `query` | records | optional | Navigation payload |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| element | `Child` | Anchor element |

### Related

- [NavLink](/docs/packages/router/api/nav-link)
- [createRouterProvider](/docs/packages/router/api/create-router-provider)
