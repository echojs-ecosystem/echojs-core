---
title: cleanup
description: cleanup(fn) — register teardown inside an active scope.
package: "@echojs-ecosystem/reactivity"
---

# cleanup

```ts
function cleanup(fn: () => void): void
```

Registers `fn` to run when the current `scope()` disposes. **Must** be called inside an active scope or throws:

```
cleanup(fn) must be called inside scope()
```

`fn` must be a function or `TypeError` is thrown.

## Example

```ts
import { scope, cleanup } from "@echojs-ecosystem/reactivity";

scope(() => {
  const id = setInterval(tick, 1000);
  cleanup(() => clearInterval(id));
});
```

## See also

- [Guides: Scopes & Cleanup](/docs/packages/reactivity/guides/scopes-and-cleanup)
