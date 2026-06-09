---
title: createLayoutView
description: Layout page that renders an `outlet` for nested child routes.
package: '@echojs-ecosystem/router'
keywords: [createLayoutView, layout, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { createLayoutView } from '@echojs-ecosystem/router'

export const docsLayout = createLayoutView({
  name: 'docs-layout',
  view: ({ outlet }) => shell({ children: [sidebar(), outlet()] }),
})
```

## Type Declarations

```ts
export const createLayoutView: <const O extends RouteViewOptionsConstraint>(
  options: O,
) => NamedLayoutView<...>

export const isLayoutPage: (route: unknown) => route is LayoutPage
```

## API

### Returns

`createLayoutView` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| layout page | `NamedLayoutView` | Same signals as route view + `outlet` in view ctx |
| `isLayoutPage` | guard | Detect layout instances |

### Related

- [createRouteView](/docs/packages/router/api/create-route-view)
- [createRoutes](/docs/packages/router/api/create-routes)
