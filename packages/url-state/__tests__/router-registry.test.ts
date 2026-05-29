import { describe, expect, it } from 'vitest'

import { signal } from '@echojs/reactivity'
import {
  attachRouterQueryParams,
  createQueryParams,
  parseAsString,
} from '@echojs/url-state'

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
