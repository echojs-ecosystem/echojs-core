<div align="center">

# @echojs-ecosystem/permission

**Type-safe permission engine for EchoJS — signals, SSR hydration, RBAC/ABAC/ReBAC.**

[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/permission)

</div>

---

`@echojs-ecosystem/permission` — framework-agnostic движок прав доступа для EchoJS. Построен на [`@echojs-ecosystem/reactivity`](https://www.npmjs.com/package/@echojs-ecosystem/reactivity), работает на client/server/SSR, без React/Vue/Solid и без Virtual DOM.

Похож по идее на Permix, но с собственной архитектурой, адаптированной под signal-native экосистему EchoJS.

## Зачем нужен

- **Type-safe API** — `check("post.edit", post)` проверяется на этапе компиляции
- **Signal-native** — `$ready`, `$version`, `$snapshot` для реактивного UI
- **SSR transfer** — `dehydrate()` / `hydrate()` для передачи boolean-прав с сервера
- **Гибкие модели** — RBAC, ABAC, ReBAC через boolean, templates и payload-rules
- **Devtools-ready** — события и snapshot для будущей интеграции с `@echojs-ecosystem/devtools`

## Install

```bash
npm install @echojs-ecosystem/permission @echojs-ecosystem/reactivity
```

## Quick start

```ts
import { createPermission } from "@echojs-ecosystem/permission";

interface Post {
  id: string;
  authorId: string;
  published: boolean;
}

const currentUser = { id: "u1", role: "admin" as const };

const permission = createPermission<{
  post: [
    "create",
    { name: "edit"; type: Post },
    { name: "delete"; type: Post },
    "read",
  ];
  user: ["read", "update", "delete"];
}>();

permission.setup({
  post: {
    create: true,
    read: true,
    edit: (post) => post.authorId === currentUser.id || currentUser.role === "admin",
    delete: (post) => currentUser.role === "admin",
  },
  user: {
    read: true,
    update: currentUser.role === "admin",
    delete: false,
  },
});

permission.check("post.create"); // true
permission.check("post.edit", post); // depends on authorId / role
permission.check("user.delete"); // false
```

## API

| Export | Description |
|--------|-------------|
| `createPermission` | Создаёт type-safe permission instance |
| `createPermissionTemplate` | Preset/template для `setup()` |

### `setup(config)`

Настраивает правила по resource/action. Rule может быть:

- `boolean`
- `(payload) => boolean`
- `async (payload) => Promise<boolean>`

После `setup()` instance становится `ready`.

### `check(key, payload?)`

Синхронная проверка. Возвращает `false`, если:

- instance не настроен (`ready === false`)
- action не найден

Если rule — async function или возвращает `Promise`, `check()` выбрасывает ошибку с подсказкой использовать `checkAsync()`.

### `checkAsync(key, payload?)`

Асинхронная проверка. Поддерживает boolean, sync и async rules. Всегда возвращает `Promise<boolean>`.

### Aliases

- `can` = `check`
- `cannot` = `!check`

## Payload-based permissions (ReBAC / ABAC)

```ts
permission.setup({
  project: {
    update: (project) =>
      project.members.some((member) => member.id === currentUser.id),
  },
});
```

### Модели доступа

| Модель | Как использовать |
|--------|------------------|
| **RBAC** | Boolean rules и templates по ролям (`adminTemplate`) |
| **ABAC** | Function rules с атрибутами в payload |
| **ReBAC** | Function rules с relationship data (members, ownerId, ACL) |

## Templates

```ts
import { createPermission, createPermissionTemplate } from "@echojs-ecosystem/permission";

const adminTemplate = createPermissionTemplate({
  post: {
    create: true,
    read: true,
    edit: true,
    delete: true,
  },
});

permission.setup(adminTemplate);

// или с override
permission.setup({
  ...adminTemplate,
  post: {
    ...adminTemplate.post,
    delete: false,
  },
});
```

## Ready state

- По умолчанию `ready = false`
- После `setup()` — `ready = true`
- `isReady()` / `$ready` signal
- `setReady(value)` — ручное управление

## SSR hydration

```ts
// server
const snapshot = permission.dehydrate();
// передать snapshot клиенту

// client
permission.hydrate(snapshot);
```

`dehydrate()` возвращает:

```ts
{
  version: number;
  ready: boolean;
  rules: Record<string, Record<string, boolean>>; // только boolean rules
}
```

**Ограничение:** function rules нельзя сериализовать. При `dehydrate()` они пропускаются. После `hydrate()` на клиенте нужно доопределить function rules через `setup()` или восстановить контекст иначе.

## Events

```ts
permission.events.setup.watch(() => {});
permission.events.change.watch(() => {});
permission.events.reset.watch(() => {});
permission.events.hydrate.watch(({ snapshot }) => {});
permission.events.check.watch(({ key, result, payload }) => {});

// shorthand
permission.on("setup", () => {});
```

События подготовлены для будущей интеграции с devtools.

## Signals

- `$ready: Signal<boolean>`
- `$version: Signal<number>` — инкрементируется при `setup` / `reset` / `hydrate` / `setReady`
- `$snapshot: ReadonlySignal<PermissionSnapshot | null>`

## TypeScript

```ts
permission.check("post.create"); // OK — без payload
permission.check("post.edit", post); // OK — payload типа Post
permission.check("post.edit"); // TS error — payload обязателен
permission.check("post.unknown"); // TS error — неизвестный action
```

## Limitations (v0)

- Нет router integration
- Нет UI integration
- Нет devtools integration
- Function rules нельзя сериализовать в snapshot
- Нет server middleware helpers
- Нет generated permissions from DB schema

## License

MIT
