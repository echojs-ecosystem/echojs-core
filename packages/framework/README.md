<div align="center">

# @echojs-ecosystem/framework

**One meta-package for the entire EchoJS ecosystem — bootstrap, providers, and tree-shakeable subpath imports.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/framework)](https://www.npmjs.com/package/@echojs-ecosystem/framework)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/framework)

</div>

---

Install once, import only what you need. `@echojs-ecosystem/framework` wires **router, query, i18n, UI, store, persist, form, hyperdom, and reactivity** through a single composition root — `createEchoApp`.

## Features

- **`createEchoApp`** — `.use()` providers, `.mount('#app')`, DI via `provide` / `inject`
- **Subpath exports** — import `@echojs-ecosystem/framework/router` instead of the full graph
- **Provider plugins** — router, query client, i18n, UI theme in one bootstrap
- **Tree-shakeable** — bundler pulls only the modules you import

## Install

```bash
npm install @echojs-ecosystem/framework
```

## Quick start

```ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";
import { createRouterProvider } from "@echojs-ecosystem/framework/router";
import { routes } from "./routes";

createEchoApp({ root: () => AppShell() })
  .use(createRouterProvider({ routes }))
  .mount("#app");
```

## Subpath imports (recommended)

Import specific modules for minimal bundle size:

```ts
import { signal, effect } from "@echojs-ecosystem/framework/reactivity";
import { createRouter } from "@echojs-ecosystem/framework/router";
import { createForm } from "@echojs-ecosystem/framework/form";
import { h, render } from "@echojs-ecosystem/framework/hyperdom";
import { createStore } from "@echojs-ecosystem/framework/store";
import { createQuery } from "@echojs-ecosystem/framework/query";
import { Button } from "@echojs-ecosystem/framework/ui";
```

| Subpath | Package |
|---------|---------|
| `@echojs-ecosystem/framework/reactivity` | `@echojs-ecosystem/reactivity` |
| `@echojs-ecosystem/framework/hyperdom` | `@echojs-ecosystem/hyperdom` |
| `@echojs-ecosystem/framework/router` | `@echojs-ecosystem/router` |
| `@echojs-ecosystem/framework/router/hyperdom` | Router Hyperdom bindings |
| `@echojs-ecosystem/framework/form` | `@echojs-ecosystem/form` |
| `@echojs-ecosystem/framework/store` | `@echojs-ecosystem/store` |
| `@echojs-ecosystem/framework/query` | `@echojs-ecosystem/query` |
| `@echojs-ecosystem/framework/persist` | `@echojs-ecosystem/persist` |
| `@echojs-ecosystem/framework/url-state` | `@echojs-ecosystem/url-state` |
| `@echojs-ecosystem/framework/ui` | `@echojs-ecosystem/ui` |
| `@echojs-ecosystem/framework/app` | App bootstrap & providers |

## App API

| Export | Description |
|--------|-------------|
| `createEchoApp` | Application shell |
| `createProvider` / `defineProvider` | Custom providers |
| `createPlugin` / `definePlugin` | Plugin composition |
| `provide` / `inject` | Dependency injection |

## Related packages

Every `@echojs-ecosystem/*` runtime package is re-exported through subpaths. You can also install individual packages if you do not need the meta-package.

## Documentation

[echojs.dev/docs/packages/framework](https://echojs.dev/docs/packages/framework)
