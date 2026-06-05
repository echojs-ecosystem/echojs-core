---
title: Installation
description: Install @echojs-ecosystem/hyperdom with @echojs-ecosystem/reactivity.
package: "@echojs-ecosystem/hyperdom"
---

# Installation

HyperDOM is the **view layer** of EchoJS. It depends on `@echojs-ecosystem/reactivity` for dynamic regions and reactive props.

## Requirements

- **ESM** bundler (Vite, Bun, etc.)
- **`@echojs-ecosystem/reactivity`** — required peer-style dependency (workspace or npm)

## Package managers

:::install @echojs-ecosystem/hyperdom

:::install @echojs-ecosystem/reactivity

> [!TIP]
> In EchoJS apps you usually install **framework** + **router** at the root; HyperDOM is still imported directly in views and widgets.

## Monorepo (echojs-core)

```json
{
  "dependencies": {
    "@echojs-ecosystem/hyperdom": "workspace:*",
    "@echojs-ecosystem/reactivity": "workspace:*"
  }
}
```

```bash
bun install
```

## Smoke test

```ts
import { render, div, button } from "@echojs-ecosystem/hyperdom";
import { signal } from "@echojs-ecosystem/reactivity";

const $n = signal(0);

const dispose = render(
  div(null, [
    button({ onClick: () => $n.update((v) => v + 1) }, () => String($n.value())),
  ]),
  document.getElementById("app")!,
);

// dispose() when tearing down
```

## Strict context (recommended)

EchoJS apps enable checks via framework:

```ts
createEchoApp({ strictContextChecks: true });
```

Or manually:

```ts
import { setStrictContextChecks } from "@echojs-ecosystem/hyperdom";

setStrictContextChecks(true);
```

## Subpath export

Lifecycle hook as a child (advanced):

```ts
import { mount } from "@echojs-ecosystem/hyperdom/lifecycle/mount";
```
