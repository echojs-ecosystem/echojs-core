<div align="center">

# @echojs-ecosystem/reactivity

**Fine-grained reactive primitives — signals, computed, effects, and batching.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/reactivity)](https://www.npmjs.com/package/@echojs-ecosystem/reactivity)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/reactivity)

</div>

---

The reactive foundation of EchoJS. Built on a fast signal engine, wrapped in a **strict, object-oriented API** that encourages predictable updates and immutable patterns.

## Features

- **`signal`** — writable cells with `.value()`, `.set()`, `.update()`, `.peek()`, `.subscribe()`
- **`computed`** — lazy derived values with automatic dependency tracking
- **`effect` / `scope`** — side effects with automatic cleanup
- **`batch`** — coalesce multiple writes into one notification wave
- **`DeepReadonly`** — object reads cannot be mutated through `.value()`; use `.set()` / `.update()`

## Install

```bash
npm install @echojs-ecosystem/reactivity
# bun add @echojs-ecosystem/reactivity
# pnpm add @echojs-ecosystem/reactivity
```

## Quick start

```ts
import { signal, computed, effect, batch } from "@echojs-ecosystem/reactivity";

const $count = signal(0);
const $double = computed(() => $count.value() * 2);

effect(() => {
  console.log("count:", $count.value(), "double:", $double.value());
});

batch(() => {
  $count.set(1);
  $count.update((n) => n + 1);
});
```

## API

| Export | Description |
|--------|-------------|
| `signal(initial)` | Writable reactive cell |
| `computed(getter)` | Readonly derived signal |
| `effect(fn)` | Runs immediately, re-runs on dependency changes; returns disposer |
| `scope(fn)` | Effect scope — nested effects cleaned up together |
| `batch(fn)` | Defer reactions until the batch completes |
| `readonly($sig)` | Readonly facade without `.set()` / `.update()` |
| `isSignal` / `isReadonlySignal` | Runtime type guards |

### Design notes

- **Write only via `.set()` / `.update()`** — no public `trigger()` API
- **`subscribe()`** fires on changes only, not on initial subscribe
- **Dev mode** deep-freezes object/array values written to signals

## Related packages

| Package | Role |
|---------|------|
| [`@echojs-ecosystem/hyperdom`](https://www.npmjs.com/package/@echojs-ecosystem/hyperdom) | DOM views wired to signals |
| [`@echojs-ecosystem/store`](https://www.npmjs.com/package/@echojs-ecosystem/store) | Structured app state on top of signals |
| [`@echojs-ecosystem/framework`](https://www.npmjs.com/package/@echojs-ecosystem/framework) | Meta-package — entire ecosystem via subpath imports |

## Documentation

[echojs.dev/docs/packages/reactivity](https://echojs.dev/docs/packages/reactivity)
