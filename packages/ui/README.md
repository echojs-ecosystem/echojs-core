# @echojs/ui

UI-библиотека компонентов для [@echojs/hyperdom](https://github.com/echojs/echojs-core/tree/main/packages/hyperdom).

- Без React / Vue / Solid
- Без Virtual DOM и JSX на первом этапе
- Рендер через нативные DOM-узлы и `h()` из hyperdom
- Стилизация: **CSS**, **Tailwind CSS**, **tailwind-variants**
- Accessibility-first: ARIA, semantic HTML, `data-*` hooks
- **Headless mode** — поведение и a11y без визуальных классов
- **UIProvider** — глобальная тема, default props/variants, overrides

## Установка

```bash
bun add @echojs/ui @echojs/hyperdom
```

## Импорты (subpath exports)

Точечные импорты — меньше бандл, явные зависимости:

```ts
import { Button } from "@echojs/ui/button";
import { Input } from "@echojs/ui/input";
import { Field, mergeFieldControlProps } from "@echojs/ui/field";
import { UIProvider } from "@echojs/ui/provider";
import { createTheme } from "@echojs/ui/theme";
```

Полный barrel по-прежнему доступен: `import { … } from "@echojs/ui"`.

| Subpath | Содержимое |
|---------|------------|
| `@echojs/ui/button` | Button |
| `@echojs/ui/icon-button` | IconButton |
| `@echojs/ui/input` | Input |
| `@echojs/ui/textarea` | Textarea |
| `@echojs/ui/label` | Label |
| `@echojs/ui/field` | Field |
| `@echojs/ui/checkbox` | Checkbox |
| `@echojs/ui/provider` | UIProvider |
| `@echojs/ui/theme` | createTheme, variants, context |
| `@echojs/ui/core` | createUIComponent, helpers |
| `@echojs/ui/utils` | cn, mergeProps, … |
| `@echojs/ui/primitives` | VisuallyHidden, Portal |

## Быстрый старт

```ts
import { UIProvider } from "@echojs/ui/provider";
import { createTheme } from "@echojs/ui/theme";
import { Button } from "@echojs/ui/button";
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
import { Button } from "@echojs/ui/button";

Button({
  variant: "primary",
  size: "lg",
  children: "Save",
});
```

Варианты в духе [HeroUI v3 Button](https://heroui.com/en/docs/react/components/button): `primary`, `secondary`, `tertiary`, `outline`, `ghost`, `danger`, `dangerSoft`.

```ts
Button({ pending: true, children: "Saving…" }); // HeroUI isPending; `loading` — алиас
Button({ disabled: true, children: "Disabled" });
Button({ iconOnly: true, "aria-label": "Close", children: IconX() });
Button({ leftIcon: IconSave(), children: "Save" });
Button({ fullWidth: true, size: "lg", children: "Continue" });
```

Стили: Tailwind + токены `src/theme/tokens.css` (как [button.css](https://github.com/heroui-inc/heroui/blob/v3/packages/styles/components/button.css) у HeroUI). По умолчанию pill (`rounded-3xl`).

`variant: "link"` — только визуальный стиль. Навигация — отдельный `Link` (позже).

### Input

`Input` — это **control**. Для лейбла/описания/ошибки используйте `Field`.

```ts
import { Input } from "@echojs/ui/input";

Input({
  value: name.value(),
  onInput: (event) => name.set(event.currentTarget.value),
});
```

### Field (wrapper, не input)

`Field` — это **wrapper** для `label/description/error/aria`, но не сам input.

```ts
import { Field, mergeFieldControlProps } from "@echojs/ui/field";
import { Input } from "@echojs/ui/input";

Field({
  label: "Email",
  description: "Введите email",
  error: emailError.value(),
  required: true,
  children: (ctx) =>
    Input(
      mergeFieldControlProps(ctx.inputProps, {
        value: email.value(),
        onInput: (e) => email.set(e.currentTarget.value),
      }),
    ),
});
```

### Checkbox

```ts
import { Checkbox } from "@echojs/ui";

Checkbox({
  checked: agree.value(),
  onChange: (e) => agree.set((e.currentTarget as HTMLInputElement).checked),
  "aria-label": "Accept terms",
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
| `mergeFieldControlProps(base, overrides?)` | Слияние `Field` context + control props |
| `composeEventHandlers` | Композиция обработчиков с `checkDefaultPrevented` |
| `mergeRefs` | Несколько ref-колбэков |
| `createId` / `useId` | Уникальные id с префиксом из темы |
| `ariaBool`, `dataState`, `dataDisabled`, `dataInvalid` | ARIA / data-attribute helpers |
| `createUIComponent` | Фабрика компонентов с темой и headless |

## Структура пакета

```
.storybook/    — Storybook (каталог компонентов)
src/
  components/  — Button, Input, … (+ `*.stories.ts` рядом с компонентом)
  storybook/   — hyperdom render helpers для Storybook
  core/        — component factory, props, aria, refs, events
  theme/       — createTheme, variants
  providers/   — UIProvider
  primitives/  — VisuallyHidden, Portal
  utils/       — cn, mergeProps, …
```

## Storybook

Каталог компонентов живёт **в этом пакете** — stories рядом с исходниками, рендер через hyperdom (`render` + `UIProvider`).

```bash
# из packages/ui
bun run storybook

# из корня монорепо
bun run storybook
```

Статическая сборка: `bun run storybook:build` → `storybook-static/`.

## Скрипты

```bash
bun run build
bun run check-types
bun run test:types
bun run test
bun run storybook
```

## Лицензия

Private monorepo package.
