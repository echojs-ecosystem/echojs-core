# Generator App

Локальное приложение‑песочница для `@echojs-ecosystem/generator/*`.

## Структура

```text
apps/generator/
├── openapi.yaml              ← ваш OpenAPI
├── echo-http.generator.ts    ← конфиг HTTP генерации (baseUrl, plugins, naming)
├── scripts/
│   └── generate-http.ts
└── src/core/
    ├── http-client.ts        ← ваш HTTP client (`http`)
    └── generated/            ← codegen: models, endpoints, schemas (zod), mocks (msw)
```

## Использование

1. Положите или обновите `openapi.yaml` в корне `apps/generator/`.
2. При необходимости поправьте `echo-http.generator.ts` (пути, client, grouping).
3. Запустите генерацию:

```bash
# из корня монорепо (собирает @echojs-ecosystem/generator и генерит API)
bun run generate:http

# или только из apps/generator
bun run --filter @echojs-ecosystem/generator-app generate:http
```

Результат: `src/core/generated/` (в `.gitignore`).

## Импорт в коде

```ts
import { http } from "./http-client";
import { getUser } from "./generated/endpoints/users/get-user";

const user = await getUser({ params: { id: "1" } });
```

