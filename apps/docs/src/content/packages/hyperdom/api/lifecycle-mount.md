---
title: lifecycle/mount
description: mount(fn) — after-insert lifecycle child with optional cleanup.
package: "@echojs-ecosystem/hyperdom"
---

# lifecycle/mount

```ts
import { mount } from "@echojs-ecosystem/hyperdom/lifecycle/mount";

type MountCleanup = void | (() => void);

function mount(fn: () => MountCleanup): Child
```

Lifecycle **on-mount hook** implemented as a `Child`. Runs after the node is inserted and bindings are activated.

## Usage

```ts
div(null, [
  mount(() => {
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return () => ro.disconnect();
  }),
  content(),
]);
```

Must be called **while rendering** — as a child in the tree:

```ts
// ✅ inside createView or render callback
mount(() => { /* setup */ });

// ❌ module top level — throws in strict mode
```

## Callback contract

| Return | Behavior |
| --- | --- |
| `void` | Setup only |
| `() => void` | Registered as unmount cleanup |

## Errors

```
hyperdom: mount() called outside of view/render context
```

## See also

- [Guides: Lifecycle Mount](/docs/packages/hyperdom/guides/lifecycle-mount)
- [mount (app helper)](/docs/packages/hyperdom/api/mount)
