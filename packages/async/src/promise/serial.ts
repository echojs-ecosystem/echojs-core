import type { AsyncOptions } from './async-options'
import type { AsyncTask } from './async-task'
import type { MaybePromise } from './maybe-promise'
import { throwIfAborted } from './throw-if-aborted'

const runTask = <T>(task: AsyncTask<T>): Promise<T> =>
  Promise.resolve(typeof task === 'function' ? (task as () => MaybePromise<T>)() : task)

/**
 * Run tasks one after another. Accepts values or `() => promise` thunks
 * (lazy — the next task is not created until the previous settles).
 */
export const serial = async <T>(
  tasks: readonly AsyncTask<T>[],
  options?: AsyncOptions,
): Promise<T[]> => {
  const results: T[] = []
  for (const task of tasks) {
    throwIfAborted(options?.signal)
    results.push(await runTask(task))
  }
  return results
}
