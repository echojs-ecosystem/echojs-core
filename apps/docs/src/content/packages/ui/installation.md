---
title: Installation
description: Install @echojs/ui — documentation coming soon.
package: "@echojs/ui"
status: draft
---

# Installation

> [!NOTE]
> **Документация в работе.** См. `packages/ui/README.md` для текущих шагов установки.

## Planned content

- `:::install @echojs/ui` и peer `@echojs/hyperdom`
- Импорт CSS tokens (`@echojs/ui/theme` или глобальные tokens)
- `createUiProvider()` в `createEchoApp().use(uiProvider)`
- Subpath exports vs barrel

## Temporary install (monorepo)

```bash
bun add @echojs/ui @echojs/hyperdom
```

```json
{
  "dependencies": {
    "@echojs/ui": "workspace:*",
    "@echojs/hyperdom": "workspace:*"
  }
}
```

## See also

- [UI overview](/docs/packages/ui)
