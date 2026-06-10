import { abortReason } from './abort-reason'

export const throwIfAborted = (signal?: AbortSignal): void => {
  if (signal?.aborted) throw abortReason(signal)
}
