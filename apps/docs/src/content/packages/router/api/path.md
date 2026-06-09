---
title: Path
description: Path matching, building, and location helpers.
package: '@echojs-ecosystem/router'
keywords: [matchPath, buildPath, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { matchPath, buildPath, joinRoutePaths } from '@echojs-ecosystem/router'

matchPath('/users/:id', '/users/42')
buildPath('/users/:id', { id: '42' })
```

## Type Declarations

```ts
export const matchPath: (pattern: string, pathname: string) => MatchResult | null
export const buildPath: (pattern: string, params: Record<string, string>) => string
export const normalizePathname: (pathname: string) => string
export const splitLocation: (location: string) => { pathname: string; search: string; hash: string }
export const joinLocation: (parts: { pathname: string; search?: string; hash?: string }) => string
export const joinRoutePaths: (...segments: string[]) => string
export const flattenRouteTree: (...) => ...
export const matchRouteChain: (...) => ...
export const buildNamedRoutes: (...) => NamedRoutesMap
```

## API

### Returns

`Path` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `matchPath` | `MatchResult \| null` | Match pattern to pathname |
| `buildPath` | `string` | Interpolate params into pattern |
| `buildNamedRoutes` | map | Flatten tree to named routes |

### Related

- [Query](/docs/packages/router/api/query)
- [createRoutes](/docs/packages/router/api/create-routes)
