---
title: Usage
description: @echojs-ecosystem/ui usage — documentation coming soon.
package: "@echojs-ecosystem/ui"
status: draft
---

# Usage

> [!NOTE]
> **Документация в работе.** Компоненты и API описаны в `packages/ui/README.md` и Storybook.

## Planned content

- `createUiProvider` / `wrapRoot` + theme overrides
- `Button`, `Input`, `Field`, `mergeFieldControlProps`
- Variants (tailwind-variants), headless / `data-*` hooks
- Accessibility patterns (ARIA, labels, errors)
- Связь с guide **Forms**

## Preview (from README)

```ts
import { Button } from "@echojs-ecosystem/ui/button";
import { createUiProvider } from "@echojs-ecosystem/ui/provider";

Button({
  variant: "primary",
  size: "md",
  children: "Save",
});
```

## See also

- [UI overview](/docs/packages/ui)
- HyperDOM — `/docs/packages/hyperdom`
