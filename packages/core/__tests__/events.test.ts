import { describe, expect, it, vi } from "vitest";
import { scope, signal, computed } from "@echojs/reactivity";
import { setEvent } from "../src/events";
import { insert } from "../src/insert";
import { createModel, createView, createComponent } from "../src/component";

describe("setEvent()", () => {
  it("поддерживает onClick / on:click / on-click", () => {
    const btn = document.createElement("button");
    const onClick = vi.fn();

    const stop = scope(() => {
      setEvent(btn, "onClick", onClick);
      setEvent(btn, "on:click", onClick);
      setEvent(btn, "on-click", onClick);
    });

    btn.click();
    expect(onClick).toHaveBeenCalledTimes(3);

    stop();
  });

  it("применяет модификаторы prevent и stop (строкой в имени события)", () => {
    const parent = document.createElement("div");
    const btn = document.createElement("button");
    parent.appendChild(btn);

    const onParent = vi.fn();
    const onBtn = vi.fn();

    parent.addEventListener("click", onParent);

    const stop = scope(() => {
      setEvent(btn, "on:click:prevent:stop", (e) => onBtn(e));
    });

    const ev = new MouseEvent("click", { bubbles: true, cancelable: true });
    btn.dispatchEvent(ev);

    expect(onBtn).toHaveBeenCalledTimes(1);
    expect(onParent).toHaveBeenCalledTimes(0);
    expect(ev.defaultPrevented).toBe(true);

    stop();
  });
});

describe("insert() dynamic", () => {
  it("корректно обновляет динамический массив строк (не залипает на DocumentFragment)", () => {
    const host = document.createElement("div");
    const $items = signal(["a", "b"]);

    const stop = scope(() => {
      insert(host, () => $items.value(), null);
    });

    expect(host.textContent).toBe("ab");

    $items.set(["a"]);
    expect(host.textContent).toBe("a");

    stop();
  });

  it("корректно обновляет динамический массив DOM элементов (как в todo списке)", () => {
    const host = document.createElement("ul");
    type Item = { id: number; text: string };
    const $items = signal<Item[]>([
      { id: 1, text: "First" },
      { id: 2, text: "Second" },
    ]);

    // Создаем элементы как это делает jsx-runtime
    const createItem = (item: Item) => {
      const li = document.createElement("li");
      li.textContent = item.text;
      li.setAttribute("data-id", String(item.id));
      return li;
    };

    const stop = scope(() => {
      insert(host, () => $items.value().map((item) => createItem(item)), null);
    });

    // Проверяем начальное состояние
    expect(host.querySelectorAll("li").length).toBe(2);
    expect(host.textContent).toContain("First");
    expect(host.textContent).toContain("Second");

    // Удаляем первый элемент (как в todo)
    $items.update((items) => items.filter((item) => item.id !== 1));

    // DOM должен обновиться сразу - остаться только Second
    expect(host.querySelectorAll("li").length).toBe(1);
    expect(host.textContent).not.toContain("First");
    expect(host.textContent).toContain("Second");

    // Удаляем второй элемент
    $items.update((items) => items.filter((item) => item.id !== 2));

    // DOM должен быть пуст
    expect(host.querySelectorAll("li").length).toBe(0);

    stop();
  });

  it("корректно обновляет список через createComponent (как в todo.tsx)", () => {
    interface Todo {
      id: number;
      text: string;
    }

    const todoModel = createModel(() => {
      const todos = signal<Todo[]>([
        { id: 1, text: "First" },
        { id: 2, text: "Second" },
      ]);

      return {
        todos,
        removeTodo: (id: number) => {
          todos.update((list) => list.filter((t) => t.id !== id));
        },
      };
    });

    const TodoView = createView(
      (vm: { todos: ReturnType<typeof signal<Todo[]>>; removeTodo: (id: number) => void }) => {
        const host = document.createElement("ul");

        insert(
          host,
          () =>
            vm.todos.value().map((todo) => {
              const li = document.createElement("li");
              li.textContent = todo.text;
              li.setAttribute("data-id", String(todo.id));

              const btn = document.createElement("button");
              btn.textContent = "x";
              btn.onclick = () => vm.removeTodo(todo.id);
              li.appendChild(btn);

              return li;
            }),
          null,
        );

        return host;
      },
    );

    const container = document.createElement("div");
    const stop = scope(() => {
      const vm = todoModel();
      const view = TodoView(vm);
      container.appendChild(view as Node);
    });

    // Проверяем начальное состояние
    expect(container.querySelectorAll("li").length).toBe(2);
    expect(container.textContent).toContain("First");
    expect(container.textContent).toContain("Second");

    // Кликаем на удаление первого элемента
    const firstBtn = container.querySelector('li[data-id="1"] button');
    expect(firstBtn).not.toBeNull();
    (firstBtn as HTMLButtonElement).click();

    // Должен остаться только Second
    expect(container.querySelectorAll("li").length).toBe(1);
    expect(container.textContent).not.toContain("First");
    expect(container.textContent).toContain("Second");

    // Кликаем на удаление второго элемента
    const secondBtn = container.querySelector('li[data-id="2"] button');
    expect(secondBtn).not.toBeNull();
    (secondBtn as HTMLButtonElement).click();

    // Должно быть пусто
    expect(container.querySelectorAll("li").length).toBe(0);

    stop();
  });

  it("корректно обновляет список через createComponent полный цикл", () => {
    interface Todo {
      id: number;
      text: string;
    }

    const todoModel = () => {
      const todos = signal<Todo[]>([
        { id: 1, text: "First" },
        { id: 2, text: "Second" },
      ]);

      return {
        todos,
        removeTodo: (id: number) => {
          todos.update((list) => list.filter((t) => t.id !== id));
        },
      };
    };

    const TodoView = createView((vm: ReturnType<typeof todoModel>) => {
      const host = document.createElement("ul");

      insert(
        host,
        () =>
          vm.todos.value().map((todo) => {
            const li = document.createElement("li");
            li.textContent = todo.text;
            li.setAttribute("data-id", String(todo.id));

            const btn = document.createElement("button");
            btn.textContent = "x";
            setEvent(btn, "onClick", () => vm.removeTodo(todo.id));
            li.appendChild(btn);

            return li;
          }),
        null,
      );

      return host;
    });

    const TodoListComponent = createComponent(todoModel, TodoView);

    const app = document.createElement("div");
    const stop = scope(() => {
      const component = TodoListComponent();
      app.appendChild(component as Node);
    });

    // Проверяем начальное состояние
    expect(app.querySelectorAll("li").length).toBe(2);
    expect(app.textContent).toContain("First");
    expect(app.textContent).toContain("Second");

    // Кликаем на удаление первого элемента
    const firstBtn = app.querySelector('li[data-id="1"] button');
    expect(firstBtn).not.toBeNull();
    (firstBtn as HTMLButtonElement).click();

    // Должен остаться только Second
    expect(app.querySelectorAll("li").length).toBe(1);
    expect(app.textContent).not.toContain("First");
    expect(app.textContent).toContain("Second");

    stop();
  });
});
