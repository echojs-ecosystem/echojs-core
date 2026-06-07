---
title: Theme Store
description: Minimal localStorage persistence for a theme preference.
package: '@echojs-ecosystem/persist'
---

# Theme Store

```ts
import { createStore } from '@echojs-ecosystem/store'
import { withLocalStorage } from '@echojs-ecosystem/persist'

export const themeStore = createStore('dark' as 'dark' | 'light').extend(
  withLocalStorage({ key: 'app-theme', version: 1 })
)
```

Hydration runs automatically on attach. The store value syncs to `localStorage`
on every change.

## Manual hydrate

When `hydrate: false`:

```ts
const draft = createStore('').extend(
  withLocalStorage({ key: 'draft', hydrate: false })
)

await draft.persist.hydrate()
draft.set('Hello')
await draft.persist.save()
```

## See also

- [Storage Adapters](/docs/packages/persist/guides/storage-adapters)
- [Auth Session](/docs/packages/persist/examples/auth-session)
