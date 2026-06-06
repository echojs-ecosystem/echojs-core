---
title: Lifecycle Mount
description: After-insert hooks as mount() children with optional cleanup.
package: "@echojs-ecosystem/hyperdom"
---

# Lifecycle Mount

The lifecycle **`mount`** hook runs **after** a node is inserted into the DOM. Import it from the dedicated subpath — not the app `mount()` helper on the main entry.

```ts
import { mount } from "@echojs-ecosystem/hyperdom/lifecycle/mount";
```

> [!WARNING]
> `mount` from `@echojs-ecosystem/hyperdom` is the **app mount helper** (`mount(view, options)`). The lifecycle hook lives at `@echojs-ecosystem/hyperdom/lifecycle/mount`.

## Usage as a child

Must run **while rendering** — as a child in the tree, not at module top level:

```ts
import { mount } from "@echojs-ecosystem/hyperdom/lifecycle/mount";

div(null, [
  mount(() => {
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return () => ro.disconnect();
  }),
  content(),
]);
```

## Callback contract

```ts
mount(() => {
  // setup after DOM insert
  return () => {
    // optional cleanup on unmount
  };
});
```

| Return | Behavior |
| --- | --- |
| `void` | No extra cleanup |
| `() => void` | Registered as unmount handler |

The callback runs inside an active cleanup scope. Returned cleanup functions integrate with HyperDOM's disposal chain.

## Strict context

In strict mode, lifecycle `mount()` must be called inside `createView`, `render`, or an active scope — same rules as `h()`.

Error if violated:

```
hyperdom: mount() called outside of view/render context
```

See [Important Defaults](/docs/packages/hyperdom/guides/important-defaults).

## When to use

| Use lifecycle `mount` | Use `ref` |
| --- | --- |
| Observers, intervals, subscriptions | One-time DOM setup on insert |
| Needs cleanup on unmount | Scroll/focus on a specific element |

## Related

- [API: lifecycle/mount](/docs/packages/hyperdom/api/lifecycle-mount)
- [Examples: Lifecycle Mount](/docs/packages/hyperdom/examples/lifecycle-resize)
- [Rendering & Teardown](/docs/packages/hyperdom/guides/rendering-and-teardown)
