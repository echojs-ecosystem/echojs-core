import { describe, expect, it } from 'vitest'

import { createQuery } from './create-query'
import {
  isEnabled,
  isQueryError,
  isQueryFetching,
  isQueryIdle,
  isQueryPaused,
  isQueryPending,
  isQuerySuccess,
  resolveDefinitionOptions,
  resolveInstanceOptions,
  resolveQueryOptions,
} from './query-status'

describe('query-status', () => {
  it('status helpers', () => {
    expect(isQueryPending('pending')).toBe(true)
    expect(isQueryFetching('fetching')).toBe(true)
    expect(isQuerySuccess('success')).toBe(true)
    expect(isQueryError('error')).toBe(true)
    expect(isQueryIdle('idle')).toBe(true)
    expect(isQueryPaused('paused')).toBe(true)
  })

  it('isEnabled', () => {
    expect(isEnabled(true)).toBe(true)
    expect(isEnabled(false)).toBe(false)
    expect(isEnabled(() => true)).toBe(true)
    expect(isEnabled(() => false)).toBe(false)
  })

  it('resolveQueryOptions defaults', () => {
    const resolved = resolveQueryOptions({
      queryKey: () => ['a'],
      queryFn: async () => 1,
    })
    expect(resolved.retry).toBe(false)
    expect(resolved.keepPreviousData).toBe(false)
    expect(resolved.staleTimeMs).toBe(0)
    expect(resolved.cacheTimeMs).toBeGreaterThan(0)
  })

  it('resolveInstanceOptions merges instance overrides', () => {
    const def = createQuery({
      queryKey: () => ['x'],
      queryFn: async () => 1,
      staleTime: 100,
    })
    const opts = resolveInstanceOptions(resolveDefinitionOptions(def), {
      enabled: false,
      staleTime: 200,
    })
    expect(opts.enabled).toBe(false)
    expect(opts.staleTimeMs).toBe(200)
  })
})
