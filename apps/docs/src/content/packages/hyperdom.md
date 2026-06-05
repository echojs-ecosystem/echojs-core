---
title: HyperDOM
description: Direct DOM rendering with views, models, and reactive children.
package: "@echojs-ecosystem/hyperdom"
keywords: [hyperdom, createView, createModel, h, Show]
---

:::package-overview hyperdom

:::install @echojs-ecosystem/hyperdom

## Quick start

```ts
import { signal } from "@echojs-ecosystem/reactivity";
import { createView, createModel, div, p } from "@echojs-ecosystem/hyperdom";

const CounterModel = createModel(() => {
  const count = signal(0);
  return { count, inc: () => count.update((n) => n + 1) };
});

export const CounterView = createView((vm) =>
  div(null, [p(null, () => `Count: ${vm.count.value()}`)]),
);
```

> [!tip]
> Keep `.view.ts` free of `fetch` — use models + `@echojs-ecosystem/query` for async data.
