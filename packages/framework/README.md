<div align="center">

# @echojs-ecosystem/framework

**One install for the entire EchoJS runtime — bootstrap, providers, and tree-shakeable subpath imports.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/framework)](https://www.npmjs.com/package/@echojs-ecosystem/framework)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/framework)

</div>

---

Install **`@echojs-ecosystem/framework`** once. Import only the subpaths you need — the bundler pulls a minimal graph from the underlying packages.

## Install

```bash
npm install @echojs-ecosystem/framework
```

No separate installs for `query`, `i18n`, `router`, etc. — they are bundled as dependencies and re-exported through subpaths.

## App bootstrap

```ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";
import { createQueryProvider } from "@echojs-ecosystem/framework/query";
import { createI18nProvider } from "@echojs-ecosystem/framework/i18n";
import { routes } from "./routes";
import en from "./locales/en.json";

createEchoApp({ strictContextChecks: true })
  .use(createQueryProvider({ defaultOptions: { queries: { staleTime: 60_000 } } }))
  .use(createI18nProvider({ locales: { en }, fallbackLocale: "en" }))
  .use(routerProvider)
  .mount("#app");
```

## Subpath map

| Subpath | Underlying package |
|---------|-------------------|
| `@echojs-ecosystem/framework/app` | App shell (`createEchoApp`, providers, DI) |
| `@echojs-ecosystem/framework/reactivity` | Signals, computed, effects |
| `@echojs-ecosystem/framework/hyperdom` | Views, `h()`, `createModel` |
| `@echojs-ecosystem/framework/router` | SPA router |
| `@echojs-ecosystem/framework/router/hyperdom` | `NavLink`, `createRouter` |
| `@echojs-ecosystem/framework/store` | Client state |
| `@echojs-ecosystem/framework/query` | Async cache, mutations |
| `@echojs-ecosystem/framework/form` | Fields & validation |
| `@echojs-ecosystem/framework/persist` | localStorage, cookies, IDB |
| `@echojs-ecosystem/framework/url-state` | Typed URL params |
| `@echojs-ecosystem/framework/i18n` | Translations & Intl |
| `@echojs-ecosystem/framework/ui` | UI barrel |
| `@echojs-ecosystem/framework/ui/button` | Button (and other UI subpaths) |
| `@echojs-ecosystem/framework/devtools` | DevTools registry (optional) |
| `@echojs-ecosystem/framework/core` | Low-level component runtime |

### UI granular imports

```ts
import { Button } from "@echojs-ecosystem/framework/ui/button";
import { Field } from "@echojs-ecosystem/framework/ui/field";
import { UIProvider } from "@echojs-ecosystem/framework/ui/provider";
import { createTheme } from "@echojs-ecosystem/framework/ui/theme";
```

Available UI subpaths: `button`, `icon-button`, `input`, `input-mask`, `input-otp`, `input-tags`, `textarea`, `label`, `field`, `checkbox`, `provider`, `theme`, `core`, `utils`, `primitives`.

## Typical imports

```ts
import { signal, computed } from "@echojs-ecosystem/framework/reactivity";
import { div, button, createView } from "@echojs-ecosystem/framework/hyperdom";
import { createQuery } from "@echojs-ecosystem/framework/query";
import { createI18nProvider } from "@echojs-ecosystem/framework/i18n";
import { createStore } from "@echojs-ecosystem/framework/store";
import { withLocalStorage } from "@echojs-ecosystem/framework/persist";
```

## When to skip framework

Use individual `@echojs-ecosystem/*` packages if you want explicit `package.json` dependencies per layer (e.g. library that only needs `reactivity`).

## Documentation

[echojs.dev/docs/packages/framework](https://echojs.dev/docs/packages/framework)
