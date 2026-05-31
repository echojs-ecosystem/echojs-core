import { describe, expect, it, vi } from 'vitest'

import {
  defaultQueryState,
  isStaleByTime,
  queryReducer,
  timeUntilStale,
} from './query-state'

describe('query-state', () => {
  it('defaultQueryState initial values', () => {
    const s = defaultQueryState<string, Error>()
    expect(s.status).toBe('idle')
    expect(s.data).toBeUndefined()
    expect(s.isInvalidated).toBe(false)
  })

  it('queryReducer transitions', () => {
    let s = defaultQueryState<string, Error>()
    s = queryReducer(s, { type: 'fetch' })
    expect(s.fetchStatus).toBe('fetching')
    expect(s.status).toBe('pending')

    s = queryReducer(s, { type: 'success', data: 'ok' })
    expect(s.status).toBe('success')
    expect(s.data).toBe('ok')
    expect(s.hadSuccess).toBe(true)

    s = queryReducer(s, { type: 'invalidate' })
    expect(s.isInvalidated).toBe(true)

    s = queryReducer(s, { type: 'error', error: new Error('e') })
    expect(s.status).toBe('error')

    s = queryReducer(s, { type: 'failed', failureCount: 2, error: new Error('f') })
    expect(s.fetchFailureCount).toBe(2)

    s = queryReducer(s, { type: 'setState', state: { fetchStatus: 'paused' } })
    expect(s.fetchStatus).toBe('paused')
  })

  it('timeUntilStale and isStaleByTime', () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)
    const updatedAt = 500
    expect(timeUntilStale(updatedAt, 1000)).toBe(500)
    expect(isStaleByTime(updatedAt, 1000, false, true)).toBe(false)
    vi.setSystemTime(2000)
    expect(isStaleByTime(updatedAt, 1000, false, true)).toBe(true)
    expect(isStaleByTime(updatedAt, Infinity, false, true)).toBe(false)
    expect(isStaleByTime(updatedAt, 0, true, true)).toBe(true)
    expect(isStaleByTime(0, 0, false, false)).toBe(true)
    vi.useRealTimers()
  })
})
