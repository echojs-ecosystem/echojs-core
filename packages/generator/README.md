# @echojs-ecosystem/generator

EchoJS code generation toolkit. Runtime HTTP lives in `@echojs-ecosystem/network/http`; generation lives here.

## What is Echo Generator?

Echo Generator is an extensible codegen layer for the EchoJS ecosystem. It uses [Kubb](https://kubb.dev/) as the OpenAPI engine (`@kubb/core`, `@kubb/plugin-oas`, `@kubb/plugin-ts`) and adds Echo-specific generators on top.

## Architecture

```
packages/generator/
├── core/          # shared foundation for all generators
└── http/          # OpenAPI → HTTP endpoint functions
```

Subpath exports:

- `@echojs-ecosystem/generator/core`
- `@echojs-ecosystem/generator/http`

## Generator Core

Shared utilities for every generator:

- config helpers (`defineGeneratorConfig`)
- Kubb runner (`runGenerator`)
- naming utilities (`camelCase`, `pascalCase`, `kebabCase`, operation naming)
- OpenAPI input validation
- output path helpers

## HTTP Generator

Generates:

```
generated/
├── models/              # TypeScript interfaces (via plugin-ts)
├── endpoints/           # function-based API layer
│   └── users/
│       ├── get-user.ts
│       ├── create-user.ts
│       └── index.ts
├── runtime/
│   └── build-path.ts
└── index.ts
```

### Configuration

```ts
import { defineHttpGeneratorConfig, runHttpGenerator } from "@echojs-ecosystem/generator/http";

export default defineHttpGeneratorConfig({
  input: "./openapi.yaml",
  output: "./src/generated/api",
  client: {
    importPath: "./src/core/http-client/http-client.ts",
    exportName: "httpClient",
    access: "variable",
    typesImportPath: "@echojs-ecosystem/network/http",
  },
  grouping: "tag",
  naming: {
    operation: "camelCase",
    models: "pascalCase",
  },
});

await runHttpGenerator({ config: defineHttpGeneratorConfig({ /* ... */ }) });
```

| Example | Purpose |
|---------|---------|
| [`http/echo-http.generator.ts`](./http/echo-http.generator.ts) | Internal fixture → `http/.tmp` |
| [`example/`](./example/) | Standalone app → `example/src/core/generated` |

```bash
# internal fixture
bun run generate:example

# standalone example app
cd example && bun run generate
```

### OpenAPI Support

Supported inputs:

- `swagger.json` / `swagger.yaml`
- `openapi.json` / `openapi.yaml`
- files whose names include `openapi` or `swagger`

Parsing and validation are delegated to Kubb (`@kubb/plugin-oas`).

### Generated Output

**Model example**

```ts
export type User = {
  id: string;
  name: string;
};
```

**Client config**

| Field | Description |
|-------|-------------|
| `importPath` | File or package where your client is exported |
| `exportName` | Export name: `http`, `httpClient`, `getHttpClient`, … |
| `access` | `"variable"` → `http.get(...)`, `"function"` → `getHttpClient().get(...)` |
| `typesImportPath` | Optional. Defaults to `@echojs-ecosystem/network/http` for `RequestOptions` |

**Endpoint example** (`access: "variable"`, `exportName: "http"`)

```ts
import type { RequestOptions } from "@echojs-ecosystem/network/http";
import { http } from "../../../../core/http-client";
import type { User, GetUserPathParams } from "../../models";
import { buildPath } from "../../runtime/build-path";

export const getUser = (
  args: { params: GetUserPathParams },
  options?: RequestOptions,
): Promise<User> => {
  return http
    .get(buildPath("/users/{id}", { params: args.params }), options)
    .json<User>();
};
```

Your app owns the client module — the generator does not emit a singleton wrapper.

### Integration with network/http

Generated code imports:

- `HttpClient`
- `RequestOptions`

from `@echojs-ecosystem/network/http` and calls `client.get/post/put/patch/delete/request` — never raw `fetch`.

`buildPath()` is emitted into `generated/runtime/` because path templating is a codegen concern, while transport stays in the network package.

### Grouping

- `grouping: "tag"` → `endpoints/users/`, `endpoints/posts/`
- `grouping: "none"` → flat `endpoints/`

### Operation naming

1. `operationId` when present
2. fallback from HTTP method + path (`getUser`, `createUser`, …)

## Roadmap

| Generator | Package export | Status |
|-----------|----------------|--------|
| HTTP | `@echojs-ecosystem/generator/http` | implemented |
| Query | `@echojs-ecosystem/generator/query` | planned |
| Form | `@echojs-ecosystem/generator/form` | planned |
| Router | `@echojs-ecosystem/generator/router` | planned |
| Permission | `@echojs-ecosystem/generator/permission` | planned |
| i18n | `@echojs-ecosystem/generator/i18n` | planned |

Future generators (query, form, router, permission, i18n) will reuse `generator/core` and compose with the HTTP layer instead of replacing it.
