---
title: Installation
description: Add @echojs/architect to an EchoJS monorepo app.
package: "@echojs/architect"
---

# Installation

## Workspace app (this monorepo)

```bash
cd apps/docs   # or apps/example
bun add -D @echojs/architect
```

`@echojs/architect` is a workspace package — no npm publish required for local development.

## Scripts

```json
{
  "scripts": {
    "architect": "echo-architect lint",
    "architect:watch": "echo-architect lint --watch",
    "architect:fix": "echo-architect lint --fix"
  }
}
```

## Config file

Create `architect.config.ts` next to `package.json`:

```ts
import { abstraction, defineConfig, dependenciesDirection } from "@echojs/architect";

export default defineConfig({
  baseUrl: "src",
  root: abstraction({
    name: "src",
    children: {
      pages: abstraction("pages"),
      shared: abstraction("shared"),
    },
    rules: [dependenciesDirection(["pages", "shared"])],
  }),
});
```

## TypeScript

Architect resolves imports using your app `tsconfig.json` paths (`@pages/*`, `@shared/*`, …). Keep aliases aligned with Vite `resolve.alias`.

## See also

- [Usage](/docs/packages/architect/usage)
- [Example config](/docs/packages/architect/example)
