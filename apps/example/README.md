# Generator Example

Минимальный пример: OpenAPI → typed endpoints → вызов запросов.

## Структура

```text
apps/example/
├── openapi.yaml
├── echo-http.generator.ts
├── scripts/generate-http.ts
└── src/
    ├── core/http-client.ts
    ├── core/generated/          # codegen (gitignored)
    └── examples/users-api.ts  # пример вызовов
```

## Запуск

```bash
# из корня монорепо
bun run generate:example

# пример запросов (после generate)
bun run --filter @echojs-ecosystem/generator-example example
```

## Post-generate hooks

В `echo-http.generator.ts`:

```ts
hooks: {
  afterGenerate: ["bun run format:generated"],
}
```

После успешной генерации автоматически запустится `oxfmt` для `src/core/generated/`.
