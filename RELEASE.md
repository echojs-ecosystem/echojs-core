# Релизы (Changesets)

Версии пакетов `@echojs/*` управляются через [Changesets](https://github.com/changesets/changesets).

## Как это устроено

- Все **публикуемые** пакеты экосистемы в одной **fixed**-группе — если меняется **хотя бы один** пакет, при релизе **одна версия поднимается у всех** (`@echojs/reactivity`, `@echojs/framework`, …).
- Внутренние пакеты **не версионируются**: `@echojs/bench`, `@echojs/oxc-config`.
- После `changeset version` скрипт `scripts/sync-package-versions.mjs` обновляет:
  - `apps/docs/src/core/content/ecosystem-version.generated.ts` — версии для документации;
  - `apps/docs/src/core/content/doc-version-history.generated.ts` — архив прошлых версий docs;
  - `apps/docs/package.json` — поле `version`;
  - `packages/architect/src/cli/version.ts` — `--version` у CLI `echo-architect`.

## Локальный workflow

### 1. Описать изменение

```bash
bun changeset
```

Выберите затронутые пакеты и тип bump (`patch` / `minor` / `major`). Changeset сохранится в `.changeset/*.md`.

### 2. Поднять версии

```bash
bun run version
```

Это выполнит `changeset version` + синхронизацию версий в docs.

### 3. Опубликовать на npm

```bash
bun run release
```

Сначала собирает все пакеты (`build:packages`), затем `changeset publish`.

## CI / GitHub Actions

### PR — `.github/workflows/ci.yml`

- lint, typecheck, build, test
- `changeset status --since=origin/main` — напоминание добавить changeset, если менялись пакеты

### main — `.github/workflows/release.yml`

[changesets/action](https://github.com/changesets/action):

1. Если на `main` есть непросмотренные changesets → открывает PR **«chore(release): version packages»** (`bun run version` + commit).
2. Когда changesets закончились и PR смержен → `bun run release` (build + publish на npm).

### Секреты репозитория

| Secret | Назначение |
|---|---|
| `NPM_TOKEN` | npm automation token с правом publish для `@echojs/*` |
| `GITHUB_TOKEN` | выдаётся автоматически |

## Где версии видны в документации

| Место | Источник |
|---|---|
| Переключатель версий в шапке | `ECOSYSTEM_VERSION` + история |
| Бейдж `:::badge @echojs/...` | `имя@версия` |
| Overview пакета | `@echojs/foo@x.y.z` в hero |
| `echo-architect --version` | `@echojs/architect` |

Перегенерировать версии в docs без bump:

```bash
bun run sync-versions
```

## Первый релиз

1. Убедиться, что npm-организация `@echojs` создана и `NPM_TOKEN` добавлен в GitHub Secrets.
2. Создать changeset с `minor` (или нужным bump) для стартовой версии, например `0.1.0`.
3. Смержить PR с changeset → дождаться PR «version packages» → смержить его → publish на npm.
