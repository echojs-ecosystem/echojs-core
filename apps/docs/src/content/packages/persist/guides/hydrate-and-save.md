---
title: Hydrate & Save
description:
  Manual hydration, pause/resume, cross-tab sync, and logout patterns.
package: '@echojs-ecosystem/persist'
---

# Hydrate & Save

Control **when** state loads from storage and **when** writes are flushed.

## Auto vs manual hydrate

By default, hydration runs when the extension attaches. Disable for SSR guards
or deferred bootstrap:

```ts
const draft = createStore('').extend(
  withLocalStorage({ key: 'draft', hydrate: false })
)

await draft.persist.hydrate()
draft.set('Hello')
await draft.persist.save()
```

Call `.persist.hydrate()` after app bootstrap when using SSR or route guards.

## Pause and resume

Pause auto-save during batched mutations or logout:

```ts
themeStore.persist.pause()
try {
  themeStore.set('light')
  await themeStore.persist.save()
} finally {
  themeStore.persist.resume()
}
```

## Status signals

| Signal      | Meaning                                  |
| ----------- | ---------------------------------------- |
| `$hydrated` | Initial hydration completed              |
| `$pending`  | Async hydrate/save in flight (IndexedDB) |
| `$error`    | Last persistence error                   |

## Cross-tab sync (`localStorage`)

```ts
withLocalStorage({ key: 'theme', syncTabs: true })
```

Other tabs update the store when storage changes.

## Logout pattern (pause + clear)

```ts
authTokenStore.persist.pause()
authUserStore.persist.pause()
try {
  authTokenStore.set(null)
  authUserStore.set(null)
  await Promise.all([
    authTokenStore.persist.clear(),
    authUserStore.persist.clear(),
  ])
} finally {
  authTokenStore.persist.resume()
  authUserStore.persist.resume()
}
```

## See also

- [Persist Controller](/docs/packages/persist/api/persist-controller)
- [Auth Session example](/docs/packages/persist/examples/auth-session)
