import { describe, expect, it } from 'vitest'

import { getDefaultQueryClient, registerDefaultQueryClientFactory, resetDefaultQueryClient } from './default-client'
import { createQueryClient } from './query-client'

describe('default QueryClient', () => {
  it('throws when no client registered', () => {
    resetDefaultQueryClient()
    expect(() => getDefaultQueryClient()).toThrow(/no default QueryClient/)
  })

  it('returns client after createQueryClient', () => {
    resetDefaultQueryClient()
    const client = createQueryClient()
    expect(getDefaultQueryClient()).toBe(client)
  })

  it('lazy-inits via registerDefaultQueryClientFactory', () => {
    resetDefaultQueryClient()
    const client = createQueryClient()
    resetDefaultQueryClient()
    registerDefaultQueryClientFactory(() => client)
    expect(getDefaultQueryClient()).toBe(client)
    expect(getDefaultQueryClient()).toBe(client)
  })
})
