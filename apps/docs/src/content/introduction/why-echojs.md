---
title: Why EchoJS
description: What problems EchoJS solves and when it is a good fit for your team.
keywords: [signals, performance, architecture, framework]
---

# Why EchoJS

Teams usually arrive at EchoJS with one of three goals: **less render overhead**, **clearer structure as the app grows**, or **one coherent toolkit** instead of stitching React Router, React Query, Zustand, and ad-hoc patterns.

## Problems EchoJS targets

### 1. Work that scales with the whole tree

Classic virtual-DOM frameworks reconcile component trees. Even with memoization, large layouts and dashboards pay for scope you did not intend to update.

EchoJS uses **fine-grained signals** (`@echojs/reactivity`). When a value changes, only subscribers run — not every descendant in a component hierarchy.

### 2. Architecture drift

Without conventions, “features” become folders of components, shared state leaks upward, and routing knows too much about UI.

EchoJS documents a **feature-first layout** with an explicit **dependency flow** (pages → widgets → features → entities → shared). The docs site and `apps/example` follow the same rules.

### 3. Fragmented ecosystem choices

Routing, async data, URL state, persistence, and UI primitives are separate purchases in many stacks. EchoJS ships **first-party packages** wired through a single `createEchoApp()` provider pipeline.

## When EchoJS is a strong fit

- Greenfield SPAs or internal tools where you control the stack
- Dashboards, admin panels, and docs-style apps with long-lived shells (sidebar, header)
- Teams that want **Model + View** separation without a virtual DOM
- Monorepos that already use Bun and TypeScript (see Installation)

## When to stay cautious

- You need React Native or a mature React-only hiring pool today
- You depend on a React-only component library with no HyperDOM equivalent
- SEO-critical marketing sites that require SSR — EchoJS docs today are **client-rendered SPA**; plan SSR separately if you need it

> [!NOTE]
> The [EchoJS vs React](/docs/comparisons/react) guide maps ecosystem pieces side by side. For HyperDOM instead of JSX and declarative vs imperative UI, see [Why not JSX](/docs/introduction/why-not-jsx).

## What you get on day one

| Capability | Package |
| --- | --- |
| Signals, computed, effects | `@echojs/reactivity` |
| DOM views (no VDOM) | `@echojs/hyperdom` |
| App bootstrap & providers | `@echojs/framework` |
| Typed routes & `NavLink` | `@echojs/router` |
| Async data & cache | `@echojs/query` |
| Client store | `@echojs/store` |
| URL ↔ state | `@echojs/url-state` |
| Persistence | `@echojs/persist` |
| UI primitives | `@echojs/ui` |
