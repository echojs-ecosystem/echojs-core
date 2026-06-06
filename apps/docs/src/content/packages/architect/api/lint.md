---
title: lint
description: echo-architect lint CLI and programmatic lint().
package: "@echojs-ecosystem/architect"
---

# lint

## CLI

```bash
echo-architect lint              # one-shot
echo-architect lint --watch      # watch mode
echo-architect lint --fix        # apply safe fixes when available
```

## Programmatic

```ts
import { lint } from "@echojs-ecosystem/architect";

const result = await lint({
  configPath: "./architect.config.ts",
  cwd: process.cwd(),
});
```

Resolves imports using the app's `tsconfig.json` path aliases.

## See also

- [CI Integration](/docs/packages/architect/guides/ci-integration)
