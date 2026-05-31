import { describe, expect, it } from 'vitest'

import { createQueryProvider } from '../provider/query-provider'
import {
  defaultQueryOptions,
  mergeQueryDefinitionOptions,
  toMs,
} from './query-options'

describe('query-options', () => {
  it('toMs', () => {
    expect(toMs(undefined, 5)).toBe(5)
    expect(toMs(100, 5)).toBe(100)
    expect(toMs(Number.POSITIVE_INFINITY, 5)).toBe(Number.POSITIVE_INFINITY)
  })

  it('defaultQueryOptions from client config', () => {
    const opts = defaultQueryOptions({
      defaultOptions: { queries: { staleTime: 5000, retry: 2 } },
    })
    expect(opts.staleTime).toBe(5000)
    expect(opts.retry).toBe(2)
  })

  it('mergeQueryDefinitionOptions merges provider defaults', () => {
    const provider = createQueryProvider({
      defaultOptions: { queries: { staleTime: 10_000 } },
    })
    const merged = mergeQueryDefinitionOptions(
      { queryKey: () => ['m'], queryFn: async () => 1, staleTime: 1 },
      undefined,
      provider,
    )
    expect(merged.staleTime).toBe(1)
    expect(merged.retry).toBe(false)
  })
})
