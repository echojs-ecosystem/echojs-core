---
title: Persist Controller
description: hydrate, save, clear, pause/resume, and status signals.
package: '@echojs-ecosystem/persist'
---

# Persist Controller

Every store extended with persist gains a `persist` controller.

## Methods

| Member                 | Description               |
| ---------------------- | ------------------------- |
| `key`                  | Storage key               |
| `hydrate()`            | Load snapshot into target |
| `save()`               | Write current value       |
| `clear()`              | Remove storage entry      |
| `pause()` / `resume()` | Toggle auto persistence   |

## Status signals

| Signal      | Description               |
| ----------- | ------------------------- |
| `$hydrated` | Hydration completed       |
| `$pending`  | Async operation in flight |
| `$error`    | Last error                |

IndexedDB hydrate/save is **async** — await methods and watch `$pending`.

## Example

```ts
await themeStore.persist.hydrate()
themeStore.set('light')
await themeStore.persist.save()
```

## See also

- [Hydrate & Save](/docs/packages/persist/guides/hydrate-and-save)
