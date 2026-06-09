---
title: Philosophy & Naming
description: Signal-native utility naming — no use* prefix, no hook rules.
package: '@echojs-ecosystem/utils'
---

# Philosophy & Naming

`@echojs-ecosystem/utils` is inspired by
[ReactUse](https://reactuse.org/new/docs/introduction) and VueUse ergonomics,
but uses **plain camelCase names** (`windowSize`, `debounce`) — not the `use*`
hook convention. Implementation is **EchoJS-native**:

- Built on `@echojs-ecosystem/reactivity` signals
- No React, Vue, Solid, or Virtual DOM
- No hook rules — call composables anywhere
- Explicit `dispose()` for side effects

## Composables, not hooks

```ts
// ✅ In a model factory
export const createPanelModel = () => {
  const size = windowSize()
  cleanup.add(() => size.dispose())
  return { size }
}

// ✅ In a plain module
const connection = online()
```

## Return shape

| Member | Role |
| ------ | ---- |
| `value()` / `width()` / … | Read current state (tracks in effects when using `.value()` on signals) |
| `$value` / `$width` / … | Underlying signal for bindings |
| `dispose()` | Remove listeners, timers, observers |

State-only utilities (`toggle`, `counter`) may use a no-op `dispose()`.

## Inspired, not copied

APIs are designed for EchoJS ergonomics. Source is original — we do not ship
ReactUse code.
