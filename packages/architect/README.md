<div align="center">

# @echojs-ecosystem/architect

**Architecture linter for EchoJS — enforce layers, public APIs, and import boundaries.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/architect)](https://www.npmjs.com/package/@echojs-ecosystem/architect)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/architect)

</div>

---

Lint **folder structure and dependency direction** from `architect.config.ts`. Used in CI on the EchoJS docs site and example apps. Inspired by [Evolution Design](https://github.com/evolution-design/evolution-design).

## Features

- **Layer rules** — e.g. `pages → widgets → entities → shared`
- **Public API enforcement** — no deep imports; use `index.ts` barrels
- **CLI** — `echo-architect lint`, `--watch`, `--fix`
- **Programmatic API** — `lint()`, `watchConfig()` for custom tooling
- **Presets** — Feature-Sliced Design rules out of the box

## Install

```bash
npm install -D @echojs-ecosystem/architect
```

## CLI

```bash
npx echo-architect lint
npx echo-architect lint --watch
npx echo-architect lint --fix
```

Add to `package.json`:

```json
{
  "scripts": {
    "architect": "echo-architect lint",
    "architect:watch": "echo-architect lint --watch"
  }
}
```

## Configuration

`architect.config.ts` in your project root:

```ts
import {
  abstraction,
  defineConfig,
  dependenciesDirection,
  publicAbstraction,
} from "@echojs-ecosystem/architect";

export default defineConfig({
  root: abstraction({
    name: "root",
    children: {
      src: abstraction({
        name: "src",
        children: { "pages/**": abstraction({ name: "pages" }) },
        rules: [
          dependenciesDirection(["app", "pages", "widgets", "entities", "shared"]),
          publicAbstraction("pages"),
        ],
      }),
    },
  }),
});
```

## Programmatic API

```ts
import { lint, defineConfig } from "@echojs-ecosystem/architect";

const result = await lint({ configPath: "./architect.config.ts" });
console.log(result.errors);
```

## Documentation

[echojs.dev/docs/packages/architect](https://echojs.dev/docs/packages/architect)
