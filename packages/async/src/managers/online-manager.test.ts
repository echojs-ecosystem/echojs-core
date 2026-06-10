import { describe, expect, it, vi } from 'vitest'

import { createQuery } from '../query/create-query'
import { createTestClient, flush } from '../test-utils'
import { OnlineManager, onlineManager } from './online-manager'

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

  it('isOnline reflects current state', () => {
    expect(onlineManager.isOnline()).toBe(true)
    onlineManager.setOnline(false)
    expect(onlineManager.isOnline()).toBe(false)
    onlineManager.setOnline(true)
  })

  it('subscribe notifies on reconnect', () => {
    const listener = vi.fn()
    const unsub = onlineManager.subscribe(listener)
    onlineManager.setOnline(false)
    onlineManager.setOnline(true)
    expect(listener).toHaveBeenCalled()
    unsub()
  })

  it('onClientRegistered refetches when online', async () => {
    const client = createTestClient()
    let calls = 0

    const q = createQuery({
      queryKey: () => ['online-register'],
      staleTime: 0,
      queryFn: async () => {
        calls += 1
        return calls
      },
    }).with({}, { client, refetchOnReconnect: true, refetchOnMount: false })

    await q.refetch()
    const manager = new OnlineManager()
    manager.onClientRegistered(client)
    await flush()
    expect(calls).toBeGreaterThan(1)
  })
})
