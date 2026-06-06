---
title: Docs Site Config
description: architect.config.ts excerpt from apps/docs.
package: "@echojs-ecosystem/architect"
---

# Docs Site Config

Minimal excerpt from `apps/docs/architect.config.ts`:

```ts
import {
  abstraction,
  defineConfig,
  dependenciesDirection,
  noUnabstractionFiles,
  publicAbstraction,
  restrictCrossImports,
} from "@echojs-ecosystem/architect";

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

Full file: [`apps/docs/architect.config.ts`](https://github.com/echojs/echojs/blob/main/apps/docs/architect.config.ts).

## See also

- [Presets & Config](/docs/packages/architect/guides/presets)
- [CI Integration](/docs/packages/architect/guides/ci-integration)
