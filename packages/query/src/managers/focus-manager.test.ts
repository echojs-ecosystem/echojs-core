import { describe, expect, it, vi } from 'vitest'

import { createQuery } from '../query/create-query'
import { createTestClient, flush } from '../test-utils'
import { focusManager } from './focus-manager'

describe('FocusManager', () => {
  it('refetches stale active queries on focus', async () => {
    const client = createTestClient()
    let calls = 0

    const q = createQuery({
      queryKey: () => ['focus'],
      staleTime: 0,
      queryFn: async () => {
        calls += 1
        return calls
      },
    }).with({}, { client, refetchOnWindowFocus: true, refetchOnMount: false })

    await q.refetch()
    focusManager.setFocused(false)
    focusManager.setFocused(true)
    await flush()
    expect(calls).toBeGreaterThan(1)
  })

  it('subscribe notifies on focus change', () => {
    const listener = vi.fn()
    const unsub = focusManager.subscribe(listener)
    focusManager.setFocused(false)
    expect(listener).toHaveBeenCalled()
    unsub()
  })
})
