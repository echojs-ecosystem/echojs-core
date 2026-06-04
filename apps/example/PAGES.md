# Структура страниц (`apps/example`)

## Модули приложения

| Маршрут | Назначение |
|---------|------------|
| `/` | **Hub** — выбор Docs Example или Workspace |
| `/docs/*` | **Docs Example** — демо пакетов (reactivity, form, store, …) |
| `/workspace/*` | **Workspace** — продуктовый сценарий роутера |
| `/auth/*` | Mock-авторизация |

Старые URL (`/reactivity`, `/forms`, …) редиректятся на `/docs/…`.

## Папка страницы

```
pages/<area>/<name>/
  <name>.page.ts      # только createRouteView / createLayoutView
  <name>.model.ts     # опционально: форма, store, фабрики
  ui/
    <name>.view.ts    # разметка и обработчики UI
```

- **`.page.ts`** — точка входа роутера, без разметки.
- **`ui/*.view.ts`** — view-функции (`(): Child`).
- Сложная логика — в `@features/*` (как reactivity-lab, query-demo).

## Примеры

```ts
// reactivity.page.ts
export const reactivityPage = createRouteView({
  name: "reactivity",
  view: ReactivityView,
});
```

Layout-страницы то же самое: `docs-shell-layout.page.ts` + `ui/docs-shell-layout.view.ts`.
