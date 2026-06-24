---
title: Events
description:
  Typed event buses with createEventEmitter — when to use them alongside signals
  and stores.
package: '@echojs-ecosystem/reactivity'
---

# Events

`createEventEmitter` is a **synchronous, typed pub/sub bus** for named events.
It lives in `@echojs-ecosystem/reactivity` as a low-level primitive — not tied to
DOM, HTTP, or a specific model shape.

## When to use what

| Tool | Best for |
| --- | --- |
| **`signal` / `computed`** | State the UI or effects should **track** and re-render from |
| **`createEventEmitter`** | **Fire-and-forget** notifications, cross-module hooks, lifecycle signals |
| **`createStore` + `changed`** | Structured state with `prevValue`, `reset`, extensions |
| **`effect`** | Reacting to signal changes inside the reactive graph |

Use an emitter when several modules need to react to the **same named event**
without sharing writable state. Use signals when the event **is** the state.

## Basic pattern

```ts
import { createEventEmitter } from '@echojs-ecosystem/reactivity'

type ThemeEvents = {
  'palette:change': { id: string }
  ready: void
}

export const themeBus = createEventEmitter<ThemeEvents>()

// registration (chainable)
themeBus
  .on('palette:change', ({ id }) => applyPalette(id))
  .once('ready', () => console.log('theme initialized'))

// somewhere else in the app
themeBus.emit('palette:change', { id: 'ocean' })
themeBus.emit('ready')
```

## Chainable API

Registration and emit methods return `this`:

```ts
bus
  .on('a', handlerA)
  .on('b', handlerB)
  .once('c', handlerC)
  .emit('a', payload)
  .off('b', handlerB)
  .clear('c')
```

Query helpers (`listenerCount`, `hasListeners`) return primitives and break the
chain — call them separately.

## Models and modules

A common layout:

- **Signals** inside a model hold current values (`$font`, `$theme`)
- **Emitter** broadcasts side effects or integration points (`'font:change'`,
  `'hydrated'`)

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { createEventEmitter } from '@echojs-ecosystem/reactivity'

type AppearanceEvents = {
  'font:change': { font: string }
}

const $font = signal('inter')
export const appearanceEvents = createEventEmitter<AppearanceEvents>()

export const setFont = (font: string) => {
  $font.set(font)
  appearanceEvents.emit('font:change', { font })
}
```

Listeners that only care about the **latest value** should read `$font` (or use
`effect`). Listeners that care about **each transition** use the emitter.

## Comparison with store events

[`@echojs-ecosystem/store`](/docs/packages/store/guides/events) exposes
`changed` / `reseted` per store instance with `{ value, prevValue }` payloads.
That API is optimized for **state containers**.

`createEventEmitter` is **multi-event** and **framework-agnostic** — use it for
module buses, plugin hooks, or app-wide integration before you introduce a
store.

## Defaults

- Listeners run **synchronously** in registration order
- `emit` snapshots the listener list — safe to `off` during dispatch
- No dependency tracking — emitters are **outside** the signal graph
- `on` does **not** return an unsubscribe fn; use `off(event, listener)`

## Related

- [API: createEventEmitter](/docs/packages/reactivity/api/event-emitter)
- [Signals](/docs/packages/reactivity/guides/signals)
- [Store events](/docs/packages/store/guides/events)
