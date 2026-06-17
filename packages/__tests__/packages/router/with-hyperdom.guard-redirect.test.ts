// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { createRouteView, createRouter, createRoutes } from '@echojs-ecosystem/router'
import { h, render } from '@echojs-ecosystem/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

import { flush } from '../../shared/test-utils/flush'

describe('router × hyperdom: guard redirect', () => {
  it('renders login until auth signal allows dashboard', async () => {
    const $auth = signal(false)

    const login = createRouteView({
      name: 'login',
      view: () => h('div', { 'data-testid': 'login' }, 'Login'),
    })

    const dashboard = createRouteView({
      name: 'dashboard',
      view: () => h('div', { 'data-testid': 'dashboard' }, 'Dashboard'),
    })

    const router = createRouter({
      history: 'memory',
      routes: createRoutes([
        { path: '/login', name: 'login', routeView: login },
        { path: '/dashboard', name: 'dashboard', routeView: dashboard },
      ]),
      guards: [
        {
          route: dashboard,
          canOpen: () => $auth.value(),
          otherwise: login,
        },
      ],
    })

    router.start()
    router.go('/dashboard')

    const container = document.createElement('div')
    const dispose = render(router.view(), container)
    await flush()

    expect(container.querySelector('[data-testid="login"]')).not.toBeNull()
    expect(container.querySelector('[data-testid="dashboard"]')).toBeNull()

    $auth.set(true)
    router.go('/dashboard')
    await flush()

    expect(container.querySelector('[data-testid="dashboard"]')).not.toBeNull()
    expect(container.querySelector('[data-testid="login"]')).toBeNull()

    dispose()
  })
})
