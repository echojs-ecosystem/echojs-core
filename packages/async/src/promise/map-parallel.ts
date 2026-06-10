import { all } from './all'
import type { MaybePromise } from './maybe-promise'
import type { MapParallelOptions } from './map-parallel-options'
import { throwIfAborted } from './throw-if-aborted'

/**
 * Map `items` in parallel. Use `concurrency` to cap simultaneous work
 * (e.g. `3` for rate-limited API batches).
 */
export const mapParallel = async <T, R>(
  items: readonly T[],
  fn: (item: T, index: number, signal?: AbortSignal) => MaybePromise<R>,
  options?: MapParallelOptions,
): Promise<R[]> => {
  if (items.length === 0) return []

  const concurrency = Math.max(1, options?.concurrency ?? items.length)
  const results = new Array<R>(items.length)
  let nextIndex = 0

  const worker = async (): Promise<void> => {
    while (true) {
      throwIfAborted(options?.signal)
      const index = nextIndex
      nextIndex += 1
      if (index >= items.length) return
      results[index] = await fn(items[index]!, index, options?.signal)
    }
  }

  await all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
    options,
  )
  return results
}
