import type { CodeTab } from '@entities/home/types/home.types'

export const bootstrapExample = `import { createEchoApp } from "@echojs-ecosystem/framework/app"
import { queryProvider } from "./providers/query"
import { uiProvider } from "./providers/ui"
import { i18nProvider } from "./providers/i18n"
import { routerProvider } from "./providers/router"

createEchoApp({ strictContextChecks: true })
  .use(queryProvider)
  .use(uiProvider)
  .use(i18nProvider)
  .use(routerProvider)
  .mount("#app")`

export const queryExample = `import { createQuery } from "@echojs-ecosystem/framework/async"

export const usersQuery = createQuery({
  name: "users",
  queryKey: () => ["users"] as const,
  queryFn: ({ signal }) => api.users.list({ signal }),
})

// In a page model — reactive cache, no hooks
const users = usersQuery.with()`

export const modelViewExample = `import { signal } from "@echojs-ecosystem/framework/reactivity"
import { createModel, createView, button } from "@echojs-ecosystem/framework/hyperdom"

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0)
  return {
    count: () => $count.value(),
    increment: () => $count.update((n) => n + 1),
  }
}, "CounterModel")

export const CounterView = createView((vm: CounterVM): Child =>
  button({ onClick: vm.increment }, () => String(vm.count())),
  "CounterView",
)`

export const uiExample = `import { Button } from "@echojs-ecosystem/framework/ui"

Button({
  variant: "primary",
  size: "md",
  leftIcon: "✓",
  onClick: () => form.submit(),
  children: "Save changes",
})`

export const codeTabs: readonly CodeTab[] = [
  {
    id: 'bootstrap',
    label: 'bootstrap.ts',
    layer: 'App shell',
    icon: '◎',
    code: bootstrapExample,
    lang: 'typescript',
    title: 'Compose once at the root',
    body: 'Providers register router, query, UI, and i18n. One mount target, strict context checks, predictable startup order.',
    points: [
      'Fluent `.use()` pipeline',
      'Async provider setup',
      'Single `#app` mount',
    ],
  },
  {
    id: 'async',
    label: 'users.query.ts',
    layer: 'Server state',
    icon: '↻',
    code: queryExample,
    lang: 'typescript',
    title: 'Data as definitions',
    body: 'Queries live in feature API modules. Models call `.with()` — views read `data()` and `isPending()`, never raw `fetch`.',
    points: [
      'Stable `queryKey` tuples',
      'Abort-aware `queryFn`',
      'Invalidate after mutations',
    ],
  },
  {
    id: 'model',
    label: 'counter.model.ts',
    layer: 'Model + View',
    icon: '⚡',
    code: modelViewExample,
    lang: 'typescript',
    title: 'Behavior in the model',
    body: 'Signals and actions stay in `createModel`. Views stay declarative HyperDOM — the split scales better than mixing hooks in markup.',
    points: [
      'Named models for DevTools',
      'Narrow VM surface',
      'Testable actions',
    ],
  },
  {
    id: 'ui',
    label: 'save-button.ts',
    layer: 'UI kit',
    icon: '◈',
    code: uiExample,
    lang: 'typescript',
    title: 'Primitives with variants',
    body: 'Accessible components on HyperDOM — `tailwind-variants` for design tokens, no shadow DOM wrapper tax.',
    points: [
      'Variant + size API',
      'Icons & loading slots',
      'Headless mode when needed',
    ],
  },
] as const
