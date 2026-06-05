# @echojs-ecosystem/bench

Локальная утилита для сравнения **bundle size** и **перформанса** пакетов в этом monorepo (в духе `js-framework-benchmark`, но заточено под EchoJS-пакеты).

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
node packages/bench/dist/cli.js size

# Только выбранные пакеты
node packages/bench/dist/cli.js size --packages reactivity,store,router
```

Результаты пишутся в `bench-results/`:
- `bench-results/bundle-size.json`
- `bench-results/bundle-size.md`

## Perf

Запускает микробенчмарки (CPU-bound) для нескольких пакетов и пишет репорт.

```bash
node packages/bench/dist/cli.js perf
node packages/bench/dist/cli.js perf --packages reactivity,store
```

Результаты:
- `bench-results/perf.json`
- `bench-results/perf.md`

