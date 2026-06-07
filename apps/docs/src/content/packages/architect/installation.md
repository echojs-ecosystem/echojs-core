---
title: Installation
description: Add @echojs-ecosystem/architect as a dev dependency.
package: '@echojs-ecosystem/architect'
---

# Installation

Architect is a **standalone dev tool** — package-only install, no framework
subpath.

## Quick install

:::install @echojs-ecosystem/architect

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
import {
  abstraction,
  defineConfig,
  dependenciesDirection,
} from '@echojs-ecosystem/architect'

export default defineConfig({
  baseUrl: 'src',
  root: abstraction({
    name: 'src',
    children: {
      pages: abstraction('pages'),
      shared: abstraction('shared'),
    },
    rules: [dependenciesDirection(['pages', 'shared'])],
  }),
})
```

## TypeScript

Architect resolves imports using your app `tsconfig.json` paths (`@pages/*`,
`@core/*`, …). Keep aliases aligned with Vite `resolve.alias`.

## Verify

```bash
bun run architect
```

## Next steps

- [Important Defaults](/docs/packages/architect/guides/important-defaults)
- [Layer Rules](/docs/packages/architect/guides/layers)
- [Examples](/docs/packages/architect/example)
