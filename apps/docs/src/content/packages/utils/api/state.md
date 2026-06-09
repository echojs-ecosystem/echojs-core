---
title: State
description: Toggle, counter, storage, and hash utilities.
package: '@echojs-ecosystem/utils'
---

# State

Import: `@echojs-ecosystem/utils/<kebab-name>`

| Utility | Import | Summary |
| ------- | ------ | ------- |
| `toggle` | `toggle` | Boolean on/off/toggle |
| `counter` | `counter` | Numeric counter with clamp |
| `boolean` | `boolean` | Alias of `toggle` |
| `previous` | `previous` | Previous signal value |
| `localStorage` | `local-storage` | Persist to `localStorage` |
| `hash` | `hash` | Sync `location.hash` |

State utilities have **no browser listeners** except `localStorage` and
`hash` (which listen for cross-tab / navigation events).

---

## toggle / boolean

```ts
function toggle(initial?: boolean)
function boolean(initial?: boolean) // alias
```

| Method | Description |
| ------ | ----------- |
| `value()` | Current boolean |
| `on()`, `off()`, `toggle()` | Set state |
| `set(next)` | Explicit set |

`dispose()` is a no-op.

---

## counter

```ts
function counter(initial?: number, options?: { min?: number; max?: number })
```

| Method | Description |
| ------ | ----------- |
| `inc(step?)`, `dec(step?)` | Add / subtract (default step `1`) |
| `set(n)` | Set value (clamped to min/max) |
| `reset()` | Back to initial value |

```ts
const page = counter(1, { min: 1, max: 10 })
page.inc()
page.set(99) // clamped to 10
```

---

## previous

```ts
function previous<T>(source: ReadonlySignal<T>)
```

| Return | Description |
| ------ | ----------- |
| `value()` | Previous value of `source` (undefined before first change) |

Runs an internal `effect()` on `source`. Call `dispose()` when done.

```ts
const $count = signal(0)
const prev = previous($count)

$count.set(1)
prev.value() // undefined (first run stores current, exposes prior)

$count.set(2)
prev.value() // 1
```

---

## localStorage

```ts
function localStorage<T>(
  key: string,
  initial: T,
  options?: {
    storage?: Storage
    serialize?: (value: T) => string
    deserialize?: (raw: string) => T
  }
)
```

| Method | Description |
| ------ | ----------- |
| `value()` | Current value |
| `set(next)` | Write to storage + signal |
| `remove()` | Remove key, reset to `initial` |

Listens to `storage` events for cross-tab sync. Corrupt JSON falls back to
`initial`.

[Example](/docs/packages/utils/examples/local-storage).

---

## hash

```ts
function hash(initial?: string)
```

| Method | Description |
| ------ | ----------- |
| `value()` | Hash without leading `#` |
| `set(next)` | Updates signal and `location.hash` |

Syncs on `hashchange`. Strips `#` prefix when setting.

```ts
const hash = hash()
hash.set('section-2') // location.hash → "#section-2"
```
