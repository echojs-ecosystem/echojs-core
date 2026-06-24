---
title: createEventEmitter
description: Typed, chainable pub/sub bus for named events.
package: '@echojs-ecosystem/reactivity'
keywords: [event-emitter, events, pub/sub, on, emit, subscribe]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { createEventEmitter } from '@echojs-ecosystem/reactivity'

type AppEvents = {
  ready: void
  'font:change': { font: string }
  error: Error
}

const bus = createEventEmitter<AppEvents>()

bus
  .on('font:change', ({ font }) => console.log(font))
  .once('ready', () => console.log('ready'))
  .emit('font:change', { font: 'inter' })
  .emit('ready')
```

Chainable methods return the same emitter instance — register multiple listeners
in one expression.

## Type Declarations

```ts
export type EventMap = Record<string, unknown>

export interface EventEmitter<Events extends EventMap> {
  on<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this

  subscribe<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this

  off<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this

  once<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this

  emit<Event extends keyof Events>(
    ...args: Events[Event] extends void
      ? [event: Event]
      : [event: Event, payload: Events[Event]]
  ): this

  clear(event?: keyof Events): this

  listenerCount(event: keyof Events): number
  hasListeners(event?: keyof Events): boolean
}

export class TypedEventEmitter<Events extends EventMap>
  implements EventEmitter<Events> {}

export const createEventEmitter: <Events extends EventMap>() => EventEmitter<Events>
```

## API

### `createEventEmitter<Events>()`

Creates an empty typed event bus.

| Returns | Description |
| --- | --- |
| `EventEmitter<Events>` | Chainable emitter — same instance from every mutating method |

### Instance methods

| Method | Returns | Description |
| --- | --- | --- |
| `on(event, listener)` | `this` | Subscribe; alias: `subscribe` |
| `off(event, listener)` | `this` | Remove a specific listener |
| `once(event, listener)` | `this` | Subscribe for a single emission |
| `emit(event, payload?)` | `this` | Notify all listeners for `event` |
| `clear(event?)` | `this` | Drop listeners for one event, or all when omitted |
| `listenerCount(event)` | `number` | Active listeners for an event |
| `hasListeners(event?)` | `boolean` | Any listeners for one event or the whole bus |

### Void events

When the payload type is `void`, `emit` takes only the event name:

```ts
type Events = { close: void }
bus.emit('close')
```

### Unsubscribe

`on` returns the emitter, not a dispose function. Keep a reference to the
listener and call `off(event, listener)`:

```ts
const onFont = ({ font }: { font: string }) => { /* … */ }

bus.on('font:change', onFont)
bus.off('font:change', onFont)
```

### Related

- [Events guide](/docs/packages/reactivity/guides/events) — when to use emitter vs signals vs stores
- [Store events](/docs/packages/store/guides/events) — `changed` / `reseted` on stores
- [Types](/docs/packages/reactivity/api/types) — `EventMap`, `EventEmitter`
