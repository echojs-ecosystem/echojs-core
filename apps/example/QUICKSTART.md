# 🚀 Быстрый старт

## Запуск примера

```bash
# 1. Перейди в папку примера
cd apps/example

# 2. Запусти dev server
bun dev
```

Открой http://localhost:3000

## Что вы увидите

Приложение с 5 интерактивными примерами:

1. **Counter** - счетчик с сигналами
2. **Conditional** - условный рендеринг
3. **Form Demo** - формы и события
4. **Todo List** - список задач
5. **Style Demo** - реактивные стили

## Как это работает

```tsx
// Компонент = ViewModel + View
const Counter = createComponent(
  // ViewModel - логика
  () => {
    const count = signal(0);
    return {
      count,
      increment: () => count.update((n) => n + 1),
    };
  },
  // View - JSX
  (vm) => <button onClick={vm.increment}>{vm.count.value()}</button>,
);
```

## Структура

```
apps/example/
├── src/main.tsx       # Все примеры
├── src/style.css      # Стили
├── index.html         # Entry point
├── vite.config.ts     # Vite настройки
└── package.json       # Зависимости
```

## Команды

| Команда           | Описание     |
| ----------------- | ------------ |
| `bun dev`         | Dev сервер   |
| `bun run build`   | Сборка       |
| `bun run preview` | Предпросмотр |

## Troubleshooting

Если `bun dev` не работает:

```bash
# Установи зависимости
cd /home/jombozana/Desktop/echojs/echojs-core
bun install

# Собери пакеты
cd packages/jsx-runtime
bun run build
```
