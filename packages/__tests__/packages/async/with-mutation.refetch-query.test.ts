// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createMutation, createQuery } from '@echojs-ecosystem/async'

import { asyncTick, createTestClient, resetAsyncTestContext } from '../../shared/test-utils/async'

type UserName = { name: string }

describe('async × mutation: refetch after write', () => {
  let serverName = 'Ada'

  beforeEach(() => {
    serverName = 'Ada'
    resetAsyncTestContext()
  })

  afterEach(() => {
    resetAsyncTestContext()
  })

  it('refetches query cache after mutation updates backing data', async () => {
    const client = createTestClient()

    const userQuery = createQuery<UserName, void>({
      queryKey: () => ['package-tests', 'async', 'user-rename'],
      queryFn: async () => ({ name: serverName }),
    })

    const renameMutation = createMutation<UserName, string>({
      mutationFn: async ({ variables: name }) => {
        serverName = name
        return { name }
      },
    })

    const user = userQuery.with(undefined as void, { client, refetchOnMount: false })
    await user.refetch()
    expect(user.data()?.name).toBe('Ada')

    const rename = renameMutation.create({ client })
    await rename.run('Grace')
    await user.refetch()
    await asyncTick()

    expect(user.data()?.name).toBe('Grace')
    expect(rename.isSuccess()).toBe(true)
  })
})
