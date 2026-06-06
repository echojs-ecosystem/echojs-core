# Релизы (Changesets)

Версии пакетов `@echojs-ecosystem/*` управляются через [Changesets](https://github.com/changesets/changesets).

## Как это устроено

- Все **публикуемые** пакеты экосистемы в одной **fixed**-группе — если меняется **хотя бы один** пакет, при релизе **одна версия поднимается у всех** (`@echojs-ecosystem/reactivity`, `@echojs-ecosystem/framework`, …).
- Внутренние инструменты **не версионируются**: `tools/bench` (`@echojs-ecosystem/bench`), `@echojs-ecosystem/oxc-config`.
- После `changeset version` скрипт `tools/scripts/sync-package-versions.mjs` обновляет:
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

Это выполнит `changeset version` + синхронизацию версий в docs + **`bun update`** (обновляет lockfile, чтобы `bun publish` заменил `workspace:*` на semver).

Закоммитьте изменения версий и `bun.lock`.

### 3. Проверить tarball (рекомендуется)

```bash
bun run build:packages
bun run release:verify
```

Скрипт делает `bun pm pack` для каждого публикуемого пакета и падает, если в tarball остались `workspace:*` / `catalog:` / `file:`.

### 4. Опубликовать на npm

Локально (нужен `.npmrc` с токеном или `NPM_TOKEN` в окружении):

```bash
bun run release
```

Сборка → verify → `changeset publish` (через `bun publish`).

После publish проверьте:

```bash
npm view @echojs-ecosystem/framework dependencies
npm view @echojs-ecosystem/hyperdom dependencies
```

В dependencies должны быть `"0.x.y"`, **не** `workspace:*`.

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
| `NPM_TOKEN` | npm automation token с правом publish для `@echojs-ecosystem/*` |
| `GITHUB_TOKEN` | выдаётся автоматически |

## Где версии видны в документации

| Место | Источник |
|---|---|
| Переключатель версий в шапке | `ECOSYSTEM_VERSION` + история |
| Бейдж `:::badge @echojs-ecosystem/...` | `имя@версия` |
| Overview пакета | `@echojs-ecosystem/foo@x.y.z` в hero |
| `echo-architect --version` | `@echojs-ecosystem/architect` |

Перегенерировать версии в docs без bump:

```bash
bun run sync-versions
```

## Первый релиз

1. Убедиться, что npm-организация `@echojs-ecosystem` создана и `NPM_TOKEN` добавлен в GitHub Secrets.
2. Создать changeset с `minor` (или нужным bump) для стартовой версии, например `0.1.0`.
3. Смержить PR с changeset → дождаться PR «version packages» → смержить его → publish на npm.
