import {
    createModel,
    createView,
    signal,
    computed,
    type Signal,
    type ReadonlySignal,
    createComponent,
    effect,
} from '@echojs-ecosystem/core';

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

interface TodoVM {
    filter: Signal<'all' | 'active' | 'completed'>;
    filteredTodos: ReadonlySignal<readonly Todo[]>;
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    setFilter: (f: 'all' | 'active' | 'completed') => void;
}

const todoModel = createModel((): TodoVM => {
    let nextId = 1;
    const todos = signal<Todo[]>([
        { id: nextId++, text: 'Learn EchoJS', done: false },
        { id: nextId++, text: 'Build an app', done: false },
    ]);
    const filter = signal<'all' | 'active' | 'completed'>('all');

    const filteredTodos = computed(() => {
        const list = todos.value();
        const f = filter.value();
        if (f === 'active') return list.filter((t) => !t.done);
        if (f === 'completed') return list.filter((t) => t.done);
        return list;
    });

    effect(() => {
        console.log('todos', todos.value());
    });

    return {
        filter,
        filteredTodos,
        addTodo: (text: string) => {
            if (!text.trim()) return;
            todos.update((list) => [
                ...list,
                { id: nextId++, text, done: false },
            ]);
        },
        toggleTodo: (id: number) => {
            todos.update((list) =>
                list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
            );
        },
        removeTodo: (id: number) => {
            todos.update((list) => list.filter((t) => t.id !== id));
        },
        setFilter: (f: 'all' | 'active' | 'completed') => filter.set(f),
    };
});

const TodoView = createView((vm: TodoVM) => {
    const inputValue = signal('');

    return (
        <div class='todo-demo'>
            <h3>Todo List (New API)</h3>

            <div class='filters'>
                {(['all', 'active', 'completed'] as const).map((f) => (
                    <button
                        class={computed(() =>
                            vm.filter.value() === f ? 'active' : '',
                        )}
                        type='button'
                        on:click={() => vm.setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <form
                on:submit={(e: Event) => {
                    e.preventDefault();
                    vm.addTodo(inputValue.value());
                    inputValue.set('');
                }}
            >
                <input
                    type='text'
                    class='todo-input'
                    placeholder='What needs to be done?'
                    value={inputValue}
                    on:input={(e: Event) =>
                        inputValue.set((e.target as HTMLInputElement).value)
                    }
                />
                <button type='submit'>Add</button>
            </form>

            <ul class='todo-list'>
                {() =>
                    vm.filteredTodos.value().map((todo) => (
                        <li class={todo.done ? 'done' : ''}>
                            <input
                                type='checkbox'
                                checked={todo.done}
                                onChange={() => vm.toggleTodo(todo.id)}
                            />
                            <span>{todo.text}</span>
                            <button
                                type='button'
                                onClick={() => vm.removeTodo(todo.id)}
                            >
                                x
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
});

export const TodoListComponent = createComponent(todoModel, TodoView);
