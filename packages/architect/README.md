# @echojs/architect

Единый пакет архитектурного линтера EchoJS: ядро анализа + CLI.

Вдохновлено [Evolution Design](https://github.com/evolution-design/evolution-design).

## Структура

```
src/
  abstraction/     # описание архитектуры (дерево абстракций)
  config/          # загрузка architect.config.ts
  dependencies/    # граф импортов
  rule/            # движок правил
  presets/         # встроенные правила (FSD и др.)
  vfs/             # виртуальная файловая система
  shared/          # внутренние утилиты
  linter/          # запуск правил + reporter
  cli/             # echo-architect
  index.ts         # публичный API
```

## Установка

```bash
bun add -D @echojs/architect
```

## CLI

```bash
echo-architect lint
echo-architect lint --watch
echo-architect lint --fix
```

## Конфигурация

`architect.config.ts` в корне проекта:

```ts
import {
  abstraction,
  defineConfig,
  dependenciesDirection,
  publicAbstraction,
  requiredChildren,
} from '@echojs/architect'

export default defineConfig({
  root: abstraction({
    name: 'root',
    children: {
      src: abstraction({
        name: 'src',
        children: { '**/*': abstraction({ name: 'module' }) },
        rules: [
          dependenciesDirection(['pages', 'widgets', 'features', 'entities', 'shared']),
          publicAbstraction('module'),
          requiredChildren(),
        ],
      }),
    },
  }),
})
```

## Programmatic API

```ts
import { lint, watchConfig, defineConfig } from '@echojs/architect'
```

## Скрипты

```bash
bun run build
bun run typecheck
bun run test
```
