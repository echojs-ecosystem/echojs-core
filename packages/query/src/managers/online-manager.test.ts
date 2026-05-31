import { describe, expect, it } from 'vitest'

import { createQuery } from '../query/create-query'
import { createTestClient, flush } from '../test-utils'
import { onlineManager } from './online-manager'

describe('OnlineManager', () => {
  it('refetches stale active queries on reconnect', async () => {
    const client = createTestClient()
    let calls = 0

    const q = createQuery({
      queryKey: () => ['online'],
      staleTime: 0,
      queryFn: async () => {
        calls += 1
        return calls
      },
    }).with({}, { client, refetchOnReconnect: true, refetchOnMount: false })

    await q.refetch()
    onlineManager.setOnline(false)
    onlineManager.setOnline(true)
    await flush()
    expect(calls).toBeGreaterThan(1)
  })
})
