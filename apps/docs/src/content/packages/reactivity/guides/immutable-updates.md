---
title: Immutable Updates
description: DeepReadonly reads, spread updates, and dev-time freeze behavior.
package: "@echojs-ecosystem/reactivity"
---

# Immutable Updates

Signal reads on objects and arrays return **`DeepReadonly<T>`** in TypeScript. Updates must produce **new references** — never mutate in place.

## Why immutability

Predictable change detection: subscribers compare values with `Object.is`. In-place mutation of nested fields does not change the top-level reference, so dependents may not run — and bugs become hard to trace.

## Correct updates

```ts
const $state = signal({
  user: { name: "Ada" },
  tags: ["docs"],
});

$state.update((prev) => ({
  ...prev,
  tags: [...prev.tags, "api"],
}));

$state.update((prev) => ({
  ...prev,
  user: { ...prev.user, name: "Grace" },
}));
```

## Wrong — in-place mutation

```ts
// TS error on .value() result
// $state.value().tags.push("api");

// Runtime throw in development (deep-freeze)
```

## Dev-only deep freeze

When `NODE_ENV !== "production"`, object/array values assigned via `.set()` / `.update()` are **deep-frozen** after write. In-place mutation throws at runtime (typically `TypeError` in strict mode).

Production builds skip freeze for performance — still follow immutable updates for correctness.

## ReadValue type

| Stored type | `.value()` / `.peek()` result |
| --- | --- |
| Primitives | `T` |
| Objects / arrays | `DeepReadonly<T>` |

See [API: Types](/docs/packages/reactivity/api/types).

## Related

- [Signals](/docs/packages/reactivity/guides/signals)
- [Important Defaults](/docs/packages/reactivity/guides/important-defaults)
