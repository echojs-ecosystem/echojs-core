# @echojs/ui

UI-библиотека компонентов для [@echojs/hyperdom](https://github.com/echojs/echojs-core/tree/main/packages/hyperdom).

- Без React / Vue / Solid
- Без Virtual DOM и JSX на первом этапе
- Рендер через нативные DOM-узлы и `h()` из hyperdom
- Стилизация: **CSS**, **Tailwind CSS**, **tailwind-variants**
- Accessibility-first: ARIA, semantic HTML, `data-*` hooks
- **Headless mode** — поведение и a11y без визуальных классов
- **UIProvider** — глобальная тема, default props/variants, overrides

> Первый этап — архитектурный фундамент. Полный набор компонентов (Button, Input, Field, …) — следующий этап.

## Установка

```bash
bun add @echojs/ui @echojs/hyperdom
```

## Быстрый старт

```ts
import { UIProvider, createTheme } from "@echojs/ui";
import { h, render } from "@echojs/hyperdom";

const theme = createTheme({
  prefix: "echo",
  components: {
    button: {
      defaultVariants: {
        variant: "primary",
        size: "md",
      },
    },
  },
});

const App = () => h("main", null, "Hello");

render(
  UIProvider({
    theme,
    children: () => App(),
  }),
  document.getElementById("app")!,
);
```

Используйте **ленивые** `children: () => …`, чтобы потомки рендерились внутри контекста провайдера.

## Компоненты (Stage 2)

### Button

```ts
import { Button } from "@echojs/ui";

Button({
  variant: "primary",
  size: "lg",
  children: "Save",
});
```

Loading/disabled:

```ts
Button({ isLoading: true, children: "Saving..." });
Button({ isDisabled: true, children: "Disabled" });
```

Ссылка:

```ts
Button({ as: "a", href: "/docs", children: "Docs" });
```

### Input

`Input` — это **control**. Для лейбла/описания/ошибки используйте `Field`.

```ts
import { Input } from "@echojs/ui";

Input({
  value: name.value(),
  "on:input": (event) => name.set(event.currentTarget.value),
});
```

### Field (wrapper, не input)

`Field` — это **wrapper** для `label/description/error/aria`, но не сам input.

```ts
import { Field, Input } from "@echojs/ui";

Field({
  label: "Email",
  description: "Введите email",
  error: emailError.value(),
  required: true,
  children: ({ inputProps }) =>
    Input({
      ...inputProps,
      value: email.value(),
      "on:input": (e) => email.set(e.currentTarget.value),
    }),
});
```

## Provider overrides

```ts
import { UIProvider } from "@echojs/ui";

UIProvider({
  theme: {
    components: {
      button: {
        defaultVariants: { variant: "secondary" },
        className: "rounded-none",
      },
      input: {
        defaultVariants: { variant: "outline", size: "md" },
      },
    },
  },
  children: () => App(),
});
```

## Headless mode

Глобально:

```ts
UIProvider({
  headless: true,
  children: () => App(),
});
```

Локально на компоненте:

```ts
Button({ headless: true, children: "Save" });
```

В headless режиме не применяются visual / theme / tailwind-variants классы. Сохраняются semantic HTML, ARIA, события, `data-*` и поведение.

## Тема

```ts
import { createTheme } from "@echojs/ui";

const theme = createTheme({
  prefix: "echo",
  components: {
    button: {
      baseClass: "inline-flex",
      defaultVariants: { variant: "primary", size: "md" },
      defaultProps: { type: "button" },
    },
  },
});
```

## Утилиты

| API | Назначение |
|-----|------------|
| `cn(...)` | Объединение className (можно заменить на tailwind-merge через `setClassNameMerger`) |
| `mergeProps(default, provider, props)` | Слияние props с приоритетом и compose событий |
| `composeEventHandlers` | Композиция обработчиков с `checkDefaultPrevented` |
| `mergeRefs` | Несколько ref-колбэков |
| `createId` / `useId` | Уникальные id с префиксом из темы |
| `ariaBool`, `dataState`, `dataDisabled`, `dataInvalid` | ARIA / data-attribute helpers |
| `createUIComponent` | Фабрика компонентов с темой и headless |

## Структура пакета

```
src/
  core/        — component factory, props, aria, refs, events
  theme/       — createTheme, variants (tailwind-variants)
  providers/   — UIProvider
  primitives/  — VisuallyHidden, Portal
  utils/       — cn, mergeProps, …
```

## Скрипты

```bash
bun run build
bun run check-types
bun run test
```

## Лицензия

Private monorepo package.
