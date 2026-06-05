---
title: Installation
description: Install EchoJS packages with Bun, npm, pnpm, or yarn.
---

# Installation

EchoJS ships as scoped npm packages under `@echojs-ecosystem/*`. Use the ones your app needs — a minimal SPA usually starts with **framework**, **hyperdom**, **reactivity**, and **router**.

## Requirements

- **Bun** 1.x or **Node** 20+ (examples in this repo use Bun)
- **TypeScript** 5.x recommended
- A bundler with ESM support (**Vite** is used in `apps/docs` and `apps/example`)

## Minimal set

Install core packages (same UI as on the home page — tabs + copy):

:::install @echojs-ecosystem/framework

:::install @echojs-ecosystem/reactivity

:::install @echojs-ecosystem/hyperdom

:::install @echojs-ecosystem/router

## Full stack (docs / lab parity)

Matches the provider pipeline in the official docs and example apps. Add each package you need:

:::install @echojs-ecosystem/query

:::install @echojs-ecosystem/ui

:::install @echojs-ecosystem/i18n

:::install @echojs-ecosystem/store

:::install @echojs-ecosystem/url-state

:::install @echojs-ecosystem/persist

## Working inside the EchoJS monorepo

If you clone `echojs-core`, apps already depend on workspace packages:

```bash
bun install
bun run dev --filter @echojs-ecosystem/docs    # documentation site (~3001)
bun run dev --filter example         # interactive lab
```

No publish step is required for local development — Vite resolves `workspace:*` dependencies.

## TypeScript paths (optional)

Apps in this monorepo map `@app/*`, `@pages/*`, `@widgets/*`, etc. via `tsconfig` paths. Copy the pattern from `apps/docs/tsconfig.json` when you split folders by layer.

> [!TIP]
> Enable `strictContextChecks: true` in `createEchoApp()` during development to catch views created outside router/model context.
