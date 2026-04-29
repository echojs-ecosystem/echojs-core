# @echojs-ecosystem/jsx-runtime

Fine-grained reactive JSX runtime for EchoJS - a frontend framework built on signals with **no virtual DOM** and **no reconciliation/diffing**.

## Philosophy

- **Direct DOM manipulation** - JSX creates real DOM nodes, not virtual representations
- **Fine-grained reactivity** - Updates are driven by signals, not re-renders
- **Scoped components** - Each component has its own reactive scope with automatic cleanup
- **No VDOM overhead** - Minimal memory footprint and predictable performance

## Installation

```bash
bun install @echojs-ecosystem/jsx-runtime @echojs-ecosystem/reactivity
```

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@echojs-ecosystem/jsx-runtime"
  }
}
```

## API Overview

### Reactivity (from @echojs-ecosystem/reactivity)

```ts
import { signal, computed, effect, scope, cleanup } from "@echojs-ecosystem/jsx-runtime";

const count = signal(0);
const double = computed(() => count.value() * 2);

effect(() => {
  console.log("Count:", count.value());
});

count.set(5); // Updates all subscribers
```

### Component Definition

Components are defined with **separation of ViewModel and View**:

```tsx
import { createComponent, signal, computed } from "@echojs-ecosystem/jsx-runtime";

const Counter = createComponent(
  // ViewModel: logic and state
  () => {
    const count = signal(0);
    const double = computed(() => count.value() * 2);

    return {
      count,
      double,
      increment: () => count.update((n) => n + 1),
      decrement: () => count.update((n) => n - 1),
    };
  },
  // View: JSX template
  (vm) => (
    <div>
      <button on:click={vm.decrement}>-</button>
      <span>{vm.count}</span>
      <button on:click={vm.increment}>+</button>
      <p>Double: {vm.double}</p>
    </div>
  ),
);
```

### Mounting

```tsx
import { mount, createRoot } from "@echojs-ecosystem/jsx-runtime";

// Single mount
const { node, dispose } = mount(document.getElementById("app")!, <Counter />);

// Root with lifecycle management
const root = createRoot(document.getElementById("app")!);
root.mount(<Counter />);

// Cleanup
root.unmount();
dispose();
```

## JSX Features

### Reactive Bindings

Any signal or computed value is automatically reactive:

```tsx
const text = signal("Hello");
const visible = signal(true);

<span>{text}</span>; // Updates automatically when text changes
```

### Event Handling

```tsx
// Basic event
<button on:click={handler}>Click</button>

// With modifiers
<form on:submit:prevent={handler}>Submit</form>
<button on:click:stop={handler}>Stop propagation</button>
<input on:input:prevent:stop={handler} />
```

**Supported modifiers:**

- `prevent` - `event.preventDefault()`
- `stop` - `event.stopPropagation()`
- `capture` - Use capture phase
- `once` - Remove listener after first trigger
- `self` - Only trigger if target is the element itself

### Conditional Rendering

#### `if` / `else` / `else-if`

```tsx
<div if={condition}>Shown when true</div>
<div else>Shown when false</div>
```

```tsx
<div if={conditionA}>A</div>
<div else-if={conditionB}>B</div>
<div else>C</div>
```

**Note:** `if` / `else` directives actually **create/destroy** DOM nodes.

#### `show` Directive

```tsx
<div show={visible}>Toggles visibility with display:none</div>
```

The `show` directive only toggles CSS visibility - the node remains in the DOM.

### Attributes & Props

```tsx
// Static
<div id="main" data-active />

// Dynamic (non-reactive)
<div class={isActive ? "active" : ""} />

// Reactive - updates automatically
<div class={activeSignal} />

// Style object
<div style={{ color: "red", fontSize: "16px" }} />

// Reactive style
<div style={styleSignal} />

// Boolean attributes
<input disabled={isDisabled} />

// Explicit attribute (not property)
<div attr:data-custom={value} />

// Explicit property
<input prop:value={signalValue} />
```

### Lists & Fragments

```tsx
// Array of elements
<ul>
  {items.value().map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>

// Fragment
<>
  <div>First</div>
  <div>Second</div>
</>
```

## Component Lifecycle

Each component creates its own reactive scope:

```tsx
const Timer = createComponent(
  () => {
    const time = signal(0);

    // Register cleanup for side effects
    const interval = setInterval(() => {
      time.update((t) => t + 1);
    }, 1000);

    cleanup(() => {
      clearInterval(interval);
    });

    return { time };
  },
  (vm) => <div>Elapsed: {vm.time}s</div>,
);
```

When the component is unmounted:

1. All effects are disposed
2. All event listeners are removed
3. All cleanup functions are called
4. The reactive scope is destroyed

## Advanced Usage

### Manual Insertion

```tsx
import { insert, createElement, setProp } from "@echojs-ecosystem/jsx-runtime";

const element = createElement("div");
setProp(element, "className", "container");
insert(element, <ChildComponent />);
```

### Conditional Helper

```tsx
import { _$if } from "@echojs-ecosystem/jsx-runtime";

_$if(
  parentNode,
  conditionSignal,
  () => <div>Then branch</div>,
  () => <div>Else branch</div>,
);
```

## Architecture

```
jsx-runtime/
  jsx-runtime.ts      # JSX factory (jsx, jsxs, Fragment)
  component.ts        # createComponent API
  element.ts          # DOM element creation & attribute handling
  text.ts             # Text node creation with reactivity
  insert.ts           # Child insertion (handles arrays, signals)
  events.ts           # Event delegation & modifiers
  mount.ts            # Mount/unmount utilities
  directives/
    if.ts             # if/else/else-if implementation
    show.ts           # show directive implementation
  internals/
    utils.ts          # Type guards & utilities
  types.ts            # TypeScript definitions
```

## Differences from React

| Feature      | React                 | EchoJS                           |
| ------------ | --------------------- | -------------------------------- |
| Re-rendering | Full component re-run | Never re-runs components         |
| Updates      | VDOM diffing          | Direct signal → DOM binding      |
| State        | useState              | signal()                         |
| Effects      | useEffect             | effect() (no dependency array)   |
| Cleanup      | useEffect return      | cleanup()                        |
| Components   | Functions             | createComponent(ViewModel, View) |

## License

MIT
