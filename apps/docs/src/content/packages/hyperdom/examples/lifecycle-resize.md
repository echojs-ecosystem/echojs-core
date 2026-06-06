---
title: Lifecycle Mount
description: ResizeObserver setup with lifecycle mount() cleanup.
package: "@echojs-ecosystem/hyperdom"
---

# Lifecycle Mount

Use the lifecycle `mount` child for DOM APIs that need setup after insert and cleanup on unmount.

## Problem

Observe element size changes with `ResizeObserver` and disconnect when the view tears down.

## Code

```ts
import { mount } from "@echojs-ecosystem/hyperdom/lifecycle/mount";
import { div } from "@echojs-ecosystem/hyperdom";

const ResizablePanel = createView(() =>
  div(
    { ref: (el) => { panelEl = el; } },
    [
      mount(() => {
        if (!panelEl) return;
        const ro = new ResizeObserver((entries) => {
          onResize(entries[0].contentRect);
        });
        ro.observe(panelEl);
        return () => ro.disconnect();
      }),
      content(),
    ],
  ),
  "ResizablePanel",
);
```

## Callback contract

```ts
mount(() => {
  // runs after DOM insert
  return () => {
    // runs on unmount
  };
});
```

## Takeaways

- Import from `@echojs-ecosystem/hyperdom/lifecycle/mount` — not the app `mount()` helper
- Must appear as a **child** in the tree, not at module scope
- Returned cleanup integrates with HyperDOM disposal

## Related

- [Guides: Lifecycle Mount](/docs/packages/hyperdom/guides/lifecycle-mount)
- [API: lifecycle/mount](/docs/packages/hyperdom/api/lifecycle-mount)
- [Guides: Refs & DOM Access](/docs/packages/hyperdom/guides/refs-and-dom-access)
