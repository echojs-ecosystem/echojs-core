---
title: Timing
description: Timeout, interval, debounce, and throttle composables.
package: '@echojs-ecosystem/utils'
---

# Timing

Import: `@echojs-ecosystem/utils/<kebab-name>`

| Utility | Import | Summary |
| ------- | ------ | ------- |
| `timeout` | `timeout` | One-shot delayed callback |
| `interval` | `interval` | Repeating callback |
| `debounce` | `debounce` | Debounce a source signal |
| `debounceFn` | `debounce` | Debounce a function |
| `throttle` | `throttle` | Throttle a source signal |
| `throttleFn` | `throttle` | Throttle a function |

On the server (`!isClient`), debounce/throttle helpers apply updates or invoke
callbacks **immediately** — no timers are scheduled.

---

## timeout

```ts
function timeout(callback: () => void, delay: number)
```

| Method | Description |
| ------ | ----------- |
| `start()` | Schedule callback after `delay` ms |
| `stop()` | Cancel pending timeout |
| `restart()` | `stop()` + `start()` |
| `pending()` | Whether a timeout is active |

Does **not** auto-start — call `start()` explicitly.

```ts
const toast = timeout(() => hide(), 3000)
toast.start()
```

---

## interval

```ts
function interval(callback: () => void, delay: number)
```

| Method | Description |
| ------ | ----------- |
| `start()` | Begin interval |
| `stop()` | Clear interval |
| `active()` | Whether interval is running |

---

## debounce

```ts
function debounce<T>(source: ReadonlySignal<T>, ms: number)
```

Returns `{ value(), $value, dispose }`. When `source` changes, `$value` updates
after `ms` milliseconds of quiet.

[Example](/docs/packages/utils/examples/debounce).

---

## debounceFn

```ts
function debounceFn<T extends (...args: never[]) => void>(
  fn: T,
  ms: number
): T & { cancel(): void; flush(): void }
```

| Method | Description |
| ------ | ----------- |
| `cancel()` | Drop pending invocation |
| `flush()` | Run pending invocation immediately |

---

## throttle

```ts
function throttle<T>(source: ReadonlySignal<T>, ms: number)
```

At most one signal update per `ms` window (trailing edge).

---

## throttleFn

Same pattern as `debounceFn` — throttled function with `cancel()` and
`flush()`.

```ts
import { throttleFn } from '@echojs-ecosystem/utils/throttle'

const onScroll = throttleFn(() => savePosition(), 100)
window.addEventListener('scroll', onScroll)
```

---

## Choosing debounce vs throttle

| Pattern | Use when |
| ------- | -------- |
| **Debounce** | User stopped typing / resizing — run once after pause (search input) |
| **Throttle** | Limit rate during continuous activity (scroll, drag, resize handler) |

Both support `dispose()` to cancel pending timers.
