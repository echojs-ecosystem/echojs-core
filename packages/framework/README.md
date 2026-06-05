<div align="center">

# @echojs/framework

**One meta-package for the entire EchoJS ecosystem — bootstrap, providers, and tree-shakeable subpath imports.**

[![npm](https://img.shields.io/npm/v/@echojs/framework)](https://www.npmjs.com/package/@echojs/framework)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/framework)

</div>

---

Install once, import only what you need. `@echojs/framework` wires **router, query, i18n, UI, store, persist, form, hyperdom, and reactivity** through a single composition root — `createEchoApp`.

## Features

- **`createEchoApp`** — `.use()` providers, `.mount('#app')`, DI via `provide` / `inject`
- **Subpath exports** — import `@echojs/framework/router` instead of the full graph
- **Provider plugins** — router, query client, i18n, UI theme in one bootstrap
- **Tree-shakeable** — bundler pulls only the modules you import

## Install

```bash
npm install @echojs/framework
```

## Quick start

```ts
import { createEchoApp } from "@echojs/framework/app";
import { createRouterProvider } from "@echojs/framework/router";
import { routes } from "./routes";

createEchoApp({ root: () => AppShell() })
  .use(createRouterProvider({ routes }))
  .mount("#app");
```

## Subpath imports (recommended)

Import specific modules for minimal bundle size:

```ts
import { signal, effect } from "@echojs/framework/reactivity";
import { createRouter } from "@echojs/framework/router";
import { createForm } from "@echojs/framework/form";
import { h, render } from "@echojs/framework/hyperdom";
import { createStore } from "@echojs/framework/store";
import { createQuery } from "@echojs/framework/query";
import { Button } from "@echojs/framework/ui";
```

| Subpath | Package |
|---------|---------|
| `@echojs/framework/reactivity` | `@echojs/reactivity` |
| `@echojs/framework/hyperdom` | `@echojs/hyperdom` |
| `@echojs/framework/router` | `@echojs/router` |
| `@echojs/framework/router/hyperdom` | Router Hyperdom bindings |
| `@echojs/framework/form` | `@echojs/form` |
| `@echojs/framework/store` | `@echojs/store` |
| `@echojs/framework/query` | `@echojs/query` |
| `@echojs/framework/persist` | `@echojs/persist` |
| `@echojs/framework/url-state` | `@echojs/url-state` |
| `@echojs/framework/ui` | `@echojs/ui` |
| `@echojs/framework/app` | App bootstrap & providers |

## App API

| Export | Description |
|--------|-------------|
| `createEchoApp` | Application shell |
| `createProvider` / `defineProvider` | Custom providers |
| `createPlugin` / `definePlugin` | Plugin composition |
| `provide` / `inject` | Dependency injection |

## Related packages

Every `@echojs/*` runtime package is re-exported through subpaths. You can also install individual packages if you do not need the meta-package.

## Documentation

[echojs.dev/docs/packages/framework](https://echojs.dev/docs/packages/framework)
