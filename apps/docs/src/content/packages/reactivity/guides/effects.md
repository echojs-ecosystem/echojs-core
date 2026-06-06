---
title: Effects
description: Side effects that automatically re-run when tracked signal dependencies change.
package: "@echojs-ecosystem/reactivity"
---

# Effects

An **effect** runs a function **immediately**, then re-runs whenever a signal read via `.value()` inside that function changes.

## Basic usage

```ts
import { effect, signal } from "@echojs-ecosystem/reactivity";

const $theme = signal<"light" | "dark">("light");

const stop = effect(() => {
  document.documentElement.dataset.theme = $theme.value();
});

// later — dispose and stop tracking
stop();
```

## Tracking and peek

Inside an effect:

- `.value()` — **tracks** the dependency
- `.peek()` — reads without subscribing (e.g. compare previous vs next)

```ts
let prev = 0;

effect(() => {
  const next = $count.value();
  if (next !== prev) {
    console.log(`${prev} → ${next}`);
    prev = next;
  }
});
```

## Disposal

`effect(fn)` returns a **disposer** function. Call it to stop the effect and release dependencies.

For grouped disposal (multiple effects, timers, subscriptions), use [Scopes & Cleanup](/docs/packages/reactivity/guides/scopes-and-cleanup).

## Effects vs computed

| | `computed` | `effect` |
| --- | --- | --- |
| Purpose | Derive a value | Side work (DOM, logging, fetch triggers) |
| Return | Readonly signal | Disposer function |
| Read by | `.value()` consumers | Runs for side effects only |

> [!warning]
> Do not mutate signals in effects in ways that create infinite loops. Prefer `batch()` when syncing multiple cells.

## HyperDOM integration

HyperDOM registers internal effects for reactive children and props — you rarely call `effect()` directly in views. See [HyperDOM Integration](/docs/packages/reactivity/guides/hyperdom-integration).

## Related

- [Important Defaults](/docs/packages/reactivity/guides/important-defaults)
- [API: effect](/docs/packages/reactivity/api/effect)
