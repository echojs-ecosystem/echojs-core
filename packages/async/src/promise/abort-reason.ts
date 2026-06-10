import { CancelledError } from '../core/cancelled-error'

export const abortReason = (signal?: AbortSignal): unknown =>
  signal?.reason ?? new CancelledError()
