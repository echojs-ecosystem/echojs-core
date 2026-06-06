---
title: API Reference
description: Complete @echojs-ecosystem/framework public API index.
package: "@echojs-ecosystem/framework"
---

# API Reference

Public exports from `@echojs-ecosystem/framework/app`:

```ts
import {
  createEchoApp,
  defineAppRoot,
  createProvider,
  defineProvider,
  definePlugin,
  createPlugin,
  ROUTER_KEY,
  injectRouter,
  isEchoRouter,
} from "@echojs-ecosystem/framework/app";
```

## Functions

| Export | Description |
| --- | --- |
| [createEchoApp](/docs/packages/framework/api/create-echo-app) | Build app; overloads: none, `EchoRootSource`, `EchoAppOptions` |
| [createProvider](/docs/packages/framework/api/create-provider) | Provider factory with `install` / `setup` / `wrapRoot` |
| [provide / inject](/docs/packages/framework/api/provide-inject) | `ROUTER_KEY`, `injectRouter`, `isEchoRouter` |

## App surface

| Export | Description |
| --- | --- |
| [createEchoApp](/docs/packages/framework/api/create-echo-app) | `EchoApp` methods: `use`, `provide`, `inject`, `mount` |
| [createProvider](/docs/packages/framework/api/create-provider) | `EchoProvider`, `CreateProviderOptions` |

## Barrel

| Export | Description |
| --- | --- |
| [App Exports](/docs/packages/framework/api/app-exports) | Root `@echojs-ecosystem/framework` re-exports |

## Guides

Conceptual docs live under [Guides & Concepts](/docs/packages/framework/guides/important-defaults):

- [Important Defaults](/docs/packages/framework/guides/important-defaults)
- [createEchoApp](/docs/packages/framework/guides/create-echo-app)
- [Providers](/docs/packages/framework/guides/providers)
