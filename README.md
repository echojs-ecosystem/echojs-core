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

- **`@echojs/reactivity`** — сигналы/эффекты/батчинг.
- **`@echojs/core`** — минимальный UI runtime: `createComponent`, `mount`, директивы, вставка/пропсы/события.
- **`@echojs/hyperdom`** — DSL/рендер без JSX (и control primitives).
- **`@echojs/router`** — программируемый роутер (есть bindings: `@echojs/router/hyperdom`).
- **`@echojs/form`** — поля/формы + валидация (Standard Schema) + bindings для Hyperdom.
- **`@echojs/persist`** — универсальный слой persistence для store/form-like primitives.
- **`@echojs/store`** — стор (используется в `persist`).
- **`@echojs/bench`** — CLI/утилиты для performance/size бенчей.

## Примеры

Ниже примеры “как сейчас принято” использовать публичные API. Для более развёрнутых примеров смотри `apps/example/`.

### 1) Реактивность: `signal` + `effect`

```ts
import { signal, effect } from "@echojs/reactivity";

const $count = signal(0);

effect(() => {
  console.log("count =", $count.value());
});

$count.set(1);
$count.update((v) => v + 1);
```

### 2) Минимальный UI: `createComponent` + `mount`

```ts
import { createComponent, mount, signal } from "@echojs/core";

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

Примечание: `@echojs/core` ре-экспортирует reactivity-примитивы (например `signal`, `effect`) для удобства.

### 3) Router: дерево routes + `createRouter`

Полная философия и примеры: `packages/router/README.md`.

```ts
import { createRouter, createRoutes, createRouteView } from "@echojs/router";

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

Для Hyperdom приложений подключай bindings: `@echojs/router/hyperdom`.

### 4) Form + Persist: поле с сохранением в localStorage

Рабочий пример из `apps/example/src/pages/auth/login/model.ts`:

```ts
import { createField, createForm, wireFormModel } from "@echojs/form";
import { withLocalStorage } from "@echojs/persist";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Укажите корректный email"),
  remember: z.boolean(),
});

const form = createForm(
  {
    email: createField("").extend(withLocalStorage({ key: "echojs:login:email" })),
    remember: createField(false).extend(withLocalStorage({ key: "echojs:login:remember" })),
  },
  { name: "LoginForm", validationSchema: schema },
);

export const ui = wireFormModel(form.fields);
```

Bindings для UI (Hyperdom) живут в `@echojs/form` как `bindField(...)` (см. `apps/example/src/features/forms-mini/ui/mini-forms.view.ts`).

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
  bench/
```

## Ссылки на README внутри пакетов

- `packages/router/README.md`
- `packages/persist/README.md`

# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
bun dlx turbo build
bun exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
bun exec turbo build --filter=docs
bun exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
bun exec turbo dev
bun exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
bun exec turbo dev --filter=web
bun exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
bun exec turbo login
bun exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
bun exec turbo link
bun exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
