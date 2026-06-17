// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createQuery } from '@echojs-ecosystem/async'
import { signal } from '@echojs-ecosystem/reactivity'

import { asyncTick, createTestClient, resetAsyncTestContext } from '../../shared/test-utils/async'

describe('async × query: reactive params refetch', () => {
  beforeEach(() => {
    resetAsyncTestContext()
  })

  afterEach(() => {
    resetAsyncTestContext()
  })

  it('returns new data after param signal changes and refetch', async () => {
    const client = createTestClient()
    const $itemId = signal('a')

    const itemQuery = createQuery<string, { id: string }>({
      queryKey: ({ id }) => ['package-tests', 'async', 'item', id],
      queryFn: async ({ params }) => `item-${params.id}`,
    })

    const item = itemQuery.with(() => ({ id: $itemId.value() }), { client })
    await asyncTick()
    await item.refetch()
    expect(item.data()).toBe('item-a')

    $itemId.set('b')
    await asyncTick()
    await item.refetch()

    expect(item.data()).toBe('item-b')
  })
})
