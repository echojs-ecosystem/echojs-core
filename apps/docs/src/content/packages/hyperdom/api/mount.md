---
title: mount
description: mount(view, options?) — app mount helper returning node and dispose.
package: "@echojs-ecosystem/hyperdom"
---

# mount

```ts
interface MountResult {
  node: HTMLElement;
  dispose: () => void;
}

function mount(
  view: Child,
  options?: { container?: HTMLElement; className?: string },
): MountResult
```

**App mount helper** on the main package entry. Wraps `render()` and optionally creates a container element.

## Example

```ts
import { mount } from "@echojs-ecosystem/hyperdom";

const { node, dispose } = mount(counterView, {
  container: document.getElementById("app")!,
  className: "app-root",
});
```

| Option | Default |
| --- | --- |
| `container` | New `<div>` element |
| `className` | Applied to `node` when set |

The returned `node` may expose `__echoDispose` for framework unmount interop.

## Not lifecycle mount

This is **not** the lifecycle hook. For after-insert children use:

```ts
import { mount } from "@echojs-ecosystem/hyperdom/lifecycle/mount";
```

See [lifecycle/mount](/docs/packages/hyperdom/api/lifecycle-mount).

## See also

- [render](/docs/packages/hyperdom/api/render)
- [Guides: Rendering & Teardown](/docs/packages/hyperdom/guides/rendering-and-teardown)
