---
title: Extensions
description: withActions, withDebug, withReadonly, and custom .extend() chaining.
package: "@echojs-ecosystem/store"
---

# Extensions

Stores support `.extend(fn)` to merge methods and cross-cutting behavior onto the instance.

## `withActions(actions)`

Map of `(store) => handler` factories → methods on store:

```ts
withActions({
  increment: (store) => () => store.update((v) => v + 1),
  add: (store) => (n: number) => store.update((v) => v + n),
});
```

Each key becomes a method with inferred parameter types from the inner function.

## `withDebug()`

Subscribes to `changed` and logs `{ prevValue, value }` to `console`. No-op if `console` is missing.

## `withReadonly()`

Replaces `set` / `update` / `reset` with throwing stubs. Sets `kind: "readonly-store"`.

## Custom extension

```ts
const counter = createStore(0).extend((store) => ({
  increment() {
    store.update((v) => v + 1);
  },
}));
```

Extensions receive the store instance and return an object merged onto it (typed per extension).

## Chaining

```ts
createStore(0, { name: "counter" })
  .extend(withActions({ increment: (s) => () => s.update((v) => v + 1) }))
  .extend(withDebug());
```

## Types

`StoreExtension`, `ExtensionResult` — exported for typing custom extensions.

## See also

- [Guides: Actions](/docs/packages/store/guides/actions)
- [Guides: Readonly Stores](/docs/packages/store/guides/readonly)
