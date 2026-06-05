import { describe, expect, it } from 'vitest'

import { signal } from '@echojs-ecosystem/reactivity'

import { createRouterUrlStateAdapter } from './router-adapter'

describe('router adapter', () => {
  it('returns undefined for falsy router', () => {
    expect(createRouterUrlStateAdapter(null as never)).toBeUndefined()
  })

  it('reads search from router.$fullPath', () => {
    const $fullPath = signal('/products?page=2')
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
      replace(path: string) {
        $fullPath.set(path)
      },
    }
    const adapter = createRouterUrlStateAdapter(router)
    expect(adapter.getSearch()).toBe('?page=2')
  })

  it('setSearch updates only search and keeps pathname', () => {
    const $fullPath = signal('/products?page=1')
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
      replace(path: string) {
        $fullPath.set(path)
      },
    }
    const adapter = createRouterUrlStateAdapter(router)
    adapter.setSearch('?page=2')
    expect($fullPath.value()).toBe('/products?page=2')
  })

  it('subscribe reacts to router changes', () => {
    const $fullPath = signal('/?a=1')
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
      replace(path: string) {
        $fullPath.set(path)
      },
    }
    const adapter = createRouterUrlStateAdapter(router)
    let called = 0
    const unsub = adapter.subscribe(() => {
      called += 1
    })
    router.go('/?a=2')
    expect(called).toBe(1)
    unsub()
  })

  it('preserves hash when updating search', () => {
    const $fullPath = signal('/products?page=1#details')
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
    }
    const adapter = createRouterUrlStateAdapter(router)!

    expect(adapter.getSearch()).toBe('?page=1')

    adapter.setSearch('?page=2', { history: 'push' })
    expect($fullPath.value()).toBe('/products?page=2#details')
  })

  it('uses go() when replace is unavailable', () => {
    const $fullPath = signal('/?a=1')
    const calls: Array<{ path: string; replace?: boolean }> = []
    const router = {
      $fullPath,
      go(path: string, options?: { replace?: boolean }) {
        calls.push({ path, replace: options?.replace })
        $fullPath.set(path)
      },
    }
    const adapter = createRouterUrlStateAdapter(router)!

    adapter.setSearch('?a=2', { history: 'replace' })
    expect(calls).toEqual([{ path: '/?a=2', replace: true }])
  })

  it('reads empty search for pathname-only routes', () => {
    const $fullPath = signal('/products')
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
    }
    const adapter = createRouterUrlStateAdapter(router)!

    expect(adapter.getSearch()).toBe('')
  })
})
