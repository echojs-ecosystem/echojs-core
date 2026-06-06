---
title: API Reference
description: @echojs-ecosystem/ui public API index — coverage expanding.
package: "@echojs-ecosystem/ui"
---

# API Reference

> [!note]
> Component API pages are **expanding**. The full export list lives in `packages/ui/src/index.ts` and `package.json` exports. Storybook catalogs variants.

```ts
import { Button } from "@echojs-ecosystem/ui/button";
import { Field, mergeFieldControlProps } from "@echojs-ecosystem/ui/field";
import { UIProvider, createUiProvider } from "@echojs-ecosystem/ui/provider";
import { createTheme } from "@echojs-ecosystem/ui/theme";
```

## Components (documented)

| Export | Description |
| --- | --- |
| [Button](/docs/packages/ui/api/button) | Primary action control with variants |
| [Field](/docs/packages/ui/api/field) | Label, error, and control wiring |
| [UIProvider](/docs/packages/ui/api/provider) | Theme and global defaults |

## More exports (preview)

| Area | Exports |
| --- | --- |
| Inputs | `Input`, `Textarea`, `Checkbox`, `Label` |
| Theme | `createTheme`, variant tokens |
| Primitives | `Portal`, `VisuallyHidden` |
| Utils | `cn`, `mergeProps`, input-mask helpers |

## Guides

- [UIProvider & Theme](/docs/packages/ui/guides/ui-provider)
- [Form Controls](/docs/packages/ui/guides/forms)
- Global [Forms guide](/docs/guides/forms)
