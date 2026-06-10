import { describe, expect, it } from 'vitest'

import { createTestClient } from '../test-utils'
import {
  createQueryClientProvider,
  type QueryClientProvider,
} from './query-client-provider'

describe('createQueryClientProvider', () => {
  it('wraps client', () => {
    const client = createTestClient()
    const provider: QueryClientProvider = createQueryClientProvider(client)
    expect(provider.client).toBe(client)
  })
})
