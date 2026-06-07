---
title: HyperDOM Integration
description: Module-level stores, model access patterns, and view reads.
package: '@echojs-ecosystem/store'
---

# HyperDOM Integration

Stores complement HyperDOM models: **models** own local UI state; **stores**
hold shared domain state that spans routes, features, or the whole app.

## Module-level stores

Define stores once and import them anywhere:

```ts
// entities/session/auth-store.ts
export const authTokenStore = createStore<string | null>(null, {
  name: 'auth-token',
})
```

```ts
// pages/docs/state/state.model.ts
import { createStore, select, withActions } from '@echojs-ecosystem/store'

export const themeStore = createStore('dark' as 'dark' | 'light', {
  name: 'theme',
}).extend(
  withActions({
    toggle: (store) => () =>
      store.update((t) => (t === 'dark' ? 'light' : 'dark')),
  })
)

export const counterLabel = select(counterStore, (n) => `×${n}`, {
  name: 'counter-label',
})
```

## Reading in views

Views read store state via `.value()` inside reactive children or props:

```ts
import { effect } from '@echojs-ecosystem/reactivity'
import { themeStore } from './state.model.js'

effect(() => {
  document.documentElement.dataset.theme = themeStore.value()
})

button(
  { onClick: () => themeStore.toggle() },
  () => `Theme: ${themeStore.value()}`
)
```

HyperDOM reactive children (`() => themeStore.value()`) track `$value`
automatically — you rarely need a manual `effect()` in views for DOM updates.

## Models vs stores

| Pattern       | Owns                 | Example                        |
| ------------- | -------------------- | ------------------------------ |
| Model signal  | Ephemeral UI state   | `$selectedTab`, `$isOpen`      |
| Module store  | Shared domain state  | `themeStore`, `authTokenStore` |
| Derived store | Computed from stores | `counterLabel = select(...)`   |

Keep mutations in store actions (`withActions`), not scattered `set` calls from
views.

## Persistence

Store does not include storage. Extend with persist adapters when needed:

```ts
import { withLocalStorage, withCookie } from '@echojs-ecosystem/persist'

const token = createStore<string | null>(null).extend(
  withCookie({ key: 'echojs-access-token', path: '/', sameSite: 'lax' })
)
```

Persist exposes `store.persist.pause()`, `resume()`, `clear()` — see
[Session Stores](/docs/packages/store/examples/session-stores).

## Related

- [HyperDOM package](/docs/packages/hyperdom)
- [Architecture: Models](/docs/architecture/models)
- [Examples: View Reads Store](/docs/packages/store/examples/view-integration)
- [Persist package](/docs/packages/persist)
