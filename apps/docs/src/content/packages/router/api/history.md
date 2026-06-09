---
title: History
description: Browser, hash, and memory history adapters for `createRouter`.
package: '@echojs-ecosystem/router'
keywords: [createBrowserHistory, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { createRouter, createBrowserHistory } from '@echojs-ecosystem/router'

createRouter({
  routes,
  history: createBrowserHistory(),
})

// or shorthand:
createRouter({ routes, history: 'browser' })
```

## Type Declarations

```ts
export type RouterHistoryKind = 'browser' | 'hash' | 'memory'

export const createBrowserHistory: () => RouterHistory
export const createHashHistory: () => RouterHistory
export const createMemoryHistory: (options?: MemoryHistoryConfig) => RouterHistory
export const resolveHistory: (
  config: RouterHistoryKind | RouterHistoryConfig | RouterHistory,
) => RouterHistory
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `history` option | `kind \| config \| RouterHistory` | `browser` | Passed to `createRouter` |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `createBrowserHistory` | `RouterHistory` | pushState / popstate |
| `createHashHistory` | `RouterHistory` | Hash-based URLs |
| `createMemoryHistory` | `RouterHistory` | In-memory stack for tests |

### Related

- [createRouter](/docs/packages/router/api/create-router)
- [Path](/docs/packages/router/api/path)
