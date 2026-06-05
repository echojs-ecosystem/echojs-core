import { describe, expect, it, vi } from 'vitest'

import { CancelledError } from '../core/cancelled-error'
import { createTestClient, deferred, flush } from '../test-utils'
import { createQuery } from './create-query'

describe('QueryInstance', () => {
  it('tracks first pending and refetching', async () => {
    const client = createTestClient()
    let resolveFetch!: (value: string) => void

    const getUserQuery = createQuery({
      queryKey: () => ['status'],
      queryFn: () =>
        new Promise<string>((resolve) => {
          resolveFetch = resolve
        }),
    })

    const user = getUserQuery.with({}, { client, refetchOnMount: false })
    const pending = user.refetch()
    expect(user.isFirstPending()).toBe(true)
    expect(user.isFetching()).toBe(true)

    resolveFetch('ok')
    await pending
    expect(user.hasData()).toBe(true)
    expect(user.isRefetching()).toBe(false)
  })

  it('enabled false does not fetch automatically', async () => {
    const client = createTestClient()
    const fetcher = vi.fn(async () => 'x')

    const q = createQuery({ queryKey: () => ['disabled'], queryFn: fetcher }).with({}, {
      client,
      enabled: false,
    })

    await flush()
    expect(fetcher).not.toHaveBeenCalled()
    expect(q.isIdle()).toBe(true)
  })

  it('subscribe notifies on data change', async () => {
    const client = createTestClient()
    const q = createQuery({
      queryKey: () => ['sub'],
      queryFn: async () => 42,
    }).with({}, { client, refetchOnMount: false })

    const listener = vi.fn()
    q.subscribe(listener)
    await q.refetch()
    expect(listener).toHaveBeenCalled()
  })

  it('refetches when reactive params change', async () => {
    const client = createTestClient()
    const { signal } = await import('@echojs-ecosystem/reactivity')
    const $id = signal('1')
    const fetcher = vi.fn(async ({ params }: { params: { id: string } }) => params.id)

    const getUserQuery = createQuery({
      queryKey: ({ id }: { id: string }) => ['user', id],
      queryFn: fetcher,
    })

    const user = getUserQuery.with(() => ({ id: $id.value() }), { client })
    await flush()
    await user.refetch()
    expect(fetcher).toHaveBeenCalled()

    $id.set('2')
    await flush()
    await user.refetch()
    expect(user.data()).toBe('2')
  })

  it('keepPreviousData keeps old data while key changes', async () => {
    const client = createTestClient()
    const { signal } = await import('@echojs-ecosystem/reactivity')
    const $id = signal('1')

    const getUserQuery = createQuery({
      queryKey: ({ id }: { id: string }) => ['keep', id],
      keepPreviousData: true,
      queryFn: async ({ params }) => `user-${params.id}`,
    })

    const user = getUserQuery.with(() => ({ id: $id.value() }), { client })
    await user.refetch()
    expect(user.data()).toBe('user-1')

    $id.set('2')
    await flush()
    expect(user.data()).toBe('user-1')
  })

  it('cancel aborts in-flight fetch', async () => {
    const client = createTestClient()
    let aborted = false

    const q = createQuery({
      queryKey: () => ['cancel'],
      queryFn: async ({ signal }) => {
        await new Promise<void>((resolve, reject) => {
          signal.addEventListener('abort', () => {
            aborted = true
            reject(new CancelledError())
          })
          setTimeout(resolve, 50)
        })
        if (signal.aborted) throw new CancelledError()
        return 'ok'
      },
    }).with({}, { client, refetchOnMount: false })

    const promise = q.refetch()
    q.cancel()
    await expect(promise).rejects.toBeTruthy()
    expect(aborted).toBe(true)
    expect(q.isFetching()).toBe(false)
  })

  it('abortPrevious aborts old request on params change', async () => {
    const client = createTestClient()
    const { signal: $id } = await import('@echojs-ecosystem/reactivity')
    const id = $id('1')
    let aborted = 0

    const getUserQuery = createQuery({
      queryKey: ({ v }: { v: string }) => ['abort', v],
      abortPrevious: true,
      queryFn: async ({ signal }) => {
        signal.addEventListener('abort', () => {
          aborted += 1
        })
        await new Promise((r) => setTimeout(r, 30))
        if (signal.aborted) throw new CancelledError()
        return 'ok'
      },
    })

    const user = getUserQuery.with(() => ({ v: id.value() }), { client })
    void user.refetch()
    id.set('2')
    await flush()
    await user.refetch().catch(() => {})
    expect(aborted).toBeGreaterThan(0)
  })

  it('tracks pending count', async () => {
    const client = createTestClient()
    const pending = deferred<number>()

    const q = createQuery({
      queryKey: () => ['pending'],
      queryFn: () => pending.promise,
    }).with({}, { client, refetchOnMount: false })

    const p = q.refetch()
    expect(q.$pendingCount.value()).toBeGreaterThan(0)
    pending.resolve(1)
    await p
    expect(q.$pendingCount.value()).toBe(0)
  })
})
