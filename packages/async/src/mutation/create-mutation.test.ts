import { describe, expect, it, vi } from 'vitest'

import { createTestClient } from '../test-utils'
import { createQuery } from '../query/create-query'
import { createMutation } from './create-mutation'

describe('createMutation', () => {
  it('does not run immediately', () => {
    const fn = vi.fn(async () => 'ok')
    const def = createMutation({ mutationFn: fn })
    expect(fn).not.toHaveBeenCalled()
    void def
  })

  it('run success updates cache via onMutate', async () => {
    const client = createTestClient()

    type User = { id: string; name: string }
    type Vars = { id: string; input: { name: string } }

    const getUserQuery = createQuery({
      queryKey: ({ id }: { id: string }) => ['user', id],
      queryFn: async ({ params }) => ({ id: params.id, name: 'Old' }),
    })

    await client.fetchQuery(getUserQuery, { id: '1' })

    const updateUser = createMutation<User, Vars>({
      mutationFn: async ({ variables }) => ({
        id: variables.id,
        name: variables.input.name,
      }),
      onMutate: ({ variables, queryClient }) => {
        const previous = queryClient.getQueryData<User>(getUserQuery, { id: variables.id })
        queryClient.setQueryData<User>(getUserQuery, { id: variables.id }, (current) => ({
          ...(current ?? { id: variables.id, name: 'Old' }),
          ...variables.input,
        }))
        return () => {
          queryClient.setQueryData(getUserQuery, { id: variables.id }, previous)
        }
      },
      onError: ({ rollback }) => {
        if (typeof rollback === 'function') rollback()
      },
    }).create({ client })

    const data = await updateUser.run({ id: '1', input: { name: 'Vova' } })
    expect(data.name).toBe('Vova')
    expect(client.getQueryData<User>(getUserQuery, { id: '1' })?.name).toBe('Vova')
    expect(updateUser.isSuccess()).toBe(true)
  })

  it('run error rolls back optimistic update', async () => {
    const client = createTestClient()

    type User = { id: string; name: string }

    const getUserQuery = createQuery({
      queryKey: ({ id }: { id: string }) => ['user', id],
      queryFn: async ({ params }) => ({ id: params.id, name: 'Stable' }),
    })

    await client.fetchQuery(getUserQuery, { id: '1' })

    const failing = createMutation<User, { id: string }>({
      mutationFn: async () => {
        throw new Error('boom')
      },
      onMutate: ({ variables, queryClient }) => {
        const previous = queryClient.getQueryData<User>(getUserQuery, { id: variables.id })
        queryClient.setQueryData<User>(getUserQuery, { id: variables.id }, () => ({
          id: variables.id,
          name: 'Optimistic',
        }))
        return () => {
          queryClient.setQueryData(getUserQuery, { id: variables.id }, previous)
        }
      },
      onError: ({ rollback }) => {
        if (typeof rollback === 'function') rollback()
      },
    }).create({ client })

    await expect(failing.run({ id: '1' })).rejects.toThrow('boom')
    expect(client.getQueryData<User>(getUserQuery, { id: '1' })?.name).toBe('Stable')
    expect(failing.isError()).toBe(true)
  })

  it('reset clears mutation state', async () => {
    const client = createTestClient()
    const m = createMutation<string, void>({
      mutationFn: async () => 'done',
    }).create({ client })

    await m.run(undefined as void)
    expect(m.isSuccess()).toBe(true)
    m.reset()
    expect(m.isIdle()).toBe(true)
    expect(m.data()).toBeUndefined()
  })
})
