---
title: HyperDOM Integration
description: How signals connect to views, models, and reactive DOM updates.
package: '@echojs-ecosystem/reactivity'
---

# HyperDOM Integration

HyperDOM depends on `@echojs-ecosystem/reactivity`. Views do not diff a virtual
tree — reactive children and props register **effects** that update only what
changed.

## Models own signals

In `createModel`, keep signals private and expose accessors on the VM:

```ts
export const createHomeModel = createModel((): HomeVM => {
  const $tab = signal(0)
  return {
    isTabActive: (i: number) => $tab.value() === i,
    setTab: (i: number) => $tab.set(i),
  }
}, 'HomeModel')
```

HyperDOM views call `vm.isTabActive(0)` inside reactive children — dependencies
track automatically.

## Reactive children

```ts
span(null, () => String(vm.$count.value()))
```

The `() => …` child form registers an effect. When `$count` changes, only that
text node updates.

## Reactive props

```ts
section(
  { class: () => ({ 'is-positive': vm.$count.value() > 0 }) }
  /* children */
)
```

Function props re-run when tracked signals inside them change.

## When you still use effect()

Rarely in views — prefer HyperDOM's built-in reactivity. Use `effect()` in
models for non-DOM side work (logging, persistence hooks, bridging to external
APIs).

## Full example

See [Examples](/docs/packages/reactivity/example) and the live
[Playground](/docs/packages/reactivity/playground).

## Related

- [HyperDOM package](/docs/packages/hyperdom)
- [Architecture: Models](/docs/architecture/models)
- [Effects](/docs/packages/reactivity/guides/effects)
