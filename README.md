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

## Единый пакет `@echojs/framework`

Если хочешь “установил один пакет — доступна вся экосистема”, используй meta-package `@echojs/framework`.

### Установка

```bash
bun add @echojs/framework
```

### Импорты для минимального бандла (рекомендуется)

Импортируй **конкретный модуль**, чтобы бандлер забрал только нужный граф зависимостей:

```ts
import { signal, effect } from "@echojs/framework/reactivity";
import { createRouter } from "@echojs/framework/router";
import { createForm } from "@echojs/framework/form";
```

Доступные под-импорты:

- `@echojs/framework/core`
- `@echojs/framework/reactivity`
- `@echojs/framework/hyperdom`
- `@echojs/framework/router`
- `@echojs/framework/router/hyperdom`
- `@echojs/framework/form`
- `@echojs/framework/persist`
- `@echojs/framework/store`
- `@echojs/framework/ui`

### Про install size vs bundle size

- **install size** (в `node_modules`) будет больше, потому что `@echojs/framework` зависит от всей экосистемы.\n+- **bundle size** будет минимальным, если ты импортируешь подмодули и у проекта включён tree-shaking.
