---
title: Rendering & Teardown
description: Mount views with render() or mount(), and dispose cleanly on teardown.
package: "@echojs-ecosystem/hyperdom"
---

# Rendering & Teardown

HyperDOM provides two entry points for putting a view tree into the DOM: **`render()`** (low-level) and **`mount()`** (convenience wrapper).

## `render(view, container)`

```ts
import { render } from "@echojs-ecosystem/hyperdom";

const dispose = render(appView, document.getElementById("app")!);
// later: dispose() — removes listeners, effects, DOM
```

| Behavior | Detail |
| --- | --- |
| Clears container | Sets `container.textContent = ""` before mount |
| Returns `dispose` | Call to tear down effects, listeners, and nodes |
| Activates reactivity | Reactive children and props start tracking |

See [API: render](/docs/packages/hyperdom/api/render).

## `mount(view, options?)`

App-level helper that wraps `render` and optionally creates a container element:

```ts
import { mount } from "@echojs-ecosystem/hyperdom";

const { node, dispose } = mount(counterView, {
  container: document.getElementById("app")!,
  className: "app-root",
});
```

Returns `{ node: HTMLElement, dispose: () => void }`. The `node` may expose `__echoDispose` for framework interop.

See [API: mount](/docs/packages/hyperdom/api/mount).

> [!NOTE]
> Do not confuse this with **`mount` from `@echojs-ecosystem/hyperdom/lifecycle/mount`** — that is a lifecycle **child hook**, not an app mount helper. See [Lifecycle Mount](/docs/packages/hyperdom/guides/lifecycle-mount).

## What `dispose()` cleans up

Calling `dispose()`:

- Disposes reactive effects registered by dynamic children and props
- Removes event listeners attached through HyperDOM
- Runs lifecycle cleanup callbacks from `mount()` hooks
- Clears mounted DOM under the container

Always call `dispose()` when removing a view — leaked effects cause stale updates.

## Router and framework integration

In EchoJS apps, route views are mounted by the framework. Standalone demos and tests use `render()` / `mount()` directly.

## Related

- [Important Defaults](/docs/packages/hyperdom/guides/important-defaults)
- [Lifecycle Mount](/docs/packages/hyperdom/guides/lifecycle-mount)
- [Examples: Counter](/docs/packages/hyperdom/examples/counter)
