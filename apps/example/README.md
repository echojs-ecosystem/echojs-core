# EchoJS Lab (`apps/example`)

Интерактивное приложение для изучения экосистемы EchoJS.

## Модули

| URL | Описание |
|-----|----------|
| `/` | Выбор модуля (Hub) |
| `/docs` | **Docs Example** — демо reactivity, form, store, persist, query |
| `/workspace` | **Workspace** — продуктовый сценарий `@echojs/router` |
| `/auth/login`, `/auth/signup` | Mock-авторизация |

Старые URL (`/example1`, `/reactivity`, …) перенаправляются на новые маршруты.

## Структура (FSD)

См. [PAGES.md](./PAGES.md) — соглашение `*.page.ts` + `ui/*.view.ts`.

```
apps/example/src/
├── app/
│   ├── main.ts          # точка входа + global.css
│   ├── styles/global.css
│   ├── bootstrap.ts
│   ├── config/          # hub-modules, docs-modules, workspace-module
│   └── providers/
├── entities/__routes__/ # app, docs, workspace routes
├── features/            # UI-логика модулей
├── widgets/
│   ├── docs-shell/      # сайдбар Docs Example
│   └── app-shell/       # module-header
├── pages/
│   ├── hub/             # выбор модуля
│   ├── docs/            # Docs Example
│   ├── workspace/
│   ├── auth/
│   └── router-states/
└── shared/
```

## Запуск

```bash
bun run dev --filter example
```
