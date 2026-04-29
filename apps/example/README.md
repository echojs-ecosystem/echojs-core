# EchoJS Example App

Полноценное демо-приложение на EchoJS с Vite.

## Быстрый старт

```bash
# 1. Перейди в папку приложения
cd apps/example

# 2. Установи зависимости
bun install

# 3. Запусти dev server
bun dev
```

Открой http://localhost:3000

## Что внутри

Приложение демонстрирует 5 примеров:

1. **Counter** - базовые сигналы и вычисляемые значения
2. **Conditional** - директивы if/else и show
3. **Form Events** - модификаторы событий (prevent, stop, once)
4. **Todo List** - работа со списками и фильтрация
5. **Reactive Styles** - реактивные стили и классы

## Структура

```
apps/example/
├── index.html          # Entry point
├── package.json        # Зависимости
├── tsconfig.json       # TS конфиг
├── vite.config.ts      # Vite конфиг
├── README.md           # Этот файл
└── src/
    ├── main.tsx        # Главный файл с примерами
    └── style.css       # Стили
```

## Команды

| Команда              | Описание                |
| -------------------- | ----------------------- |
| `bun dev`            | Dev server с hot reload |
| `bun run build`      | Сборка для production   |
| `bun run preview`    | Предпросмотр сборки     |
| `bun run type-check` | Проверка типов          |

## Как это работает

### JSX Transform

Vite использует `vite.config.ts` где настроен автоматический JSX:

```ts
esbuild: {
  jsx: 'automatic',
  jsxImportSource: '@echojs-ecosystem/jsx-runtime',
}
```

Это значит все `.tsx` файлы автоматически компилируются с нашим runtime.

### Пример компонента

```tsx
import { createComponent, signal, computed } from "@echojs-ecosystem/jsx-runtime";

const Counter = createComponent(
  // ViewModel - логика
  () => {
    const count = signal(0);
    const double = computed(() => count.value() * 2);

    return {
      count,
      double,
      increment: () => count.update((n) => n + 1),
    };
  },
  // View - JSX
  (vm) => (
    <div>
      <span>{vm.count}</span> (×2 = {vm.double})<button on:click={vm.increment}>+</button>
    </div>
  ),
);
```

### Особенности

- **Нет Virtual DOM** - JSX создает реальные DOM ноды
- **Fine-grained updates** - обновляются только конкретные текстовые ноды
- **Автоматические подписки** - не нужно указывать зависимости
- **Component scope** - каждый компонент имеет свой реактивный scope

## Production сборка

```bash
bun run build
```

Сборка появится в `dist/`. Это статические файлы которые можно разместить на любом хостинге.

## Troubleshooting

### Ошибка "Cannot resolve module"

Убедись что запустил `bun install` в корне проекта:

```bash
cd /home/jombozana/Desktop/echojs/echojs-core
bun install
```

### Ошибка типов

Проверь что пакеты собраны:

```bash
cd packages/jsx-runtime
bun run build

cd packages/reactivity
bun run build
```

### Hot reload не работает

Попробуй перезапустить dev server:

```bash
# Ctrl+C чтобы остановить
bun dev
```
