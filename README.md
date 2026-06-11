# EchoJS Core (monorepo)

Монорепозиторий экосистемы **EchoJS**: реактивность, DOM/UI, роутер, формы, persistence и утилиты вокруг.

- **Node**: >= 18
- **Package manager**: `bun` (см. `package.json -> packageManager`)
- **Orchestration**: `turbo`

## Быстрый старт (пример-приложение)

Запуск демо из `apps/example`:

```bash
bun install
cd apps/example
bun dev
```

Дальше открой `http://localhost:3000`. Более подробный гид: `apps/example/QUICKSTART.md`.

## Команды в корне

```bash
bun run build
bun run test
bun run check-types
bun run lint
bun run format
```

## Пакеты

- **`@echojs-ecosystem/reactivity`** — сигналы/эффекты/батчинг.
- **`@echojs-ecosystem/core`** — минимальный UI runtime: `createComponent`, `mount`, директивы, вставка/пропсы/события.
- **`@echojs-ecosystem/hyperdom`** — DSL/рендер без JSX (и control primitives).
- **`@echojs-ecosystem/router`** — программируемый роутер (есть bindings: `@echojs-ecosystem/router/hyperdom`).
- **`@echojs-ecosystem/form`** — поля/формы + валидация (Standard Schema) + bindings для Hyperdom.
- **`@echojs-ecosystem/persist`** — универсальный слой persistence для store/form-like primitives.
- **`@echojs-ecosystem/store`** — стор (используется в `persist`).
## Примеры

Ниже примеры “как сейчас принято” использовать публичные API. Для более развёрнутых примеров смотри `apps/example/`.

### 1) Реактивность: `signal` + `effect`

```ts
import { signal, effect } from "@echojs-ecosystem/reactivity";

const $count = signal(0);

effect(() => {
  console.log("count =", $count.value());
});

$count.set(1);
$count.update((v) => v + 1);
```

### 2) Минимальный UI: `createComponent` + `mount`

```ts
import { createComponent, mount, signal } from "@echojs-ecosystem/core";

const Counter = createComponent(
  ({ signal }) => {
    const $count = signal(0);
    return { $count };
  },
  (vm) => {
    const btn = document.createElement("button");
    btn.onclick = () => vm.$count.update((v) => v + 1);
    btn.textContent = `count: ${vm.$count.value()}`;
    return btn;
  },
);

mount(document.getElementById("app")!, Counter());
```

Примечание: `@echojs-ecosystem/core` ре-экспортирует reactivity-примитивы (например `signal`, `effect`) для удобства.

### 3) Router: дерево routes + `createRouter`

Полная философия и примеры: `packages/router/README.md`.

```ts
import { createRouter, createRoutes, createRouteView } from "@echojs-ecosystem/router";

const homePage = createRouteView({
  name: "home",
  view: () => "Home",
});

const router = createRouter({
  history: "memory",
  routes: createRoutes([{ path: "/", name: "home", routeView: homePage }]),
});

router.start();
router.go("/");
```

Для Hyperdom приложений подключай bindings: `@echojs-ecosystem/router/hyperdom`.

### 4) Form + Persist: поле с сохранением в localStorage

Рабочий пример из `apps/example/src/pages/auth/login/model.ts`:

```ts
import { createField, createForm, bindField } from "@echojs-ecosystem/form";
import { withLocalStorage } from "@echojs-ecosystem/persist";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Укажите корректный email"),
  remember: z.boolean(),
});

export const loginForm = createForm(
  {
    email: createField("").extend(withLocalStorage({ key: "echojs:login:email" })),
    remember: createField(false).extend(withLocalStorage({ key: "echojs:login:remember" })),
  },
  { name: "LoginForm", validationSchema: schema },
);

// В UI: input({ type: "email", ...bindField(loginForm.fields.email) })
// Ошибки: loginForm.fields.email.meta().errors
```

Bindings для UI (Hyperdom) — `bindField(form.fields.*, …)`; поля уже дают `.value()`, `.meta()`, `.handlers` (см. `apps/example/src/pages/account/account.page.ts`).

## Структура репозитория

```text
apps/
  example/            # демо-приложение (vite)
packages/
  core/
  reactivity/
  hyperdom/
  router/
  form/
  persist/
  store/
tools/
  bench/              # CLI: bundle size + perf (не публикуется)
  bench-results/      # отчёты bench/size
  scripts/            # скрипты монорепо (version sync, coverage, size report)
```

## Ссылки на README внутри пакетов

- `packages/router/README.md`
- `packages/persist/README.md`

## Единый пакет `@echojs-ecosystem/framework`

Если хочешь “установил один пакет — доступна вся экосистема”, используй meta-package `@echojs-ecosystem/framework`.

### Установка

```bash
bun add @echojs-ecosystem/framework
```

### Импорты для минимального бандла (рекомендуется)

Импортируй **конкретный модуль**, чтобы бандлер забрал только нужный граф зависимостей:

```ts
import { signal, effect } from "@echojs-ecosystem/framework/reactivity";
import { createRouter } from "@echojs-ecosystem/framework/router";
import { createForm } from "@echojs-ecosystem/framework/form";
```

Доступные под-импорты:

- `@echojs-ecosystem/framework/core`
- `@echojs-ecosystem/framework/reactivity`
- `@echojs-ecosystem/framework/hyperdom`
- `@echojs-ecosystem/framework/router`
- `@echojs-ecosystem/framework/router/hyperdom`
- `@echojs-ecosystem/framework/form`
- `@echojs-ecosystem/framework/persist`
- `@echojs-ecosystem/framework/store`
- `@echojs-ecosystem/framework/ui`

### Про install size vs bundle size

- **install size** (в `node_modules`) будет больше, потому что `@echojs-ecosystem/framework` зависит от всей экосистемы.\n+- **bundle size** будет минимальным, если ты импортируешь подмодули и у проекта включён tree-shaking.
