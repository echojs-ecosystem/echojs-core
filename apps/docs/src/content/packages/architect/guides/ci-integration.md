---
title: CI Integration
description: Run architect lint in CI and programmatic lint API.
package: "@echojs-ecosystem/architect"
---

# CI Integration

Run `echo-architect lint` in CI to catch layer and public API violations before merge.

## package.json script

```json
{
  "scripts": {
    "architect": "echo-architect lint"
  }
}
```

## GitHub Actions

```yaml
- run: bun run architect
  working-directory: apps/docs
```

## Programmatic lint

```ts
import { lint } from "@echojs-ecosystem/architect";

const result = await lint({
  configPath: "./architect.config.ts",
  cwd: process.cwd(),
});
```

Use in custom CI scripts or pre-commit hooks.

## Watch mode (local)

```bash
echo-architect lint --watch
```

## Pair with docs

Align layer names in config with [Project Structure](/docs/getting-started/project-structure) and [Dependency Flow](/docs/architecture/dependency-flow).

## See also

- [lint API](/docs/packages/architect/api/lint)
- [Important Defaults](/docs/packages/architect/guides/important-defaults)
