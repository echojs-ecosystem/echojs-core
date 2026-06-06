---
title: Important Defaults
description: Mount pipeline, provider order, and bootstrap conventions for @echojs-ecosystem/framework.
package: "@echojs-ecosystem/framework"
---

# Important Defaults

The framework layer is intentionally thin — a few defaults shape how every EchoJS app boots.

## Bootstrap import path

Apps import from **`@echojs-ecosystem/framework/app`**, not the root barrel:

```ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";
```

The root `@echojs-ecosystem/framework` re-exports convenience modules for bundler aliases — use it in features when you want one dependency, not in `main.ts`.

## `awaitProviders` defaults to `true`

When `awaitProviders: true` (default), `mount()` **awaits** async `setup()` hooks on all registered providers before the first paint. Set `false` only when you intentionally render before async work completes.

## Root resolution order

At `mount()`:

1. Await pending provider setups (if `awaitProviders`)
2. Apply `body` attributes (`class` / `id` on `document.body`)
3. Resolve root: static `view` option **or** last provider with `resolveRoot()` (typically router)
4. Fold `wrapRoot` from providers outer → inner
5. `render()` into mount target

## Provider registration order matters

Each `.use(provider)` runs `setup(app)` **immediately** in registration order. Typical SPA order:

1. Query / i18n (data and locale before first navigation)
2. UI / theme (design tokens)
3. Router last (calls `start()` and supplies root view)

See [Providers](/docs/packages/framework/guides/providers).

## `mount()` returns a disposer

```ts
const dispose = await bootstrap();
// later
dispose();
```

The returned function tears down HyperDOM render and provider side effects.

## Strict context checks

Pass `strictContextChecks: true` in production apps to enforce `createView` / `createModel` usage from HyperDOM — catches accidental plain functions in the view tree.

## Next steps

- [createEchoApp](/docs/packages/framework/guides/create-echo-app) — full options table
- [Subpath Imports](/docs/packages/framework/guides/subpath-imports) — barrel vs narrow imports
