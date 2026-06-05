---
title: API Reference
description: Public exports from @echojs/store.
package: "@echojs/store"
---

# API Reference

## Factories

| Export | Signature | Returns |
| --- | --- | --- |
| `createStore` | `(initial, options?)` | `Store<State>` |
| `select` | `(store, selector, options?)` | `ReadonlyStore<Selected>` |
| `combine` | `(sources, combiner, options?)` | `ReadonlyStore<Result>` |

### `StoreOptions<State>`

| Field | Type | Default |
| --- | --- | --- |
| `name` | `string` | — |
| `equals` | `false` \| `(a, b) => boolean` | `Object.is` |

`equals: false` — always treat updates as changes (always notify).

### `SelectOptions` / `CombineOptions`

Same `name` and `equals` shape as `createStore`.

## Extensions

| Export | Description |
| --- | --- |
| `withActions(actions)` | Map of `(store) => handler` factories → methods on store |
| `withDebug()` | `changed.watch` → `console.log` |
| `withReadonly()` | Replace `set` / `update` / `reset` with throwing stubs; `kind: "readonly-store"` |
| Custom `.extend(fn)` | `(store) => { ...methods }` merged onto store |

## Readonly

| Export | Description |
| --- | --- |
| `readonly(store)` | `ReadonlyStore` view of a `Store` |

## Utilities

| Export | Description |
| --- | --- |
| `batch(fn)` | Re-export from `@echojs/reactivity` |

## `Store<State>` instance

| Member | Description |
| --- | --- |
| `kind` | `"store"` |
| `name` | Optional label |
| `value()` | Current state |
| `set(value)` | Replace state (respects `equals`) |
| `update(fn)` | `set(fn(prev))` |
| `reset()` | Restore initial state; emits `reseted` |
| `$value` | `Signal<State>` |
| `changed` | `{ watch, emit }` — payload `{ value, prevValue }` |
| `reseted` | Same payload shape on reset |
| `subscribe(listener)` | `(value, prevValue) => void`; returns unsubscribe |
| `extend(extension)` | Chain extensions; merged return type |

## `ReadonlyStore<State>` instance

| Member | Description |
| --- | --- |
| `kind` | `"readonly-store"` |
| `name` | Optional |
| `value()` | Current derived state |
| `$value` | `ReadonlySignal<State>` |
| `changed` | Store event |
| `subscribe(listener)` | Unsubscribe return |

No `set`, `update`, or `reset`.

## `withActions` typing

```ts
withActions({
  increment: (store) => () => store.update((v) => v + 1),
  add: (store) => (n: number) => store.update((v) => v + n),
});
```

Each key becomes a method on the extended store with inferred parameter types from the inner function.

## `combine` sources

`Sources` is a record of `Store` or `ReadonlyStore`. `SourceValues<Sources>` infers value types per key for the combiner callback.

## Types (exported)

`Store`, `ReadonlyStore`, `StoreOptions`, `StoreEvent`, `StoreExtension`, `ExtensionResult`, `StoreEventPayload`, `EqualsOption`, `CombineOptions`, `SelectOptions`, `SourceValues`

## Not in this package

| Concern | Package |
| --- | --- |
| localStorage / session / cookie / IndexedDB | `@echojs/persist` |
| URL query sync | `@echojs/url-state` |
| Server cache / fetch | `@echojs/query` |

## Related

- Usage — `/docs/packages/store/usage`
- Overview — `/docs/packages/store`
