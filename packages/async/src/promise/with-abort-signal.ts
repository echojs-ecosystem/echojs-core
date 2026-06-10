import type { AsyncOptions } from './async-options'
import { abortReason } from './abort-reason'
import { listenAbort } from './listen-abort'
import { throwIfAborted } from './throw-if-aborted'

export const withAbortSignal = <T>(
  run: () => Promise<T>,
  options?: AsyncOptions,
): Promise<T> => {
  throwIfAborted(options?.signal)
  const signal = options?.signal
  if (!signal) return run()

  return new Promise<T>((resolve, reject) => {
    const unregister = listenAbort(signal, () => {
      reject(abortReason(signal))
    })
    run().then(resolve, reject).finally(unregister)
  })
}
