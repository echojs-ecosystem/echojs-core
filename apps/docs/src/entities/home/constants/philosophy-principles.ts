import type { ContentId } from '@core/content/types.js'

export type PhilosophyPrinciple = {
  id: string
  number: string
  title: string
  summary: string
  example: string
  docId: ContentId
}

/** Landing-page digest of /docs/introduction/philosophy — concrete ideas, not slogans. */
export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    id: 'signals',
    number: '01',
    title: 'Signals are the source of truth',
    summary:
      'UI is a function of state. `signal`, `computed`, and `effect` form an explicit graph — HyperDOM writes only what changed, without reconciling a virtual tree.',
    example: 'count() → button label updates; nothing else re-renders.',
    docId: 'packages/reactivity',
  },
  {
    id: 'model-view',
    number: '02',
    title: 'Model and View stay separate',
    summary:
      'Models own behavior and state; views map a VM to HyperDOM. No `fetch` in views, no DOM nodes in models — routes glue layers at the page boundary.',
    example: 'createModel + createView + createComponent on the page.',
    docId: 'architecture/models',
  },
  {
    id: 'features',
    number: '03',
    title: 'Features are vertical slices',
    summary:
      'One user capability per folder: model, ui, optional api. Pages compose features; shared code never imports from pages — boundaries scale with teams.',
    example: 'features/search/, pages/docs/, entities/session/',
    docId: 'architecture/feature-first',
  },
  {
    id: 'providers',
    number: '04',
    title: 'Providers compose at the root',
    summary:
      'Router, query, UI, and i18n register once in `createEchoApp().use(...)`. Features resolve services from context — not scattered singletons.',
    example: 'strictContextChecks: true catches missing providers early.',
    docId: 'architecture/providers',
  },
  {
    id: 'routes',
    number: '05',
    title: 'Routes are data, not components',
    summary:
      'Typed route objects expose `$params`, `$query`, and `go()`. Layouts nest with `outlet()`; loaders live on `beforeLoad`, not inside random effects.',
    example:
      'NavLink({ to: userPage, params: { id } }) — no string paths in UI.',
    docId: 'packages/router',
  },
  {
    id: 'state-layers',
    number: '06',
    title: 'Pick the right state layer',
    summary:
      'Router for URL, Query for server cache, Form for input, Store for shared client state, signals for local UI — never one mega-store for everything.',
    example:
      'Session in store; product list in createQuery; filters in url-state.',
    docId: 'state/overview',
  },
]
