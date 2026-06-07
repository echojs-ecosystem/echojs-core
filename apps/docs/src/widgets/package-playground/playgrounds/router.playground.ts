import {
  button,
  div,
  p,
  type Child,
} from '@echojs-ecosystem/framework/hyperdom'
import { effect, signal } from '@echojs-ecosystem/framework/reactivity'
import {
  createRouteView,
  createRoutes,
} from '@echojs-ecosystem/framework/router'
import { createRouter } from '@echojs-ecosystem/framework/router'

import type { PackagePlaygroundDef, PlaygroundInstance } from '../types.js'
import { pg } from '../playground-ui.js'

const homePage = createRouteView({
  name: 'pg-home',
  view: () => p(null, 'Home page'),
})

const aboutPage = createRouteView({
  name: 'pg-about',
  view: () => p(null, 'About page'),
})

const routes = createRoutes([
  { path: '/', name: 'pg-home', routeView: homePage },
  { path: '/about', name: 'pg-about', routeView: aboutPage },
])

const create = (): PlaygroundInstance => {
  const router = createRouter({
    history: { type: 'memory', initial: '/' },
    routes,
  })

  router.start()

  const $snapshot = signal<Record<string, unknown>>({})

  effect(() => {
    $snapshot.set({
      path: router.$path.value(),
      fullPath: router.$fullPath.value(),
      activePage:
        (router.$activePage.value() as { name?: string } | null)?.name ?? null,
      pending: router.$pending.value(),
    })
  })

  return {
    $snapshot,
    dispose: () => router.stop(),
    view: () =>
      div(null, [
        p(
          { class: pg.hint() },
          'Memory history — outlet below, router signals in state.'
        ),
        div(
          {
            class:
              'mb-3 min-h-[4rem] rounded-lg border border-dashed border-border/80 p-4 dark:border-white/15',
          },
          () => router.View() as Child
        ),
        div({ class: pg.actions() }, [
          button(
            { class: pg.btnPrimary(), onClick: () => router.go('/') },
            'Go home'
          ),
          button(
            { class: pg.btn(), onClick: () => router.go('/about') },
            'Go about'
          ),
          button({ class: pg.btn(), onClick: () => router.back() }, 'Back'),
        ]),
      ]),
  }
}

export const routerPlayground: PackagePlaygroundDef = {
  id: 'router',
  title: 'Memory router',
  hint: 'SPA navigation without leaving the docs page.',
  available: true,
  create,
}
