# Documentation roadmap

Пошаговый план наполнения `apps/docs/src/content/`. Статусы: `[ ]` — заглушка, `[~]` — черновик, `[x]` — готово к ревью.

## Этап 1 — Introduction & Getting Started

| Страница | Статус |
|----------|--------|
| `introduction/what-is-echojs` | [x] |
| `introduction/why-echojs` | [x] |
| `introduction/philosophy` | [x] |
| `introduction/why-not-jsx` | [x] |
| `getting-started/installation` | [x] |
| `getting-started/first-application` | [x] |
| `getting-started/project-structure` | [x] |

## Этап 2 — Architecture

| Страница | Статус |
|----------|--------|
| `architecture/overview` | [x] |
| `architecture/feature-first` | [x] |
| `architecture/providers` | [x] |
| `architecture/models` | [x] |
| `architecture/dependency-flow` | [x] |

## Этап 3 — Core packages

| Страница | Статус |
|----------|--------|
| `packages/reactivity` (overview) | [x] |
| `packages/reactivity/installation` | [x] |
| `packages/reactivity/usage` | [x] |
| `packages/reactivity/api` | [x] |
| `packages/hyperdom` (overview) | [x] |
| `packages/hyperdom/installation` | [x] |
| `packages/hyperdom/usage` | [x] |
| `packages/hyperdom/api` | [x] |
| `packages/framework` (overview) | [x] |
| `packages/framework/installation` | [x] |
| `packages/framework/usage` | [x] |
| `packages/framework/api` | [x] |
| `packages/router` (overview) | [x] |
| `packages/router/installation` | [x] |
| `packages/router/usage` | [x] |
| `packages/router/api` | [x] |
| `packages/store` (overview) | [x] |
| `packages/store/installation` | [x] |
| `packages/store/usage` | [x] |
| `packages/store/api` | [x] |
| `packages/query` (overview) | [x] |
| `packages/query/installation` | [x] |
| `packages/query/usage` | [x] |
| `packages/query/api` | [x] |
| `packages/url-state` (overview) | [x] |
| `packages/url-state/installation` | [x] |
| `packages/url-state/usage` | [x] |
| `packages/url-state/api` | [x] |
| `packages/persist` (overview) | [x] |
| `packages/persist/installation` | [x] |
| `packages/persist/usage` | [x] |
| `packages/persist/api` | [x] |

## Этап 4 — App packages

Этап 4 закрыт: URL State + Persist (router/query/store — в этапе 3).

## Этап 5 — UI & tooling

| Страница | Статус |
|----------|--------|
| `packages/i18n` (overview) | [x] |
| `packages/i18n/installation` | [x] |
| `packages/i18n/usage` | [x] |
| `packages/i18n/api` | [x] |
| `packages/*/example` (все пакеты в sidebar) | [x] полные для core; [~] ui/devtools/cli |
| `packages/*/playground` (интерактив + `:::playground`) | [x] core; [~] ui/devtools/cli stubs |
| `packages/ui` (+ installation, usage, api) | [~] заглушки |
| `packages/devtools` (+ installation, usage, api) | [~] заглушки |
| `packages/cli` (+ installation, usage, api) | [~] заглушки |

## Этап 6 — Guides

| Страница | Статус |
|----------|--------|
| `guides/routing` | [x] |
| `state/overview` | [x] |
| `state/router-state` | [x] |
| `state/form-state` | [x] |
| `state/server-state` | [x] |
| `state/url-state` | [x] |
| `state/client-store` | [x] |
| `state/local-ui-state` | [x] |
| `guides/data-fetching` | [x] |
| `guides/forms` | [x] |
| `guides/authentication` | [x] |
| `guides/internationalization` | [x] |
| `guides/callouts` | [x] |

Секция **Guides** — после Architecture, выше Packages. Секция **State Management** (`state/*`) — после Guides, выше Packages (`nav.ts`).

## Этап 7 — Examples

Todo, dashboard, admin, e-commerce — по одному сценарию + ссылка на `apps/example`.

## Этап 8 — Comparisons & API

`comparisons/*` [x deep] (react, vue, angular, solid, svelte), `comparisons/index`, `api/index`.

## For agents

`agents/*` — поддерживать в актуальном состоянии при смене конвенций (см. `agents/agents.md`).

## Live references

| Ресурс | Путь |
|--------|------|
| Docs site (this app) | `apps/docs` |
| Interactive lab | `apps/example` |
| Package READMEs | `packages/*/README.md` |
