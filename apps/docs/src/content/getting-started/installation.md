---
title: Installation
description: Install EchoJS packages with Bun, npm, pnpm, or yarn.
---

# Installation

EchoJS ships as scoped npm packages under `@echojs-ecosystem/*`. For new apps,
install **`@echojs-ecosystem/framework`** once — it re-exports the full runtime
(`reactivity`, `hyperdom`, `router`, `query`, `i18n`, `store`, `ui`, …) via
subpath imports.

## Requirements

- **Bun** 1.x or **Node** 20+ (examples in this repo use Bun)
- **TypeScript** 5.x recommended
- A bundler with ESM support (**Vite** is used in `apps/docs` and
  `apps/example`)

## Recommended — one package

:::install @echojs-ecosystem/framework

Then import subpaths, for example:

- `@echojs-ecosystem/framework/app` — bootstrap
- `@echojs-ecosystem/framework/reactivity` — signals
- `@echojs-ecosystem/framework/query` — data fetching
- `@echojs-ecosystem/framework/i18n` — translations
- `@echojs-ecosystem/framework/ui/button` — UI components

## À la carte (optional)

If you prefer explicit dependencies instead of the meta-package:

:::install @echojs-ecosystem/reactivity

:::install @echojs-ecosystem/hyperdom

:::install @echojs-ecosystem/router

## Full stack extras

When not using `framework`, add each package you need:

:::install @echojs-ecosystem/query

:::install @echojs-ecosystem/i18n

:::install @echojs-ecosystem/store

:::install @echojs-ecosystem/url-state

:::install @echojs-ecosystem/persist

:::install @echojs-ecosystem/ui

## Working inside the EchoJS monorepo

If you clone `echojs-core`, apps already depend on workspace packages:

```bash
bun install
bun run dev --filter @echojs-ecosystem/docs    # documentation site (~3001)
bun run dev --filter example         # interactive lab
```

No publish step is required for local development — Vite resolves `workspace:*`
dependencies.

## TypeScript paths (optional)

Apps in this monorepo map `@app/*`, `@pages/*`, `@widgets/*`, etc. via
`tsconfig` paths. Copy the pattern from `apps/docs/tsconfig.json` when you split
folders by layer.

> [!TIP] Enable `strictContextChecks: true` in `createEchoApp()` during
> development to catch views created outside router/model context.
