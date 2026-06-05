---
title: Installation
description: Install @echojs-ecosystem/ui — documentation coming soon.
package: "@echojs-ecosystem/ui"
status: draft
---

# Installation

> [!NOTE]
> **Документация в работе.** См. `packages/ui/README.md` для текущих шагов установки.

## Planned content

- `:::install @echojs-ecosystem/ui` и peer `@echojs-ecosystem/hyperdom`
- Импорт CSS tokens (`@echojs-ecosystem/ui/theme` или глобальные tokens)
- `createUiProvider()` в `createEchoApp().use(uiProvider)`
- Subpath exports vs barrel

## Temporary install (monorepo)

```bash
bun add @echojs-ecosystem/ui @echojs-ecosystem/hyperdom
```

```json
{
  "dependencies": {
    "@echojs-ecosystem/ui": "workspace:*",
    "@echojs-ecosystem/hyperdom": "workspace:*"
  }
}
```

## See also

- [UI overview](/docs/packages/ui)
