# @echojs/store

Минимальный store layer поверх [`@echojs/reactivity`](../reactivity) (alien-signals).

Пакет framework-agnostic и SSR-friendly: без `localStorage`, без browser-only API, без UI-фреймворков.

## Зачем

- удобное состояние приложения (`value`, `set`, `update`, `reset`)
- события изменения (`changed`, `reseted`, `subscribe`)
- расширения через `.extend()` (actions, debug, readonly)
- основа для будущего [`@echojs/persist`](../persist) через `.extend()`

Persistence **не входит** в этот пакет.

## Установка

```bash
bun add @echojs/store
```

## Basic store

```ts
import { createStore } from "@echojs/store";

const counter = createStore(0, { name: "counter" });

counter.set(1);
counter.update((v) => v + 1);
counter.reset();
```

## Subscribe

```ts
const unsubscribe = counter.subscribe((value, prevValue) => {
  console.log({ value, prevValue });
});

unsubscribe();
```

События:

```ts
counter.changed.watch(({ value, prevValue }) => {});
counter.reseted.watch(({ value, prevValue }) => {});
```

## Extend

```ts
const counter = createStore(0).extend((store) => ({
  increment() {
    store.update((v) => v + 1);
  },
}));

counter.increment();
```

Chaining:

```ts
const counter = createStore(0)
  .extend(withCounterActions())
  .extend(withDebug());
```

## Actions

```ts
import { createStore, withActions } from "@echojs/store";

const counter = createStore(0).extend(
  withActions({
    increment: (store) => () => store.update((v) => v + 1),
    add: (store) => (amount: number) => store.update((v) => v + amount),
  }),
);

counter.increment();
counter.add(5);
```

## Select

```ts
import { createStore, select } from "@echojs/store";

const userStore = createStore({
  id: "1",
  name: "Vova",
});

const userName = select(userStore, (user) => user.name);

userName.value();
userName.subscribe((name, prevName) => {});
```

## Combine

```ts
import { combine, createStore } from "@echojs/store";

const firstName = createStore("Vova");
const lastName = createStore("Ivanov");

const fullName = combine(
  { firstName, lastName },
  ({ firstName, lastName }) => `${firstName} ${lastName}`,
);
```

## Readonly

```ts
import { createStore, readonly, withReadonly } from "@echojs/store";

const counter = createStore(0);
const view = readonly(counter);

// или заблокировать мутации на том же объекте:
counter.extend(withReadonly());
```

## Batch

```ts
import { batch } from "@echojs/store";

batch(() => {
  counter.set(1);
  other.set(true);
});
```

Реэкспорт `batch` из `@echojs/reactivity`.

## Equals

По умолчанию — `Object.is`. Можно передать кастомную функцию или `equals: false`, чтобы всегда считать значение изменившимся.

## Future persist

Persistence будет в отдельном пакете `@echojs/persist`:

```ts
// будущий API
const theme = createStore("dark").extend(
  withLocalStorage({ key: "theme" }),
);
```

## API

| Export | Описание |
|--------|----------|
| `createStore` | Создать mutable store |
| `select` | Производный readonly store по селектору |
| `combine` | Readonly store из нескольких источников |
| `batch` | Группировка обновлений (из reactivity) |
| `withActions` | Extension с action-фабриками |
| `withDebug` | Логирование изменений в console |
| `withReadonly` | Запрет `set` / `update` / `reset` |
| `readonly` | Readonly view без мутаций |
