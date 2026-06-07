---
title: Important Defaults
description:
  Execution model, tracking rules, and conventions for
  @echojs-ecosystem/reactivity.
package: '@echojs-ecosystem/reactivity'
---

# Important Defaults

`@echojs-ecosystem/reactivity` exposes a **small, strict** API. These defaults
shape how EchoJS apps behave — understanding them early prevents subtle bugs.

## Execution model

| Primitive               | When it runs                                                 |
| ----------------------- | ------------------------------------------------------------ |
| `effect(fn)`            | **Immediately**, then again when tracked dependencies change |
| `computed(getter)`      | **Lazily** — recalculates when read after invalidation       |
| `signal.set` / `update` | Synchronously; may schedule subscribers                      |

Effects run **eagerly** on creation. Computed values run **lazily** — they only
recompute when something reads `.value()` after a dependency changed.

## Tracking rules

- **Tracked read:** `.value()` inside an effect, computed getter, or another
  reactive context
- **Untracked read:** `.peek()` — use when you need the current value without
  subscribing
- **Subscribe:** `.subscribe(fn)` fires only when `Object.is(prev, next)` is
  false — **not** on subscribe

```ts
const $count = signal(0)

effect(() => {
  // tracked
  console.log($count.value())
})

effect(() => {
  // untracked — won't re-run when $count changes
  console.log($count.peek())
})
```

## Batching is opt-in but recommended

By default each `set` / `update` can notify dependents immediately. Wrap related
writes in `batch()` so effects flush **once**:

```ts
batch(() => {
  $a.set(1)
  $b.set(2)
})
```

See [Batching](/docs/packages/reactivity/guides/batching) for details.

## Naming convention

EchoJS codebases often prefix signals with `$` (`$count`, `$user`). This is
**convention only** — not enforced by the library.

## Object immutability in dev

When `NODE_ENV !== "production"`, object/array values stored in signals are
**deep-frozen** after write. In-place mutation throws at runtime. Always update
with `.set()` / `.update()` and spread copies.

See [Immutable Updates](/docs/packages/reactivity/guides/immutable-updates).

## Intentionally not in v0

| Feature                                   | Status                                    |
| ----------------------------------------- | ----------------------------------------- |
| Public `trigger()`                        | Not exported — use `.set()` / `.update()` |
| Proxy / `mutate(draft => …)` deep writes  | Not in core v0                            |
| Callable signals (`$count()` as function) | Object API only — use `.value()`          |

## Engine note

The implementation uses **`alien-signals`** internally. Import only
`@echojs-ecosystem/reactivity` — the engine can change without breaking the
public object API.

## Next steps

- [Signals](/docs/packages/reactivity/guides/signals) — writable cells
- [Computed Values](/docs/packages/reactivity/guides/computed) — derived state
- [Effects](/docs/packages/reactivity/guides/effects) — side work
