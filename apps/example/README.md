# EchoJS Lab

Интерактивное приложение для изучения экосистемы EchoJS: каждый раздел — рабочий модуль (формы, сессия, workspace), а не отдельный сниппет.

## Быстрый старт

```bash
cd apps/example
bun install
bun dev
```

Открой http://localhost:3000

## Модули

| Путь | Назначение |
|------|------------|
| `/` | Обзор платформы и быстрые ссылки |
| `/reactivity` | Сигналы, эффекты, обновление DOM |
| `/forms`, `/forms/nested` | Формы и вложенные массивы полей |
| `/state` | `@echojs/store` — store, select, actions |
| `/persistence` | Обзор `@echojs/persist` |
| `/account` | Профиль и persist (требует входа) |
| `/workspace/*` | Продуктовый сценарий `@echojs/router` |
| `/auth/login`, `/auth/signup` | Mock-авторизация (cookie + localStorage) |

Старые URL (`/example1`, `/store`, `/persist`, …) перенаправляются на новые маршруты.

## Структура (FSD)

```
apps/example/src/
├── main.ts
    ├── app/
    │   ├── config/lab-modules.ts
    │   ├── layout/shell-layout.page.ts
    │   └── router/index.ts       # реэкспорт entities/__routes__
    ├── entities/
    │   └── __routes__/           # дерево маршрутов, guards, redirects, router
    ├── features/                 # UI-логика модулей (forms, reactivity, …)
    ├── widgets/app-shell/
    ├── pages/
    │   ├── dashboard|reactivity|forms|…/
    │   ├── workspace/            # users, catalog, sprint, …
    │   ├── auth/
    │   └── router-states/        # loading / error / 404
    ├── entities/session|user|catalog|workspace/
    └── shared/lib/               # мост form ↔ persist
```

Роутинг: `entities/__routes__/app.routes.ts`, старт в `entities/__routes__/index.ts`. Точка входа приложения: `app/router/index.ts`.

## Импорты (alias)

Слои FSD — через alias (настроены в `tsconfig.json` и `vite.config.ts`):

| Alias | Путь |
|-------|------|
| `@app/*` | `src/app/*` |
| `@pages/*` | `src/pages/*` |
| `@entities/*` | `src/entities/*` |
| `@features/*` | `src/features/*` |
| `@widgets/*` | `src/widgets/*` |
| `@shared/*` | `src/shared/*` |

Пример: `import { appRouter } from "@entities/__routes__/index.js"`.

## Команды

| Команда | Описание |
|---------|----------|
| `bun dev` | Dev server |
| `bun run build` | Production сборка |
| `bun run preview` | Предпросмотр `dist/` |
| `bun run type-check` | Проверка типов |

## Пакеты в монорепо

- `@echojs-ecosystem/reactivity`, `@echojs/hyperdom`, `@echojs/form`, `@echojs/router`
- `@echojs/store`, `@echojs/persist` — алиасы в `vite.config.ts` на `packages/*/src`

## Troubleshooting

Из корня монорепо: `bun install`. При ошибках типов соберите зависимые пакеты в `packages/`.
