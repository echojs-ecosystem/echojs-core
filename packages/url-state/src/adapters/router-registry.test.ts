import { describe, expect, it, vi, beforeEach } from 'vitest'

import { signal } from '@echojs/reactivity'

import { attachRouterQueryParams } from './bind-router-query-params'
import { createQueryParams } from '../core/create-query-params'
import { parseAsString } from '../parsers/string'

const flushMicrotasks = async (): Promise<void> => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('router registry + createQueryParams', () => {
  it('createQueryParams без adapter ждёт createRouter и синхронизируется с router search', async () => {
    const $fullPath = signal('/products?q=phone')
    const router = attachRouterQueryParams({
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
      replace(path: string) {
        $fullPath.set(path)
      },
    })

    const filters = createQueryParams({
      q: parseAsString.withDefault(''),
    })

    expect(filters.value().q).toBe('phone')

    filters.set({ q: 'lamp' })
    await flushMicrotasks()
    expect($fullPath.value()).toBe('/products?q=lamp')

    expect(router.createQueryParams).toBeTypeOf('function')
  })
})

describe('onUrlStateRouterReady()', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('calls listener immediately when router is already registered', async () => {
    const { registerUrlStateRouter, onUrlStateRouterReady, getUrlStateRouter } =
      await import('./router-registry')
    const { signal } = await import('@echojs/reactivity')

    const $fullPath = signal('/')
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
    }

    registerUrlStateRouter(router)

    const listener = vi.fn()
    const unsubscribe = onUrlStateRouterReady(listener)

    expect(listener).toHaveBeenCalledTimes(1)
    expect(getUrlStateRouter()).toBe(router)

    unsubscribe()
  })

  it('queues listener until router registers and supports unsubscribe', async () => {
    const { registerUrlStateRouter, onUrlStateRouterReady } = await import('./router-registry')
    const { signal } = await import('@echojs/reactivity')

    const listener = vi.fn()
    const unsubscribe = onUrlStateRouterReady(listener)

    expect(listener).not.toHaveBeenCalled()

    unsubscribe()

    const $fullPath = signal('/')
    registerUrlStateRouter({
      $fullPath,
      go(path: string) {
        $fullPath.set(path)
      },
    })

    expect(listener).not.toHaveBeenCalled()
  })
})
