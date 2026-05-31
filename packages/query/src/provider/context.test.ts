import { describe, expect, it } from 'vitest'

import { createQueryProvider } from './query-provider'
import {
  getQueryProvider,
  resetQueryProvider,
  setActiveQueryProvider,
} from './context'

describe('query provider context', () => {
  it('get/set/reset active provider', () => {
    resetQueryProvider()
    expect(getQueryProvider()).toBeNull()

    const provider = createQueryProvider()
    setActiveQueryProvider(provider)
    expect(getQueryProvider()).toBe(provider)

    resetQueryProvider()
    expect(getQueryProvider()).toBeNull()
  })
})
