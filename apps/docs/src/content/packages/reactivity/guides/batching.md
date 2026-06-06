---
title: Batching
description: Coalesce multiple signal writes so dependents notify once.
package: "@echojs-ecosystem/reactivity"
---

# Batching

`batch(fn)` runs a function and **defers reactive notifications** until the function completes. Dependents see all writes together and flush **once**.

## Basic usage

```ts
import { batch, signal } from "@echojs-ecosystem/reactivity";

const $a = signal(0);
const $b = signal(0);

batch(() => {
  $a.set(1);
  $b.set(2);
});
// Effects that depend on $a and/or $b run once after the batch
```

## When to batch

- Event handlers that touch **multiple signals**
- Syncing related fields (form slices, pagination + filter)
- Avoiding intermediate UI states during a logical update

```ts
const applyFilters = (next: Filters) => {
  batch(() => {
    $page.set(1);
    $query.set(next.query);
    $sort.set(next.sort);
  });
};
```

## Return value

`batch(fn)` returns whatever `fn()` returns:

```ts
const result = batch(() => {
  $a.set(1);
  return $a.peek();
});
```

## Related

- [Important Defaults](/docs/packages/reactivity/guides/important-defaults)
- [API: batch](/docs/packages/reactivity/api/batch)
