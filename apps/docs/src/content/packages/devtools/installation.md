---
title: Installation
description: Install @echojs-ecosystem/devtools for runtime inspection infrastructure.
package: "@echojs-ecosystem/devtools"
---

# Installation

DevTools core is a **runtime registry** (no UI overlay yet). Install as a dependency or import via `@echojs-ecosystem/framework/devtools`.

:::install @echojs-ecosystem/devtools

## Via framework

```bash
npm install @echojs-ecosystem/framework
```

```ts
import { setDevtoolsEnabled } from "@echojs-ecosystem/framework/devtools";
```

## Production

Disable at bootstrap — all public APIs become no-ops with zero overhead:

```ts
import { setDevtoolsEnabled } from "@echojs-ecosystem/devtools";

setDevtoolsEnabled(import.meta.env.DEV);
```

## See also

- [DevTools overview](/docs/packages/devtools)
- [Usage](/docs/packages/devtools/usage)
