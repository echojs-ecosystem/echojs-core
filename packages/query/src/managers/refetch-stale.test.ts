import { describe, expect, it, vi } from 'vitest'

import { createTestClient } from '../test-utils'
import { createQuery } from '../query/create-query'
import { refetchStaleActiveQueries } from './refetch-stale'

describe('refetchStaleActiveQueries', () => {
  it('calls queryCache.onFocus for all registered clients', async () => {
    const client = createTestClient()
    const def = createQuery({ queryKey: () => ['refetch-stale'], queryFn: async () => 1 })
    def.with({}, { client, refetchOnMount: false })
    await client.fetchQuery(def, {})
    const spy = vi.spyOn(client.queryCache, 'onFocus')
    refetchStaleActiveQueries(client, 'focus')
    expect(spy).toHaveBeenCalled()
  })

  it('calls queryCache.onOnline for reconnect', () => {
    const client = createTestClient()
    const spy = vi.spyOn(client.queryCache, 'onOnline')
    refetchStaleActiveQueries(client, 'reconnect')
    expect(spy).toHaveBeenCalled()
  })
})
