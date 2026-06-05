---
title: Reactivity
description: Fine-grained signals, computed values, and effects for EchoJS.
package: "@echojs-ecosystem/reactivity"
keywords: [signals, computed, effect, batch, scope]
---

:::package-overview reactivity

:::install @echojs-ecosystem/reactivity

## Quick start

```ts
import { signal, computed, effect } from "@echojs-ecosystem/reactivity";

const count = signal(0);
const double = computed(() => count.value() * 2);
effect(() => console.log(double.value()));
count.set(1);
```

> [!tip]
> Use **Playground** for a live demo and **Example** for patterns from `apps/example`.
