import { describe, expect, it } from 'vitest'

import { getQueryProvider } from '../provider/context'
import { createQueryProvider } from './query-plugin'

describe('createQueryProvider', () => {
  it('registers provider on factory call', () => {
    const provider = createQueryProvider({ defaultOptions: { queries: { staleTime: 1 } } })
    expect(provider.name).toBe('query')
    expect(getQueryProvider()).toBe(provider.provider)
  })
})
