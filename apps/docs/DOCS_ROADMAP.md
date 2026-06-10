# Documentation roadmap

Пошаговый план наполнения `apps/docs/src/content/`. Статусы: `[ ]` — заглушка,
`[~]` — черновик, `[x]` — готово к ревью.

Все пакеты используют **modern layout** (как reactivity): Overview →
Installation → Guides & Concepts → API Reference → Examples → Playground.

Конфиг страниц: `apps/docs/src/core/content/package-doc-config.ts`

## Этап 1 — Introduction & Getting Started

| Страница                            | Статус |
| ----------------------------------- | ------ |
| `introduction/what-is-echojs`       | [x]    |
| `introduction/why-echojs`           | [x]    |
| `introduction/philosophy`           | [x]    |
| `introduction/why-not-jsx`          | [x]    |
| `getting-started/installation`      | [x]    |
| `getting-started/first-application` | [x]    |
| `getting-started/project-structure` | [x]    |

## Этап 2 — Architecture

| Страница                       | Статус |
| ------------------------------ | ------ |
| `architecture/overview`        | [x]    |
| `architecture/feature-first`   | [x]    |
| `architecture/providers`       | [x]    |
| `architecture/models`          | [x]    |
| `architecture/dependency-flow` | [x]    |

## Этап 3 — Packages (modern layout)

| Пакет        | Статус              |
| ------------ | ------------------- |
| `reactivity` | [x]                 |
| `hyperdom`   | [x]                 |
| `framework`  | [x]                 |
| `router`     | [x]                 |
| `store`      | [x]                 |
| `query`      | [x]                 |
| `url-state`  | [x]                 |
| `persist`    | [x]                 |
| `i18n`       | [x]                 |
| `ui`         | [~] expanding       |
| `devtools`   | [~] overlay planned |
| `cli`        | [~] planned         |
| `architect`  | [x]                 |

Legacy `usage.md` удалены — контент в `guides/*`.

## Этап 4 — Guides (site-level)

| Страница                      | Статус |
| ----------------------------- | ------ |
| `guides/routing`              | [x]    |
| `guides/data-fetching`        | [x]    |
| `guides/forms`                | [x]    |
| `guides/authentication`       | [x]    |
| `guides/internationalization` | [x]    |
| `best-practices/overview`     | [x]    |

## Этап 5 — State, comparisons, examples

| Раздел          | Статус |
| --------------- | ------ |
| `state/*`       | [x]    |
| `comparisons/*` | [x]    |
| `examples/*`    | [~]    |
