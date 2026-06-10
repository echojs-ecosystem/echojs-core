import { describe, expect, it } from 'vitest'

import { functionalUpdate } from './functional-update'

describe('functionalUpdate', () => {
  it('returns value when updater is not a function', () => {
    expect(functionalUpdate(42, 0)).toBe(42)
  })

  it('calls updater with input when function', () => {
    expect(functionalUpdate((n: number) => n + 1, 1)).toBe(2)
  })
})
