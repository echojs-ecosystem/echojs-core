import { describe, expect, it } from 'vitest'

import { createTestClient } from '../test-utils'
import { createMutationInstance } from './mutation-instance'

describe('createMutationInstance', () => {
  it('returns runnable mutation instance', async () => {
    const client = createTestClient()
    const definition = {
      kind: 'mutation-definition' as const,
      options: {
        mutationFn: async ({ variables }: { variables: { n: number } }) => variables.n * 2,
      },
      create: () => {
        throw new Error('unused')
      },
    }
    const instance = createMutationInstance(definition, client)
    const result = await instance.run({ n: 21 })
    expect(result).toBe(42)
    expect(instance.kind).toBe('mutation-instance')
  })
})
