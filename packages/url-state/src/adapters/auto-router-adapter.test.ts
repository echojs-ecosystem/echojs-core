import { describe, expect, it, vi, beforeEach } from 'vitest'

import { signal } from '@echojs-ecosystem/reactivity'

import { createAutoRouterUrlStateAdapter } from './auto-router-adapter'

describe('createAutoRouterUrlStateAdapter()', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('delegates to router adapter when router is registered', async () => {
    const { createAutoRouterUrlStateAdapter: createAdapter } = await import('./auto-router-adapter')
    const { registerUrlStateRouter: registerRouter } = await import('./router-registry')

    const $fullPath = signal('/items?q=1')
    registerRouter({
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
    })

    const adapter = createAdapter()
    expect(adapter.getSearch()).toBe('?q=1')

    adapter.setSearch('?q=2')
    expect($fullPath.value()).toBe('/items?q=2')
  })

  it('subscribe supports cleanup before and after router registration', async () => {
    const { createAutoRouterUrlStateAdapter: createAdapter } = await import('./auto-router-adapter')
    const { registerUrlStateRouter: registerRouter } = await import('./router-registry')

    const adapter = createAdapter()
    const listener = vi.fn()
    const unsubscribe = adapter.subscribe(listener)

    unsubscribe()

    const $fullPath = signal('/')
    registerRouter({
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
    })

    expect(listener).not.toHaveBeenCalled()
  })
})
