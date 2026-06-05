---
title: Example
description: DevTools examples — coming soon.
package: "@echojs/devtools"
status: draft
---

# Example — DevTools

> [!NOTE]
> Пакет `@echojs/devtools` ещё не в monorepo. Примеры появятся вместе с первым релизом.

## Planned examples

```ts
// draft — not implemented
import { createDevtoolsProvider } from "@echojs/devtools";

createEchoApp({ strictContextChecks: true })
  .use(devtoolsProvider)
  .mount("#app");
```

Планируется: overlay, просмотр signals / query cache / active routes.

## See also

- [DevTools overview](/docs/packages/devtools)
- Reactivity Example — `/docs/packages/reactivity/example`
