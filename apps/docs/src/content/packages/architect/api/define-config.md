---
title: defineConfig
description: defineConfig and abstraction tree structure.
package: "@echojs-ecosystem/architect"
---

# defineConfig

```ts
import { defineConfig, abstraction } from "@echojs-ecosystem/architect";

export default defineConfig({
  baseUrl: "src",
  ignores: ["**/*.md", "**/*.css", "**/*.json"],
  root: abstraction({
    name: "src",
    children: { /* layer abstractions */ },
    rules: [/* presets */],
  }),
});
```

## Config fields

| Field | Description |
| --- | --- |
| `baseUrl` | Source root relative to config file (usually `"src"`) |
| `ignores` | Glob patterns excluded from analysis |
| `root` | Root `abstraction()` tree |

## abstraction()

```ts
abstraction("pages"); // simple named segment

abstraction({
  name: "page",
  children: {
    "*.page.ts": abstraction("page"),
    "index.ts": abstraction("public-api"),
  },
  rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
});
```

## See also

- [Presets & Config](/docs/packages/architect/guides/presets)
- [Docs Site Config](/docs/packages/architect/examples/docs-site-config)
