import { describe, expect, it } from 'vitest'

import { sleep } from '../utils/sleep'
import { mapParallel } from './map-parallel'

describe('mapParallel', () => {
  it('maps all items when concurrency is unlimited', async () => {
    const values = await mapParallel([1, 2, 3], async (n) => n * 2)
    expect(values).toEqual([2, 4, 6])
  })

  it('respects concurrency cap', async () => {
    let inFlight = 0
    let maxInFlight = 0

    await mapParallel(
      [1, 2, 3, 4, 5],
      async (n) => {
        inFlight += 1
        maxInFlight = Math.max(maxInFlight, inFlight)
        await sleep(5)
        inFlight -= 1
        return n
      },
      { concurrency: 2 },
    )

    expect(maxInFlight).toBe(2)
  })
})
