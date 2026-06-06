---
title: Events & Handlers
description: DOM events with typed currentTarget, cleanup on unmount, and on helpers.
package: "@echojs-ecosystem/hyperdom"
---

# Events & Handlers

Use `onClick`, `onInput`, `onChange`, `onSubmit`, and other `on*` props — mapped to DOM event names with automatic cleanup on unmount.

## Typed handlers per element

DSL tags infer `currentTarget` from the element type:

```ts
button({ onClick: (e) => console.log(e.currentTarget.disabled) }, "Save");

input({
  value: () => $query.value(),
  onInput: (e) => $query.set((e.currentTarget as HTMLInputElement).value),
});
```

Prefer element-specific `onClick` / `onInput` on tags over generic helpers when you want full typing.

## `on` helper

Small prop-bag builders for common events:

```ts
import { on } from "@echojs-ecosystem/hyperdom";

button({ ...on.click(() => {}) }, "Click");
form({ ...on.submit(handleSubmit) }, fields);
```

Available: `on.click`, `on.input`, `on.change`, `on.submit`. See [API: cx](/docs/packages/hyperdom/api/cx) for `on`, `aria`, and `data` helpers.

## Cleanup on teardown

Event listeners are removed when:

- The node is unmounted from the tree
- `render()` / component `dispose()` runs

No manual `removeEventListener` in typical view code.

## Handlers are not reactive

Pass **plain functions** as event handlers. Do not wrap handlers in `() => fn` — HyperDOM does not re-bind reactive handler getters (unlike `class` or `value`).

If a handler needs current signal values, read them inside the handler body:

```ts
button({
  onClick: () => {
    if ($pending.peek()) return;
    submit();
  },
}, "Submit");
```

Use `.peek()` when you need the value without registering a reactive dependency on the handler itself.

## Related

- [Reactive Props](/docs/packages/hyperdom/guides/reactive-props)
- [Rendering & Teardown](/docs/packages/hyperdom/guides/rendering-and-teardown)
- [API: DSL Tags](/docs/packages/hyperdom/api/dsl)
