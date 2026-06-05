---
title: Usage
description: Patterns for signals, computed, effects, batching, and scopes in EchoJS apps.
package: "@echojs-ecosystem/reactivity"
---

# Usage

`@echojs-ecosystem/reactivity` exposes a **small, strict** API: writable `signal`, readonly `computed`, eager `effect`, and helpers for batching and disposal.

## Execution model

| Primitive | When it runs |
| --- | --- |
| `effect(fn)` | **Immediately**, then again when tracked dependencies change |
| `computed(getter)` | **Lazily** — recalculates when read after invalidation |
| `signal.set` / `update` | Synchronously; may schedule subscribers |

Use `batch()` to apply several writes before effects flush once.

## Writable signal

```ts
import { signal } from "@echojs-ecosystem/reactivity";

const $count = signal(0);

$count.value(); // read (tracks dependents)
$count.peek();  // read without tracking
$count.set(10);
$count.update((n) => n + 1);

const stop = $count.subscribe(() => {
  console.log("changed:", $count.peek());
});
stop();
```

### Naming convention

EchoJS codebases often prefix signals with `$` (`$count`, `$user`) to distinguish them from plain values. This is convention only — not enforced by the library.

### `subscribe` contract

- Fires **only when the value changes** (`Object.is`)
- Does **not** call the listener on subscribe — run your logic once yourself if needed:

```ts
const log = () => console.log($count.peek());
log();
const stop = $count.subscribe(log);
```

## Computed (derived)

```ts
import { computed, signal } from "@echojs-ecosystem/reactivity";

const $first = signal("Echo");
const $greeting = computed(() => `Hello, ${$first.value()}!`);

$greeting.value(); // tracked read
```

`computed` returns a **readonly** signal — no `.set()` / `.update()`.

## Effects (side work)

```ts
import { effect, signal } from "@echojs-ecosystem/reactivity";

const $theme = signal<"light" | "dark">("light");

const stop = effect(() => {
  document.documentElement.dataset.theme = $theme.value();
});

// later
stop();
```

Inside an effect, use `.peek()` when you need a value **without** subscribing (e.g. compare previous vs next).

## Batching updates

```ts
import { batch, signal } from "@echojs-ecosystem/reactivity";

const $a = signal(0);
const $b = signal(0);

batch(() => {
  $a.set(1);
  $b.set(2);
});
// Dependents run once after the batch
```

Use in event handlers that touch multiple signals, or when syncing related fields.

## Scopes and cleanup

Group disposable work (effects, subscriptions, timers):

```ts
import { scope, effect, signal, cleanup } from "@echojs-ecosystem/reactivity";

const $id = signal("a");

const stopScope = scope(() => {
  effect(() => {
    console.log("active id:", $id.value());
  });

  cleanup(() => {
    /* runs when scope is disposed */
  });
});

stopScope();
```

`cleanup(fn)` **must** be called synchronously inside `scope()` — otherwise it throws.

## Readonly facades

Expose read-only access to callers:

```ts
const $user = signal({ name: "Ada" });
export const user = $user.readonly();
// user.set(...) — not on type / not on readonly facade
```

Or wrap any writable signal:

```ts
import { readonly } from "@echojs-ecosystem/reactivity";

const $internal = signal(0);
const $public = readonly($internal);
```

## Object state — immutable updates

`.value()` on objects/arrays returns **`DeepReadonly<T>`** in TypeScript — you cannot mutate fields in place.

```ts
const $state = signal({
  user: { name: "Ada" },
  tags: ["docs"],
});

// Wrong — TS error (and dev freeze may throw at runtime)
// $state.value().tags.push("api");

$state.update((prev) => ({
  ...prev,
  tags: [...prev.tags, "api"],
}));
```

> [!NOTE]
> In development (`NODE_ENV !== "production"`), object values stored in signals are **deep-frozen** to catch accidental mutation early.

## HyperDOM and models

In `createModel`, keep signals private and expose accessors on the VM:

```ts
export const createHomeModel = createModel((): HomeVM => {
  const $tab = signal(0);
  return {
    isTabActive: (i: number) => $tab.value() === i,
    setTab: (i: number) => $tab.set(i),
  };
}, "HomeModel");
```

HyperDOM views call `vm.isTabActive(0)` inside reactive children or props — dependencies track automatically.

## Intentionally not in v0

| Feature | Status |
| --- | --- |
| Public `trigger()` | Not exported — use `.set()` / `.update()` |
| Proxy / `mutate(draft => …)` deep writes | Not in core v0 |
| Callable signals (`$count()` as function) | Object API only |

## Related

- API reference — `/docs/packages/reactivity/api`
- State overview — `/docs/state/overview`
- Models — `/docs/architecture/models`
