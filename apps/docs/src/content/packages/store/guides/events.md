---
title: Events & Subscriptions
description: subscribe, changed, reseted — reacting to store updates.
package: '@echojs-ecosystem/store'
---

# Events & Subscriptions

Stores notify listeners when state changes. Use **`subscribe`** for simple
callbacks or **`changed`** / **`reseted`** events for structured payloads.

## `subscribe`

```ts
const off = counter.subscribe((value, prevValue) => {
  console.log({ value, prevValue })
})
off() // unsubscribe
```

The listener receives `(value, prevValue)` on each change. Respects the store's
`equals` option — no callback when values are considered equal.

## Event objects

```ts
counter.changed.watch(({ value, prevValue }) => {
  // runs on set/update when value actually changed
})

counter.reseted.watch(({ value, prevValue }) => {
  // runs when reset() is called
})
```

### Reset behavior

`reset()` emits **`reseted`** then applies the initial value. If the restored
value differs from the current value per `equals`, **`changed`** also fires.

```ts
counter.set(5)
counter.reset()
// reseted: { value: 0, prevValue: 5 }
// changed: { value: 0, prevValue: 5 } (if equals says they differ)
```

## `$value` signal integration

Because every store exposes `$value` as a `Signal`, you can also track changes
via reactivity:

```ts
import { effect } from '@echojs-ecosystem/reactivity'

effect(() => {
  console.log(counter.$value.value())
})
```

Prefer `subscribe` or events when you need `prevValue`. Prefer `$value` inside
existing reactive contexts (effects, computed, HyperDOM reactive children).

For **multi-event buses** or module-level hooks without a store instance, use
[`createEventEmitter`](/docs/packages/reactivity/api/event-emitter) from
`@echojs-ecosystem/reactivity` — see the
[Events guide](/docs/packages/reactivity/guides/events).

## `withDebug`

Logs `{ prevValue, value }` on each change to `console` (no-op if `console`
missing):

```ts
import { withDebug } from '@echojs-ecosystem/store'

createStore(0, { name: 'counter' }).extend(withDebug())
```

Use `name` in `createStore` options for readable logs.

## Related

- [Creating Stores](/docs/packages/store/guides/creating-stores)
- [API: createStore](/docs/packages/store/api/create-store)
- [API: Extensions](/docs/packages/store/api/extensions)
- [Reactivity: Events](/docs/packages/reactivity/guides/events) — `createEventEmitter`
