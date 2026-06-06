---
title: Todo List
description: Immutable list updates — add, toggle, and filter todos in a signal.
package: "@echojs-ecosystem/reactivity"
---

# Todo List

A todo list is a **signal of objects**. Every change produces a **new array** (and new item objects when toggling) — never mutate `.value()` in place.

## Problem

Render a dynamic list, toggle item state, add rows, and derive a count of completed items.

## Model

```ts
import { computed, signal } from "@echojs-ecosystem/reactivity";
import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";

export type TodoItem = { id: number; text: string; done: boolean };

export interface TodoListVM {
  $draft: Signal<string>;
  $todos: Signal<TodoItem[]>;
  $doneCount: ReadonlySignal<number>;
  setDraft: (value: string) => void;
  addTodo: () => void;
  toggleTodo: (id: number) => void;
  clearDone: () => void;
}

let nextId = 1;

export const createTodoListModel = createModel((): TodoListVM => {
  const $draft = signal("");
  const $todos = signal<TodoItem[]>([
    { id: nextId++, text: "Learn signal()", done: true },
    { id: nextId++, text: "Try computed", done: false },
  ]);

  const $doneCount = computed(() => $todos.value().filter((t) => t.done).length);

  return {
    $draft,
    $todos,
    $doneCount,
    setDraft: (value) => $draft.set(value),
    addTodo: () => {
      const text = $draft.value().trim();
      if (!text) return;
      $todos.update((items) => [...items, { id: nextId++, text, done: false }]);
      $draft.set("");
    },
    toggleTodo: (id) => {
      $todos.update((items) =>
        items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
      );
    },
    clearDone: () => {
      $todos.update((items) => items.filter((item) => !item.done));
    },
  };
}, "TodoListModel");
```

## View sketch

```ts
List(
  () => vm.$todos.value(),
  (item) =>
    li({ class: () => (item.done ? "is-done" : "") }, [
      input({
        type: "checkbox",
        checked: () => item.done,
        onChange: () => vm.toggleTodo(item.id),
      }),
      span(null, item.text),
    ]),
);
```

Use HyperDOM `List` so row keys stay stable when the array reference changes.

## Takeaways

- `$todos.update(fn)` always returns a **new array**
- Toggle one item with `.map` + spread — do not mutate `item.done` directly
- `$doneCount` as `computed` avoids manual counter sync

## Related

- [Guides: Immutable Updates](/docs/packages/reactivity/guides/immutable-updates)
- [Guides: Computed Values](/docs/packages/reactivity/guides/computed)
