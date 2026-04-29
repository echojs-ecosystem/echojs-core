/**
 * Example 4: List Rendering
 * Demonstrates dynamic lists with fine-grained updates
 */

import {
  createComponent,
  signal,
  computed,
  mount,
} from "@echojs-ecosystem/jsx-runtime";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const TodoList = createComponent(
  () => {
    let nextId = 1;
    const todos = signal<Todo[]>([
      { id: nextId++, text: "Learn EchoJS", done: false },
      { id: nextId++, text: "Build something cool", done: false },
    ]);
    const filter = signal<"all" | "active" | "completed">("all");

    const filteredTodos = computed(() => {
      const list = todos.value();
      const f = filter.value();
      if (f === "active") return list.filter((t) => !t.done);
      if (f === "completed") return list.filter((t) => t.done);
      return list;
    });

    const stats = computed(() => {
      const list = todos.value();
      const total = list.length;
      const completed = list.filter((t) => t.done).length;
      return { total, completed, remaining: total - completed };
    });

    return {
      todos,
      filter,
      filteredTodos,
      stats,
      addTodo: (text: string) => {
        if (!text.trim()) return;
        todos.update((list) => [
          ...list,
          { id: nextId++, text, done: false },
        ]);
      },
      toggleTodo: (id: number) => {
        todos.update((list) =>
          list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
      },
      removeTodo: (id: number) => {
        todos.update((list) => list.filter((t) => t.id !== id));
      },
      setFilter: (f: "all" | "active" | "completed") => filter.set(f),
    };
  },
  (vm) => {
    let inputValue = "";

    return (
      <div class="todo-list">
        <h2>Todo List</h2>

        <div class="stats">
          Total: {vm.stats.value().total} | Done: {vm.stats.value().completed} |
          Left: {vm.stats.value().remaining}
        </div>

        <div class="filters">
          {["all", "active", "completed"].map((f) => (
            <button
              class={vm.filter.value() === f ? "active" : ""}
              on:click={() =>
                vm.setFilter(f as "all" | "active" | "completed")
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <form
          on:submit:prevent={() => {
            vm.addTodo(inputValue);
            inputValue = "";
            const input = document.querySelector(
              '.todo-input'
            ) as HTMLInputElement;
            if (input) input.value = "";
          }}
        >
          <input
            type="text"
            class="todo-input"
            placeholder="What needs to be done?"
            on:input={(e: Event) =>
              (inputValue = (e.target as HTMLInputElement).value)
            }
          />
          <button type="submit">Add Todo</button>
        </form>

        <ul class="todos">
          {vm.filteredTodos.value().map((todo) => (
            <li class={todo.done ? "done" : ""}>
              <input
                type="checkbox"
                checked={todo.done}
                on:change={() => vm.toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button on:click={() => vm.removeTodo(todo.id)}>×</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

const app = document.getElementById("app");
if (app) {
  mount(app, <TodoList />);
}
