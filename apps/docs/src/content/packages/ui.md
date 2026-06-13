---
title: UI
description: Accessible HyperDOM components and theming primitives.
package: '@echojs-ecosystem/ui'
keywords: [Button, Field, UIProvider]
---

:::package-overview ui

:::install @echojs-ecosystem/ui

## Key APIs

| Export | Role |
| ------ | ---- |
| [`UIProvider`](/docs/packages/ui/api/provider) | Theme tokens, density, and form defaults for the tree |
| [`Button`](/docs/packages/ui/api/button) | Primary actions with variants and loading state |
| [`Field`](/docs/packages/ui/api/field) | Label + control + error message composition |

## Common patterns

- Register **`UIProvider`** once in `createEchoApp` before routes that render forms.
- Import components from **`@echojs-ecosystem/ui/button`** (subpath) to keep bundles small.
- Pair with `tailwind-variants` in feature views for layout-only styling.

> [!note] **Playground** shows a live Button demo.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/ui/functions) | Button, Field, UIProvider |
| [Guides & Concepts](/docs/packages/ui/guides/ui-provider) | Theme and form controls |

Each API page: **Usage** → **Type Declarations** → **API** (see [Button](/docs/packages/ui/api/button)).
