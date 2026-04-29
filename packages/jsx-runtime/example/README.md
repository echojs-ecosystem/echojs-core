# EchoJS JSX Runtime Examples

This directory contains example applications demonstrating the fine-grained reactive JSX runtime.

## Quick Start

### Prerequisites

Make sure you have Bun installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

Install dependencies:

```bash
# From project root
cd /home/jombozana/Desktop/echojs/echojs-core
bun install
```

### Run Examples

#### Option 1: Dev Server with Hot Reload (Recommended)

```bash
cd packages/jsx-runtime
bun dev
```

Then open http://localhost:3000 in your browser.

#### Option 2: Static Server (after build)

```bash
cd packages/jsx-runtime
bun run build
cd example
python -m http.server 8080
# or: npx serve .
```

Then open http://localhost:8080

#### Option 3: Using Vite

```bash
cd packages/jsx-runtime/example
npx vite --open
```

## Examples Overview

| Example            | File                           | Description                            |
| ------------------ | ------------------------------ | -------------------------------------- |
| 01 Counter         | `01-counter.tsx`               | Basic signals, computed values, events |
| 02 Conditional     | `02-conditional-rendering.tsx` | if/else vs show directives             |
| 03 Form Events     | `03-form-events.tsx`           | Event modifiers (prevent, stop, once)  |
| 04 List Rendering  | `04-list-rendering.tsx`        | Dynamic lists with filtering           |
| 05 Reactive Styles | `05-reactive-styles.tsx`       | Reactive class, style, attributes      |

## Example Structure

Each example follows the same pattern:

```tsx
import { createComponent, signal, computed, mount } from "@echojs-ecosystem/jsx-runtime";

// ViewModel: logic and state
const MyComponent = createComponent(
  () => {
    const count = signal(0);
    return {
      count,
      increment: () => count.update((n) => n + 1),
    };
  },
  // View: JSX template
  (vm) => <button on:click={vm.increment}>{vm.count}</button>,
);

// Mount to DOM
const app = document.getElementById("app");
if (app) {
  mount(app, <MyComponent />);
}
```

## Key Concepts Demonstrated

### 1. Fine-Grained Reactivity

Components never re-render. Only individual text nodes and attributes update:

```tsx
const count = signal(0);
<span>{count}</span>; // Only this text node updates
```

### 2. Event Modifiers

```tsx
<button on:click:prevent={handler}>        // preventDefault
<button on:click:stop={handler}>             // stopPropagation
<button on:click:once={handler}>             // once only
<form on:submit:prevent:stop={handler}>     // chained modifiers
```

### 3. Conditional Directives

```tsx
// if/else - creates/removes DOM
<div if={condition}>A</div>
<div else>B</div>

// show - toggles CSS visibility
<div show={condition}>Hidden but in DOM</div>
```

### 4. Reactive Attributes

```tsx
// Static
<div class="static" />

// Dynamic but non-reactive
<div class={isActive ? "active" : ""} />

// Fully reactive - updates when signal changes
<div class={activeSignal} />

// Reactive style object
<div style={{ color: colorSignal, fontSize: sizeSignal }} />
```

### 5. Component Lifecycle

```tsx
const Timer = createComponent(
  () => {
    const time = signal(0);

    // Cleanup when component unmounts
    cleanup(() => {
      clearInterval(timer);
    });

    return { time };
  },
  (vm) => <div>{vm.time}</div>,
);
```

## Architecture

```
Your TSX Code
     │
     ▼
┌─────────────────────────────────────┐
│ @echojs-ecosystem/jsx-runtime       │
│ • jsx() creates real DOM nodes      │
│ • effect() for fine-grained updates │
│ • scope() for component boundaries  │
└──────────────┬──────────────────────┘
               │
               ▼ Direct DOM manipulation
         Real DOM (no VDOM!)
```

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

Requires ES2022 support and native DOM APIs.

## Troubleshooting

### "Cannot find module"

Make sure you've run `bun install` in the project root.

### Hot reload not working

Try refreshing the page manually. The dev server uses WebSocket for hot reload.

### TypeScript errors in examples

The examples use JSX transforms that require the jsx-runtime package to be built or linked.
