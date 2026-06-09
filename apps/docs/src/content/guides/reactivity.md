---
title: Reactivity
description:
  Signals, computed, effects, and models — how reactive state flows through
  EchoJS apps from data to HyperDOM views.
keywords: [signal, computed, effect, createModel, batch, reactivity]
---

# Reactivity

EchoJS is **signal-first**: UI reads reactive state, and only subscribers update
when values change. There is no virtual DOM diff — HyperDOM wires signal reads to
DOM patches through effects.

This guide covers **app-level patterns**. API details live in the
[Reactivity package](/docs/packages/reactivity).

## Mental model

| Primitive  | Role                                      | Typical location        |
| ---------- | ----------------------------------------- | ----------------------- |
| `signal`   | Writable source of truth                  | `*.model.ts`, stores    |
| `computed` | Derived, cached value                     | model, store, entity    |
| `effect`   | Side effect when dependencies change      | model (rare in views)   |
| `batch`    | Coalesce multiple writes → one notify     | model actions, stores   |

```ts
import { signal, computed, effect } from '@echojs-ecosystem/reactivity'

const $count = signal(0)
const $doubled = computed(() => $count.value() * 2)

effect(() => {
  console.log($count.value(), $doubled.value())
})

$count.set(1) // effect runs once with 1, 2
```

> [!NOTE] `signal()` requires an **initial value** — `signal()` with no argument
> throws.

## Naming — `$` prefix

Writable signals and computeds use **`$`** on the variable name inside models
and stores (`$tab`, `$isOpen`). See [Conventions](/docs/guides/conventions) for
the full table.

```ts
const $count = signal(0)
const $isEven = computed(() => $count.value() % 2 === 0)
```

Expose signals on the VM when views read them directly; otherwise hide behind
accessors (`count: () => number`).

## Models own reactivity

**Views do not create signals.** `createModel` owns state, derived values, and
actions; `createView` maps the VM to HyperDOM.

```ts
import { signal, computed } from '@echojs-ecosystem/reactivity'
import { createModel } from '@echojs-ecosystem/hyperdom'

export type CounterVM = {
  $count: Signal<number>
  $label: Computed<string>
  increment: () => void
}

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0)
  const $label = computed(() => `Count: ${$count.value()}`)

  return {
    $count,
    $label,
    increment: () => $count.update((n) => n + 1),
  }
}, 'CounterModel')
```

> [!RECOMMENDATION] If you reach for `signal()` inside `createView`, move that
> logic into a model. See [Models](/docs/architecture/models).

## HyperDOM reads signals automatically

Reactive **children** and **props** track signal reads and re-run when values
change:

```ts
import { button, div, span } from '@echojs-ecosystem/hyperdom'
import { createView } from '@echojs-ecosystem/hyperdom'

export const CounterView = createView(
  (vm: CounterVM): Child =>
    div(null, [
      span(null, () => vm.$label.value()),
      button({ onClick: vm.increment }, () => String(vm.$count.value())),
    ]),
  'CounterView'
)
```

- `() => vm.$label.value()` — only the text node updates when `$label` changes.
- `class: () => ({ active: vm.$count.value() > 0 })` — reactive props work the
  same way.

Avoid `effect()` in views for DOM updates — HyperDOM already subscribes.

## `computed` vs `effect`

| Question                         | Use              |
| -------------------------------- | ---------------- |
| Pure function of other signals?  | `computed`       |
| Log, persist, call external API? | `effect`         |
| Update another signal from one?  | Prefer `computed` or explicit action |

`computed` caches until dependencies change. `effect` runs after commits; return
a cleanup function when subscribing to external sources.

## Batching writes

Multiple `.set()` calls in one tick can notify subscribers separately. Wrap
related updates in `batch()`:

```ts
import { batch } from '@echojs-ecosystem/reactivity'

batch(() => {
  $first.set('Echo')
  $last.set('JS')
}) // dependents see one notification
```

Use in store actions and model methods that touch several signals at once.

## Scopes and cleanup

Long-lived effects and subscriptions should clean up when a model or feature
unmounts:

```ts
import { scope } from '@echojs-ecosystem/reactivity'

const dispose = scope(() => {
  const stop = externalSource.subscribe((v) => $external.set(v))
  return () => stop()
})

// later
dispose()
```

`createModel` runs inside a scope — effects created in the model dispose with
the component. For manual listeners (`signal.subscribe`, `addEventListener`),
return cleanup from `effect()` or call `.dispose()` on utils composables.

## Where state lives

| Need                         | Layer              | Guide / package                          |
| ---------------------------- | ------------------ | ---------------------------------------- |
| Local UI (tab, open, hover)  | `signal` in model  | this guide                               |
| Shared client state          | `createStore`      | [Store](/docs/packages/store)            |
| Server / async cache         | `createQuery`      | [Data fetching](/docs/guides/data-fetching) |
| URL-driven filters           | `url-state`        | [URL state](/docs/state/url-state)       |
| Form input                   | `createForm`       | [Forms](/docs/guides/forms)              |
| Route params / query         | route `$params`    | [Routing](/docs/guides/routing)          |

Do not put server lists in a global signal — use Query. Do not mirror URL params
in a separate signal unless url-state already owns them.

## Router signals

Route objects expose reactive URL state:

```ts
userPage.$params.value() // { id: string }
userPage.$query.value() // { tab?: string }
userPage.$isOpened.value() // active match
```

Read these inside models with `.with(() => route.$params.value())` on queries or
in `computed` — same tracking rules as `signal`.

## Testing models

Models are plain factories — test without mounting DOM:

```ts
const vm = createCounterModel()
vm.increment()
expect(vm.$count.value()).toBe(1)
```

For effects, use `flushSync` / test utilities from the reactivity package or
assert on VM accessors after actions.

## Common pitfalls

1. **Reading `.peek()` in reactive children** — no tracking; use `.value()`.
2. **Mutating signal contents in place** — `signal({ items: [] })` then
   `items.push(x)` may not notify; use `.update` / immutable replacement.
3. **Effects that write signals that re-trigger the effect** — infinite loop;
   derive with `computed` or guard with equality checks.
4. **Global signals for everything** — splits ownership; use stores, queries, or
   feature models.

## Related

- [Reactivity package](/docs/packages/reactivity) — signals, computed, effects, API
- [HyperDOM integration](/docs/packages/reactivity/guides/hyperdom-integration)
- [Models](/docs/architecture/models) — Model + View split
- [Conventions](/docs/guides/conventions) — `$` naming, file layout
- [Data fetching](/docs/guides/data-fetching) — queries bind to signals
- [Routing](/docs/guides/routing) — route params as reactive data
