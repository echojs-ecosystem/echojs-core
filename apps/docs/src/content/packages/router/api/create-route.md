---
title: createRoute
description: Create a typed named route object without UI (redirects, guards).
package: '@echojs-ecosystem/router'
keywords: [createRoute, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { createRoute } from '@echojs-ecosystem/router'

const home = createRoute('home')
const user = createRoute('user')
```

## Type Declarations

```ts
export const createRoute: <const Name extends string>(
  name: Name,
) => NamedRoute<Name>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Unique route name in the tree |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| route | `NamedRoute` | Typed route handle for `go`, `open`, signals |

### Related

- [createRoutes](/docs/packages/router/api/create-routes)
- [redirect](/docs/packages/router/api/redirect)
