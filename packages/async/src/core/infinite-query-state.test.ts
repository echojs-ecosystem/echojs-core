import { describe, expect, it } from 'vitest'

import {
  defaultInfiniteQueryState,
  infiniteQueryReducer,
} from './infinite-query-state'

describe('infinite-query-state', () => {
  it('defaultInfiniteQueryState initial values', () => {
    const state = defaultInfiniteQueryState<string, string | null, Error>()
    expect(state.status).toBe('idle')
    expect(state.fetchingNextPage).toBe(false)
    expect(state.fetchingPreviousPage).toBe(false)
  })

  it('infiniteQueryReducer transitions', () => {
    let state = defaultInfiniteQueryState<string, string | null, Error>()

    state = infiniteQueryReducer(state, { type: 'fetch', direction: 'initial' })
    expect(state.fetchStatus).toBe('fetching')
    expect(state.fetchingNextPage).toBe(true)
    expect(state.status).toBe('pending')

    state = infiniteQueryReducer(state, {
      type: 'success',
      data: { pages: ['a'], pageParams: [null] },
    })
    expect(state.status).toBe('success')
    expect(state.fetchingNextPage).toBe(false)

    state = infiniteQueryReducer(state, { type: 'fetch', direction: 'next' })
    expect(state.fetchingNextPage).toBe(true)

    state = infiniteQueryReducer(state, { type: 'fetch', direction: 'previous' })
    expect(state.fetchingPreviousPage).toBe(true)

    state = infiniteQueryReducer(state, { type: 'error', error: new Error('e') })
    expect(state.status).toBe('error')
    expect(state.isInvalidated).toBe(true)

    state = infiniteQueryReducer(state, {
      type: 'failed',
      failureCount: 2,
      error: new Error('f'),
    })
    expect(state.fetchFailureCount).toBe(2)

    state = infiniteQueryReducer(state, { type: 'invalidate' })
    expect(state.isInvalidated).toBe(true)

    state = infiniteQueryReducer(state, { type: 'reset' })
    expect(state.status).toBe('idle')

    state = infiniteQueryReducer(state, { type: 'setState', state: { fetchStatus: 'paused' } })
    expect(state.fetchStatus).toBe('paused')
  })
})
