---
title: Reactivity
description:
  Fine-grained signals, computed values, and effects — the reactive foundation
  of EchoJS.
package: '@echojs-ecosystem/reactivity'
keywords: [signals, computed, effect, batch, scope, reactivity]
---

:::package-overview reactivity

:::install @echojs-ecosystem/reactivity

## Key APIs

| Export | Role |
| ------ | ---- |
| [`signal`](/docs/packages/reactivity/api/signal) | Writable reactive cell — `.value()`, `.set()`, `.update()` |
| [`computed`](/docs/packages/reactivity/api/computed) | Cached derived value from tracked reads |
| [`effect`](/docs/packages/reactivity/api/effect) | Side effect that re-runs when dependencies change |
| [`batch`](/docs/packages/reactivity/api/batch) | Coalesce multiple writes before notifications |
| [`scope`](/docs/packages/reactivity/api/scope) | Group effects with `cleanup()` for disposal |
| [`createEventEmitter`](/docs/packages/reactivity/api/event-emitter) | Typed chainable event bus (`on`, `emit`, `once`) |

## Common patterns

- **Models** — keep writable state in `createModel` as signals; expose read-only
  getters to views.
- **Derived UI** — prefer `computed` over manual subscriptions; HyperDOM tracks
  `.value()` in view trees automatically.
- **Async** — use `@echojs-ecosystem/async` for server cache; reactivity is for
  local graph state, not HTTP lifecycles.

> [!tip] Read [Important Defaults](/docs/packages/reactivity/guides/important-defaults)
> before mixing signals with stores or queries.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Installation](/docs/packages/reactivity/installation) | Package install |
| [Functions](/docs/packages/reactivity/functions) | Full index by category — links to each API page |
| [Guides & Concepts](/docs/packages/reactivity/guides/important-defaults) | Patterns and defaults |

Each API page follows: **Usage** → **Type Declarations** → **API** (see [signal](/docs/packages/reactivity/api/signal) for the reference layout).
