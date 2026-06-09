---
title: Local Storage
description: Persist reactive state with localStorage.
package: '@echojs-ecosystem/utils'
---

# Local Storage

Sync a typed value with `localStorage` and react to cross-tab updates.

```ts
import { localStorage } from '@echojs-ecosystem/utils/local-storage'

type Prefs = { theme: 'light' | 'dark'; fontSize: number }

const prefs = localStorage<Prefs>('echo:prefs', {
  theme: 'light',
  fontSize: 16,
})

prefs.set({ theme: 'dark', fontSize: 18 })
console.log(prefs.value().theme) // 'dark'

// Reset to initial and remove key
prefs.remove()

prefs.dispose()
```

## Custom serialization

```ts
const count = localStorage('echo:count', 0, {
  serialize: String,
  deserialize: Number,
})
```

## Cross-tab sync

When another tab changes the same key, the `storage` event updates
`prefs.value()` automatically.

## SSR

On the server `value()` returns `initial` — no `localStorage` access. After
hydration, the client reads the stored value on first use.
