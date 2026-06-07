---
title: Planned Commands
description: Target CLI command UX (draft).
package: '@echojs-ecosystem/cli'
---

# Planned Commands

> [!warning] **Commands below are not implemented.** Draft target UX for the
> first release.

## `create`

```bash
# planned
echojs create my-app
```

Scaffold a new EchoJS app with Vite, HyperDOM, router, and example feature
slices.

## `generate`

```bash
# planned
echojs generate feature docs-search
```

Generate a feature folder with `index.ts`, `model/`, `ui/` segments per
architect conventions.

## `doctor`

```bash
# planned
echojs doctor
echojs doctor --json   # CI output
```

Validate feature-first layout — may delegate to
[Architect](/docs/packages/architect) under the hood.

## Config file (planned)

```ts
// echojs.config.ts — planned
export default {
  srcDir: 'src',
  featuresDir: 'features',
}
```

## See also

- [create API](/docs/packages/cli/api/create)
- [generate API](/docs/packages/cli/api/generate)
- [Scaffold App example](/docs/packages/cli/examples/scaffold-app)
