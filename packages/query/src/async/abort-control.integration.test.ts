import { describe, expect, it } from 'vitest'

import { CancelledError } from '../core/cancelled-error'
import { createInfiniteQuery } from '../query/create-infinite-query'
import { createMutation } from '../mutation/create-mutation'
import { createQuery } from '../query/create-query'
import { createTestClient, flush } from '../test-utils'

describe('abort control integration', () => {
  it('query uses manual AbortController from refetch options', async () => {
    const client = createTestClient()
    let captured: AbortController | undefined

    const def = createQuery<string, void>({
      queryKey: () => ['manual-abort-query'],
      queryFn: async ({ abortController, signal }) => {
        captured = abortController
        await new Promise<void>((resolve, reject) => {
          signal.addEventListener('abort', () => reject(new CancelledError({ silent: true })), {
            once: true,
          })
        })
        return 'x'
      },
    })

    const instance = def.with(undefined as void, { client, refetchOnMount: false, enabled: false })
    const manual = new AbortController()
    void instance.refetch({ abortController: manual }).catch(() => {})
    await flush()
    expect(captured).toBe(manual)
    manual.abort('user-stop')
    await flush()
    expect(manual.signal.aborted).toBe(true)
    expect(manual.signal.reason).toBe('user-stop')
  })

  it('query instance abort() aborts in-flight fetch', async () => {
    const client = createTestClient()
    let captured: AbortSignal | undefined

    const def = createQuery<string, void>({
      queryKey: () => ['instance-abort-query'],
      queryFn: async ({ signal }) => {
        captured = signal
        await new Promise(() => {})
        return 'x'
      },
    })

    const instance = def.with(undefined as void, { client, refetchOnMount: false, enabled: false })
    void instance.refetch().catch(() => {})
    await flush()
    instance.abort('via-instance')
    expect(captured?.aborted).toBe(true)
    expect(captured?.reason).toBe('via-instance')
  })

  it('infinite query respects external signal on fetchNextPage', async () => {
    const client = createTestClient()
    const external = new AbortController()
    let captured: AbortSignal | undefined

    const def = createInfiniteQuery<{ items: string[]; next: string | null }, void, string | null>({
      queryKey: () => ['manual-abort-infinite'],
      initialPageParam: null,
      queryFn: async ({ signal }) => {
        captured = signal
        await new Promise(() => {})
        return { items: ['a'], next: null }
      },
      getNextPageParam: (page) => page.next,
    })

    const instance = def.with(undefined as void, { client, refetchOnMount: false, enabled: false })
    void instance.fetchNextPage({ signal: external.signal }).catch(() => {})
    await flush()
    external.abort('ext')
    expect(captured?.aborted).toBe(true)
  })

  it('mutation.run accepts manual AbortController', async () => {
    const client = createTestClient()
    let captured: AbortController | undefined

    const def = createMutation<string, void>({
      mutationFn: async ({ abortController, signal }) => {
        captured = abortController
        await new Promise(() => {})
        return 'ok'
      },
    })

    const instance = def.create({ client })
    const manual = new AbortController()
    void instance.run(undefined as void, { abortController: manual }).catch(() => {})
    await flush()
    expect(captured).toBe(manual)
    manual.abort('mutation-stop')
    expect(manual.signal.aborted).toBe(true)
  })

  it('mutation instance exposes abortController while pending', async () => {
    const client = createTestClient()
    const def = createMutation<string, void>({
      mutationFn: async () => {
        await new Promise(() => {})
        return 'ok'
      },
    })

    const instance = def.create({ client })
    void instance.run(undefined as void).catch(() => {})
    await flush()
    expect(instance.abortController()).toBeInstanceOf(AbortController)
    expect(instance.abortSignal()).toBeInstanceOf(AbortSignal)
    instance.cancel()
    expect(instance.abortController()?.signal.aborted).toBe(true)
  })
})
