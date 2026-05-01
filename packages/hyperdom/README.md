# @echojs/hyperdom

`@echojs/hyperdom` — минимальный DOM runtime для экосистемы EchoJS: **без Virtual DOM**, с hyperscript API (`h`) и базовыми control-хелперами (`Show`, `List`).

Этот пакет задуман как **фундамент для будущего JSX-компилятора**: позже JSX будет компилироваться в вызовы `h()`/`Show()`/`List()`, но сам JSX в этот пакет не входит.

## Зачем

- **Прямой DOM**: `h()` создаёт реальные DOM-узлы.
- **Реактивность**: динамические children и reactive props обновляются через `@echojs-ecosystem/reactivity`.
- **Cleanup**: `render()` возвращает `dispose()`, который снимает эффекты/подписки и очищает DOM.

## Быстрый старт

```ts
import { h, render, Show, List } from "@echojs/hyperdom";
import { signal } from "@echojs-ecosystem/reactivity";

const count = signal(0);
const items = signal(["A", "B", "C"]);

const view = h("div", { class: "app" }, [
  h("h1", null, "Counter"),
  h("button", { onClick: () => count.set(count.value() + 1) }, "Increment"),
  h("span", null, () => count.value()),

  Show(
    () => count.value() > 0,
    () => h("p", null, "Count больше нуля"),
  ),

  List(items, (item) => h("div", { class: "item" }, item)),
]);

const dispose = render(view, document.getElementById("app")!);

// позже:
dispose();
```

## `h()`

Поддерживает:

```ts
h("div");
h("div", null);
h("div", { class: "box" });
h("div", { id: "app" }, "text");
h("div", null, ["a", "b"]);
h("div", null, () => count.value()); // reactive child region
h(MyComponent, { some: "prop" });
```

Типы children:

- `string` / `number` → `Text` node
- `boolean` / `null` / `undefined` → **не рендерятся**
- `Node` → вставляется как есть
- массивы → flatten (включая вложенные)
- `() => Child` → динамический реактивный регион (marker comment nodes)

## `render(view, container)`

- очищает `container` перед вставкой
- монтирует `view`
- возвращает `dispose()`
- `dispose()` чистит эффекты/подписки, снимает event listeners и очищает DOM

## Props

Поддерживаются:

- `class` / `className`
- `style`: `string` или объект
- `id`, `title`, `value`, `checked`, `disabled`
- `data-*`, `aria-*`
- `ref: (el) => void`

Props могут быть:

- обычным значением
- функцией `() => value` — будет реактивно обновлять prop

## Events

События навешиваются через `addEventListener` и снимаются при cleanup:

```ts
h("button", { onClick: () => {} }, "Click");
h("input", { onInput: (e) => {} });
```

Сейчас поддерживается формат `onClick/onInput/...` (переводится в `click/input/...`).

## `Show()`

```ts
Show(
  () => isOpen.value(),
  () => h("div", null, "Open"),
  () => h("div", null, "Closed"),
);
```

## `List()`

```ts
List(items, (item, index) => h("div", null, [index(), ": ", item]));
```

### Ограничения первой версии

- `List()` пока делает **полный re-render** списка при изменении массива.
  - TODO: keyed reconciliation / оптимизированный diff.
- JSX-компилятор пока не входит в пакет.
- TODO: расширенный синтаксис событий вида `on:event:name`.
