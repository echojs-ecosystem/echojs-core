import { describe, expect, it } from 'vitest'

import { mapSerial } from './map-serial'

describe('mapSerial', () => {
  it('maps items sequentially', async () => {
    const order: number[] = []
    const values = await mapSerial([1, 2, 3], async (n) => {
      order.push(n)
      return n * 2
    })
    expect(values).toEqual([2, 4, 6])
    expect(order).toEqual([1, 2, 3])
  })
})
