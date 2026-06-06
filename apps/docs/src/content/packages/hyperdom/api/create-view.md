---
title: createView
description: createView(viewFn, name) — view factory with view context and displayName.
package: "@echojs-ecosystem/hyperdom"
---

# createView

```ts
function createView<VM = void>(
  viewFn: (vm: VM) => Child,
  name: string,
): (vm: VM) => Child & { displayName: string }
```

Returns a view function that runs `viewFn` inside **view context**. Sets `displayName` for debugging and strict checks.

## Example

```ts
import { createView, button } from "@echojs-ecosystem/hyperdom";

export const CounterView = createView((vm: CounterVM) =>
  button({ onClick: vm.increment }, () => String(vm.$count.value())),
  "CounterView",
);
```

`CounterView.displayName === "CounterView"`.

## Why use it

- Enables strict `h()` / lifecycle `mount()` checks
- Identifies views in devtools and error messages
- EchoJS convention — keeps presentation separate from models

## See also

- [Guides: Models & Components](/docs/packages/hyperdom/guides/models-and-components)
- [createModel](/docs/packages/hyperdom/api/create-model)
- [isInViewContext](/docs/packages/hyperdom/api/strict-context)
