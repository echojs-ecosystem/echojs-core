# echojs-bench

Внутренняя dev-утилита монорепо для сравнения **bundle size** и **перформанса** EchoJS-пакетов (аналог `js-framework-benchmark`, но для своих пакетов).

Не публикуется в npm — живёт в `tools/bench`, не в `packages/`.

## Установка

В корне репозитория:

```bash
bun install
```

## Bundle size

Считает размер **minified bundle**, а также **gzip** и **brotli** (через `esbuild`).

```bash
# Все workspace-пакеты (кроме скрытых папок типа .configs)
bun run --filter @echojs-ecosystem/bench build
node tools/bench/dist/cli.js size

# Только выбранные пакеты
node tools/bench/dist/cli.js size --packages reactivity,store,router
```

Или из корня:

```bash
bun run size
```

Результаты пишутся в `tools/bench-results/`:
- `tools/bench-results/bundle-size.json`
- `tools/bench-results/bundle-size.md`

## Perf

Запускает микробенчмарки (CPU-bound) для нескольких пакетов и пишет репорт.

```bash
node tools/bench/dist/cli.js perf
node tools/bench/dist/cli.js perf --packages reactivity,store
```

Результаты:
- `tools/bench-results/perf.json`
- `tools/bench-results/perf.md`
