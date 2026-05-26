# @echojs/persist

Универсальный persistence-layer для [`@echojs/store`](../store) и любых **persistable** primitives с контрактом `value` / `set` / `subscribe`.

Persistence подключается через `.extend()` — `@echojs/store` не знает про browser storage.

## Philosophy

`@echojs/persist` — storage/persistence layer для:

- `@echojs/store`
- будущего `@echojs/form` (`createField`, `createFieldArray`, `createForm`)
- любых объектов, реализующих `Persistable<Value>`

Пакет **не зависит** от `@echojs/form` — только от общего контракта.

## Установка

```bash
bun add @echojs/persist @echojs/store
```

## Basic store persistence

```ts
import { createStore } from "@echojs/store";
import { withLocalStorage } from "@echojs/persist";

export const themeStore = createStore("dark", {
  name: "theme",
}).extend(
  withLocalStorage({
    key: "app-theme",
  }),
);
```

## Manual hydrate

```ts
const draft = createStore("").extend(
  withLocalStorage({
    key: "draft",
    hydrate: false,
  }),
);

await draft.persist.hydrate();
```

## Session / Cookie / IndexedDB

```ts
import {
  withSessionStorage,
  withCookie,
  withIndexedDB,
} from "@echojs/persist";

const filtersStore = createStore({ search: "", category: null }).extend(
  withSessionStorage({ key: "catalog-filters", version: 1 }),
);

const tokenStore = createStore<string | null>(null).extend(
  withCookie({
    key: "access-token",
    path: "/",
    sameSite: "lax",
    secure: true,
  }),
);

const cacheStore = createStore<Record<string, Product>>({}).extend(
  withIndexedDB({
    key: "products-cache",
    dbName: "echojs",
    storeName: "kv",
  }),
);
```

## Form field persistence (будущий API)

```ts
const nameField = createField("", { name: "name" }).extend(
  withLocalStorage({
    key: "profile:name",
  }),
);

const phonesFieldArray = createFieldArray<string>([], { name: "phones" }).extend(
  withLocalStorage({
    key: "profile:phones",
  }),
);
```

Без `.extend()`:

```ts
import { persist, withLocalStorage } from "@echojs/persist";

persist(nameField, withLocalStorage({ key: "profile:name" }));
```

## Whole form persistence

```ts
const profileForm = createForm({
  fields: {
    name: createField(""),
    email: createField(""),
    phones: createFieldArray<string>([]),
  },
}).extend(
  withLocalStorage({
    key: "profile-form",
  }),
);
```

## Persist API

После `.extend()` доступен объект `persist`:

```ts
await userStore.persist.hydrate();
await userStore.persist.save();
await userStore.persist.clear();

userStore.persist.pause();
userStore.persist.resume();

userStore.persist.$hydrated.value();
userStore.persist.$pending.value();
userStore.persist.$error.value();
```

## Persist record

В storage сохраняется record:

```ts
type PersistRecord<Snapshot> = {
  version: number;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  data: Snapshot;
};
```

## TTL

```ts
withLocalStorage({
  key: "draft",
  ttl: 1000 * 60 * 60,
});
```

Просроченные записи удаляются при hydrate.

## Migration

```ts
withLocalStorage({
  key: "settings",
  version: 2,
  migrate: ({ data, version }) => {
    if (version === 1) {
      return migrateV1ToV2(data);
    }
    return data as Settings;
  },
});
```

## Select / Merge

```ts
const auth = createStore({
  token: null,
  user: null,
}).extend(
  withCookie({
    key: "token",
    select: (state) => state.token,
    merge: (state, token) => ({
      ...state,
      token,
    }),
  }),
);
```

## Cookie warning

- Cookie **маленькие** (≈4KB на домен).
- Cookie **отправляются на сервер** с каждым запросом.
- Не храните большие JSON и чувствительные данные без понимания рисков.

## IndexedDB

- `hydrate` / `save` — **async**
- `$pending` — `true` во время операций
- `$hydrated` / `$error` — статус hydration

Если IndexedDB недоступен — fallback в in-memory storage (dev warning).

## Custom adapter

```ts
import { createStore } from "@echojs/store";
import { withStorage } from "@echojs/persist";

const customStorage = {
  kind: "custom",
  getItem: (key) => externalStorage.get(key),
  setItem: (key, value) => externalStorage.set(key, value),
  removeItem: (key) => externalStorage.delete(key),
};

const store = createStore(0).extend(
  withStorage(customStorage, {
    key: "counter",
  }),
);
```

## SSR / tests

- `withMemoryStorage()` / `createMemoryStorageAdapter()` — для тестов и SSR fallback.
- Browser adapters проверяют `window` / `document` / `indexedDB` и не падают без них.

## Public API

| Export | Описание |
|--------|----------|
| `withStorage` | Generic extension с adapter |
| `withLocalStorage` | localStorage (+ `syncTabs`) |
| `withSessionStorage` | sessionStorage |
| `withCookie` | document.cookie |
| `withIndexedDB` | IndexedDB KV |
| `withMemoryStorage` | In-memory |
| `persist` | Helper для target без `.extend()` |
| `persistField` / `persistFieldArray` | Алиасы для form-like targets |
| `create*StorageAdapter` | Низкоуровневые adapters |
| `jsonSerializer` | JSON serializer по умолчанию |
