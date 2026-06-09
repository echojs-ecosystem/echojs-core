/** Single source of truth for @echojs-ecosystem/router docs navigation & generators. */

export type RouterDocCategory = {
  id: string
  title: string
  entries: RouterDocEntry[]
}

export type RouterDocEntry = {
  slug: string
  name: string
  description: string
}

export const routerDocCategories: RouterDocCategory[] = [
  {
    id: 'routes',
    title: 'Routes',
    entries: [
      { slug: 'create-route', name: 'createRoute', description: 'Named route without UI.' },
      { slug: 'create-routes', name: 'createRoutes', description: 'Typed route tree for the router.' },
      { slug: 'create-route-view', name: 'createRouteView', description: 'Leaf page with view and beforeLoad.' },
      { slug: 'create-layout-view', name: 'createLayoutView', description: 'Layout page with outlet.' },
      { slug: 'create-lazy-route-view', name: 'createLazyRouteView', description: 'Code-split route page.' },
    ],
  },
  {
    id: 'router',
    title: 'Router',
    entries: [
      { slug: 'create-router', name: 'createRouter', description: 'Router factory with HyperDOM View.' },
      { slug: 'create-router-provider', name: 'createRouterProvider', description: 'Echo app provider wiring.' },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    entries: [
      { slug: 'link', name: 'Link', description: 'Declarative navigation link.' },
      { slug: 'nav-link', name: 'NavLink', description: 'Link with active route styling.' },
    ],
  },
  {
    id: 'operators',
    title: 'Operators',
    entries: [
      { slug: 'redirect', name: 'redirect', description: 'Redirect between routes.' },
      { slug: 'guard-route', name: 'guardRoute', description: 'Route open guard.' },
      { slug: 'chain-route', name: 'chainRoute', description: 'beforeOpen hook chain.' },
    ],
  },
  {
    id: 'utilities',
    title: 'Utilities',
    entries: [
      { slug: 'path', name: 'Path', description: 'matchPath, buildPath, location helpers.' },
      { slug: 'query', name: 'Query', description: 'parseQuery and stringifyQuery.' },
      { slug: 'history', name: 'History', description: 'Browser, hash, and memory history.' },
    ],
  },
]

export const routerDocEntries = routerDocCategories.flatMap((c) => c.entries)

export const routerDocEntryBySlug = (slug: string): RouterDocEntry | undefined =>
  routerDocEntries.find((e) => e.slug === slug)
