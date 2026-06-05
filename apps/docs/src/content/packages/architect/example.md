---
title: Example
description: architect.config.ts for the EchoJS docs app.
package: "@echojs/architect"
---

# Example — docs app

Minimal excerpt from `apps/docs/architect.config.ts`:

```ts
import {
  abstraction,
  defineConfig,
  dependenciesDirection,
  noUnabstractionFiles,
  publicAbstraction,
  restrictCrossImports,
} from "@echojs/architect";

const pageSlice = abstraction({
  name: "page",
  children: {
    "*.page.ts": abstraction("page"),
    "index.ts": abstraction("public-api"),
  },
  rules: [
    publicAbstraction("page"),
    publicAbstraction("public-api"),
    noUnabstractionFiles(),
  ],
});

export default defineConfig({
  baseUrl: "src",
  ignores: ["**/*.md", "**/*.css", "**/*.json"],
  root: abstraction({
    name: "src",
    children: {
      app: abstraction({
        name: "app",
        children: {
          router: abstraction({ name: "router", children: { "*.ts": abstraction("routes-module") } }),
          providers: abstraction({
            name: "providers",
            children: {
              "*.ts": abstraction("provider"),
              "index.ts": abstraction("public-api"),
            },
            rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
          }),
        },
      }),
      pages: abstraction({
        name: "pages",
        children: { "*": pageSlice },
        rules: [restrictCrossImports()],
      }),
      shared: abstraction({ name: "shared", children: { "**/*": abstraction("shared-module") } }),
    },
    rules: [
      dependenciesDirection(
        ["app", "pages", "entities", "widgets", "features", "shared"],
        { allowDownward: ["**/app/router/**", "**/core/providers/**"] },
      ),
    ],
  }),
});
```

## Typical violations & fixes

| Message | Fix |
| --- | --- |
| `Forbidden dependency "widgets" <= "entities"` | Move import to a higher layer or adjust layer order |
| `cross imports are not allowed` | Import via `index.ts` or lift shared code to `core/` |
| `bypassing the public api` | Export from slice `index.ts`; consumers use barrel |
| `Unabstraction files` | Move file into declared segment or add pattern to config |

## Run on CI

```yaml
- run: bun run architect
  working-directory: apps/docs
```
