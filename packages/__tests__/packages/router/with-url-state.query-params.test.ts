// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { createRouteView, createRouter } from '@echojs-ecosystem/router'
import { parseAsInteger, parseAsString } from '@echojs-ecosystem/url-state'

import { flush } from '../../shared/test-utils/flush'

describe('router × url-state: createQueryParams on router', () => {
  it('reads search from location and writes back on set', async () => {
    const products = createRouteView({
      name: 'products',
      view: () => 'products',
    })

    const router = createRouter({
      history: 'memory',
      routes: [{ path: '/products', name: 'products', routeView: products }],
    })

    router.start()
    router.go('/products?q=bike&page=2')

    const filters = router.createQueryParams({
      q: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    })

    expect(filters.value()).toEqual({ q: 'bike', page: 2 })

    filters.set({ q: 'lamp', page: 1 })
    await flush()

    expect(router.$fullPath.value()).toBe('/products?q=lamp')
    expect(filters.value()).toEqual({ q: 'lamp', page: 1 })
  })
})
