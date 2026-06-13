# Generator Example

Отдельный мини-проект для проверки `@echojs-ecosystem/generator/http` без путаницы с `http/.tmp`.

## Структура

```
example/
├── openapi.yaml              ← ваш OpenAPI (замените placeholder)
├── echo-http.generator.ts    ← конфиг генерации
├── scripts/generate.ts
└── src/core/
    ├── http-client.ts        ← ваш HTTP client (`http`)
    └── generated/            ← сюда пишется codegen
```

## Использование

1. Положите свой `openapi.yaml` в корень `example/` (или отредактируйте путь в `echo-http.generator.ts`).
2. Соберите generator-пакет (если ещё не собран):

   ```bash
   cd ../.. && bun run build --filter=@echojs-ecosystem/generator
   ```

3. Запустите генерацию:

   ```bash
   cd packages/generator/example
   bun run generate
   ```

## Импорт в коде

```ts
import { http } from "./http-client";
import { getUser } from "./generated/endpoints/users/get-user";

const user = await getUser({ params: { id: "1" } });
```
