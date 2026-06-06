---
title: createModel
description: createModel(factory, name) — model factory with model context and displayName.
package: "@echojs-ecosystem/hyperdom"
---

# createModel

```ts
function createModel<VM>(
  factory: () => VM,
  name: string,
): (() => VM) & { displayName: string }
```

Returns a callable model factory that runs `factory` inside **model context**. Sets `displayName`.

Also exports **`isInModelContext()`** — returns `true` while the factory runs.

## Example

```ts
import { createModel } from "@echojs-ecosystem/hyperdom";
import { signal } from "@echojs-ecosystem/reactivity";

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0);
  return {
    $count,
    increment: () => $count.update((n) => n + 1),
  };
}, "CounterModel");
```

Each call to `createCounterModel()` creates a fresh VM instance.

## See also

- [Guides: Models & Components](/docs/packages/hyperdom/guides/models-and-components)
- [createView](/docs/packages/hyperdom/api/create-view)
- [Reactivity package](/docs/packages/reactivity)
