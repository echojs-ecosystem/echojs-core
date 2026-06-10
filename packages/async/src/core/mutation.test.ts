import { describe, expect, it, vi } from 'vitest'

import { createTestClient, flush } from '../test-utils'
import { Mutation } from './mutation'
import { MutationCache } from './mutation-cache'
import { resetMutationIdCounter } from './mutation'

describe('Mutation', () => {
  it('assigns incremental ids', () => {
    resetMutationIdCounter()
    const client = createTestClient()
    const cache = new MutationCache()
    const def = {
      kind: 'mutation-definition' as const,
      options: { mutationFn: async () => 'a' },
      create: () => {
        throw new Error('unused')
      },
    }
    const m1 = new Mutation(def, client, cache)
    const m2 = new Mutation(def, client, cache)
    expect(m1.id).toBe(1)
    expect(m2.id).toBe(2)
  })

  it('cancel aborts mutation signal', async () => {
    const client = createTestClient()
    const cache = new MutationCache()
    let captured: AbortSignal | undefined
    const def = {
      kind: 'mutation-definition' as const,
      options: {
        mutationFn: async (ctx: { signal: AbortSignal }) => {
          captured = ctx.signal
          await new Promise(() => {})
          return 'ok'
        },
      },
      create: () => {
        throw new Error('unused')
      },
    }
    const mutation = new Mutation(def, client, cache)
    void mutation.run(undefined as void)
    await flush()
    mutation.cancel()
    expect(captured?.aborted).toBe(true)
  })

  it('toInstance exposes signals and helpers', async () => {
    const client = createTestClient()
    const cache = client.mutationCache
    const def = {
      kind: 'mutation-definition' as const,
      options: { mutationFn: async () => 'done' },
      create: () => {
        throw new Error('unused')
      },
    }
    const instance = new Mutation(def, client, cache).toInstance()
    await instance.run(undefined as void)
    expect(instance.data()).toBe('done')
    expect(instance.isSuccess()).toBe(true)
    instance.reset()
    expect(instance.isIdle()).toBe(true)
  })

  it('emits cache events on run', async () => {
    const client = createTestClient()
    const listener = vi.fn()
    client.mutationCache.subscribe(listener)
    const def = {
      kind: 'mutation-definition' as const,
      options: { mutationFn: async () => 1 },
      create: () => {
        throw new Error('unused')
      },
    }
    await new Mutation(def, client, client.mutationCache).run(undefined as void)
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ type: 'mutationAdded' }))
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ type: 'mutationUpdated' }))
  })
})
