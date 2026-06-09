---
title: Core Helpers
description: Environment checks, cleanup scope, event listeners, and toValue.
package: '@echojs-ecosystem/utils'
---

# Core Helpers

Low-level primitives used by composables and available from the barrel export.

```ts
import {
  isClient,
  createCleanupScope,
  eventListener,
  toValue,
} from '@echojs-ecosystem/utils'
```

Type guards live on a separate subpath: [`@echojs-ecosystem/utils/is`](/docs/packages/utils/api/is).

---

## Environment

| Export | Type | Description |
| ------ | ---- | ----------- |
| `isClient` | `boolean` | `typeof window !== 'undefined'` |
| `isServer` | `boolean` | `!isClient` |
| `defaultWindow` | `Window \| undefined` | `window` on client |
| `defaultDocument` | `Document \| undefined` | `document` on client |
| `defaultNavigator` | `Navigator \| undefined` | `navigator` on client |

See [SSR-Safe](/docs/packages/utils/guides/ssr-safe).

---

## createCleanupScope / tryOnCleanup

```ts
function createCleanupScope(): {
  add(fn: () => void): void
  dispose(): void
}
```

`tryOnCleanup` is an alias. Cleanups run in **reverse registration order**.
`dispose()` is idempotent; cleanups added after dispose are ignored.

```ts
const scope = createCleanupScope()
scope.add(() => clearInterval(id))
scope.dispose()
```

Errors in one cleanup do not block others.

---

## eventListener

```ts
function eventListener(
  target: MaybeEventTarget,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): { dispose: () => void }
```

`MaybeEventTarget` extends [reactive targets](/docs/packages/utils/guides/reactive-targets)
for event targets (Window, Document, HTMLElement, signal, getter).

When the resolved target changes, the old listener is removed and a new one is
attached.

---

## toValue

```ts
function toValue<T>(source: MaybeSignalOrGetter<T>): T
```

| Source | Result |
| ------ | ------ |
| Plain value | returned as-is |
| `() => T` | `source()` |
| `ReadonlySignal<T>` | `source.value()` |

Used internally by DOM composables; exported for custom utilities.

---

## Shared types

Exported from `@echojs-ecosystem/utils`:

| Type | Description |
| ---- | ----------- |
| `Disposable` | `{ dispose(): void }` |
| `MaybeSignalOrGetter<T>` | Value, getter, or signal |
| `MaybeEventTarget` | Event target or reactive resolver |
| `UtilityResult` | Alias of `Disposable` |

---

## `is` type guards

Full reference: [Type Guards (`is`)](/docs/packages/utils/api/is).

```ts
import { isString, isEmptyArray, isNullable } from '@echojs-ecosystem/utils/is'

if (isNullable(user)) return
if (isEmptyArray(items)) return
if (isString(name)) save(name)
```
