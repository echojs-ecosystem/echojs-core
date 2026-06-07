---
title: Why HyperDOM, not JSX
description:
  Why EchoJS uses HyperDOM instead of JSX, and how declarative vs imperative UI
  authoring compares.
keywords: [hyperdom, jsx, declarative, imperative, h, createView, templates]
---

# Why HyperDOM, not JSX

EchoJS apps are built with **HyperDOM** — TypeScript functions that return real
DOM via `h()`, `createView`, and small control helpers (`Show`, `List`). We **do
not** use JSX or a template compiler in the official stack.

This page explains **why**, and how that choice relates to **declarative** vs
**imperative** UI code.

## Table of contents

1. [Short answer](#short-answer)
2. [What JSX optimizes for](#what-jsx-optimizes-for)
3. [What HyperDOM optimizes for](#what-hyperdom-optimizes-for)
4. [Declarative vs imperative UI](#declarative-vs-imperative-ui)
5. [Where HyperDOM sits](#where-hyperdom-sits)
6. [Side-by-side examples](#side-by-side-examples)
7. [Myths](#myths)
8. [When JSX still makes sense](#when-jsx-still-makes-sense)
9. [Related docs](#related-docs)

---

## Short answer

| Question                | Answer                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Is HyperDOM “anti-JSX”? | No — it is **optional sugar** we skip in favor of **plain TS + direct DOM**               |
| Is EchoJS imperative?   | **Views are declarative** (UI follows state). **Syntax** looks more explicit than JSX     |
| Do we need a compiler?  | **No** SFC/JSX plugin in CI — only `tsc`                                                  |
| Can I use JSX anyway?   | Not in core HyperDOM apps; `@echojs-ecosystem/core` is a separate JSX-oriented experiment |

EchoJS targets **signal-first SPAs** with **feature-first folders**. HyperDOM
matches that: explicit dependencies, typed views, one less build pipeline.

---

## What JSX optimizes for

JSX is **syntax sugar** over `createElement` (React) or **compiled bindings**
(Solid). It is excellent when:

- Authors want **HTML-like** markup inside TypeScript
- A **compiler** can analyze components, hoist static trees, and optimize
- Ecosystem tools (Prettier, ESLint, Storybook) assume `.tsx`

Costs in a monorepo platform:

| Cost           | Detail                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| Build pipeline | `babel-plugin-jsx` / `vite-plugin-react` / `svelte-check` — extra config                               |
| Two languages  | Script logic + template/JSX checker split                                                              |
| Familiar traps | React-style “components re-run” mental model (wrong for Solid; irrelevant for Echo signals + HyperDOM) |
| Indirection    | Harder to see which DOM nodes subscribe to which signals without reading compiled output               |

Many teams love JSX. EchoJS simply **standardizes on HyperDOM** so `apps/docs`,
`apps/example`, and package docs share one style.

---

## What HyperDOM optimizes for

| Goal                  | HyperDOM approach                                                      |
| --------------------- | ---------------------------------------------------------------------- |
| Fine-grained updates  | `h()` creates real nodes; reactive `() => child` subscribes to signals |
| TypeScript-only views | `.view.ts` is fully checked by `tsc`                                   |
| No VDOM               | No `createElement` tree to reconcile                                   |
| Explicit reactivity   | You see `.value()` and `() =>` reactive children — good for reviews    |
| Platform consistency  | Same patterns in widgets, pages, and package playgrounds               |

Core APIs:

- `h(tag, props, children)` — element or component
- `createView(fn, name)` — view boundary + dev context
- `createModel(fn, name)` — state + effects
- `createComponent(model, view)` — glue at page/widget edge
- `Show`, `List` — control flow without template syntax

---

## Declarative vs imperative UI

These words describe **how you express UI**, not whether you use React, Vue, or
Echo.

### Imperative UI

You **mutate the DOM step by step**:

```ts
const el = document.createElement('button')
el.textContent = '0'
el.addEventListener('click', () => {
  el.textContent = String(Number(el.textContent) + 1)
})
document.body.appendChild(el)
```

**Pros:** full control, no framework.  
**Cons:** hard to reason about state vs DOM drift; scaling to large UIs is
painful.

### Declarative UI

You **describe what should be on screen for the current state**. When state
changes, the runtime updates the output — you do not manually patch each node.

**JSX (React-style)** — declarative intent:

```tsx
function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}
```

**HyperDOM** — also declarative: the button label is a function of `count`:

```ts
button({ onClick: vm.inc }, () => String(vm.count.value()))
```

You do not call `textContent = ...` on each click. The **binding** re-runs when
`count` changes.

### Comparison table

| Style                    | You write                 | Runtime does                           |
| ------------------------ | ------------------------- | -------------------------------------- |
| **Imperative**           | `el.textContent = x`      | Exactly what you said                  |
| **Declarative**          | “UI = f(state)”           | Updates DOM when state changes         |
| **JSX declarative**      | HTML-like tree            | Reconcile or compile bindings          |
| **HyperDOM declarative** | `h()` + reactive children | Signal subscriptions → targeted writes |

> [!TIP] HyperDOM feels **more verbose** than JSX but is still **declarative**
> as long as DOM updates flow from signals, not manual node surgery in views.

---

## Where HyperDOM sits

```text
Imperative DOM API          Declarative authoring
(document.createElement)    (JSX, templates, HyperDOM)

        │                              │
        │    HyperDOM + signals        │
        └──────────────► ● ◄───────────┘
                    fine-grained,
                    no VDOM diff,
                    explicit () => bindings
```

- **Not** “imperative React” — we do not re-run whole view functions each tick
  like classic React.
- **Not** a string template — we build typed trees in TS.
- **Similar goal to JSX** — UI is a function of state; **different syntax and
  runtime**.

---

## Side-by-side examples

### Conditional block

**JSX**

```tsx
{
  isOpen && <Panel title='Settings' />
}
```

**HyperDOM**

```ts
Show({ when: () => vm.isOpen.value(), children: () => PanelView(vm) })
```

### List

**JSX**

```tsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

**HyperDOM**

```ts
ul(null, () => vm.items.value().map((item) => li({ key: item.id }, item.name)))
```

### Page glue

```ts
export const Sponsors = createComponent(createSponsorsModel, SponsorsView, {
  name: "Sponsors",
});

// route
view: () => Sponsors(),
```

Model + view stay separate; `createComponent` replaces older `bindModelView`
helpers.

---

## Myths

| Myth                         | Reality                                                                   |
| ---------------------------- | ------------------------------------------------------------------------- |
| “No JSX = imperative”        | Views use reactive bindings — **declarative**                             |
| “HyperDOM is like jQuery”    | jQuery is imperative DOM; HyperDOM is signal-driven                       |
| “We need JSX for ergonomics” | `Show` / `List` / DSL helpers cover most patterns; verbosity buys clarity |
| “tsc cannot check views”     | `.view.ts` is standard TypeScript — no template checker split             |
| “Echo hates React”           | We document React comparisons; we chose a different **platform** shape    |

---

## When JSX still makes sense

Stay on JSX stacks when:

- You depend on **React Native**, **Next.js RSC**, or a massive **React
  component library**
- Your team mandate is `.tsx` everywhere
- You use **Svelte / Vue SFC** compilers for SSR marketing sites

Choose Echo + HyperDOM when:

- You build **signal-first SPAs** in this monorepo
- You want **feature-first** rules and **one provider pipeline**
- You prefer **no JSX compile step** and **explicit** reactive bindings in code
  review

---

## Related docs

- [Philosophy](/docs/introduction/philosophy) — model/view split
- [HyperDOM Guides](/docs/packages/hyperdom/guides/views-and-dsl) — `h`, `Show`,
  `List`
- [Models](/docs/architecture/models) — `createModel` + `createComponent`
- [EchoJS vs React](/docs/comparisons/react) — JSX ecosystem comparison
- [EchoJS vs Solid](/docs/comparisons/solid) — closest signal + JSX cousin
