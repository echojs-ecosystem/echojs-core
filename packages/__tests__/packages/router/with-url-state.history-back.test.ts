// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { createRouteView, createRouter, createRoutes } from '@echojs-ecosystem/router'
import { h, render } from '@echojs-ecosystem/hyperdom'
import { parseAsString } from '@echojs-ecosystem/url-state'

import { flush } from '../../shared/test-utils/flush'

describe('router × url-state: history back sync', () => {
  it('restores query params after router.back()', async () => {
    const products = createRouteView({
      name: 'products',
      view: () => h('div', { 'data-testid': 'products' }, 'products'),
    })

    const router = createRouter({
      history: 'memory',
      routes: createRoutes([{ path: '/products', name: 'products', routeView: products }]),
    })

    router.start()

    const filters = router.createQueryParams({
      q: parseAsString.withDefault(''),
    })

    router.go('/products?q=phone')
    expect(filters.value().q).toBe('phone')

    router.go('/products?q=lamp')
    expect(filters.value().q).toBe('lamp')

    router.back()
    await flush()

    expect(router.$fullPath.value()).toBe('/products?q=phone')
    expect(filters.value().q).toBe('phone')
  })
})
