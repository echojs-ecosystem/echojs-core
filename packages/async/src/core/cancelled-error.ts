export type CancelOptions = {
  revert?: boolean
  silent?: boolean
}

export class CancelledError extends Error {
  readonly revert?: boolean
  readonly silent?: boolean

  constructor(options?: CancelOptions) {
    super('CancelledError')
    this.name = 'CancelledError'
    this.revert = options?.revert
    this.silent = options?.silent
  }
}

export const isCancelledError = (value: unknown): value is CancelledError =>
  value instanceof CancelledError

export const isAbortError = (value: unknown): boolean => {
  if (isCancelledError(value)) return true
  if (!value || typeof value !== 'object') return false
  if (value instanceof DOMException && value.name === 'AbortError') return true
  return (value as { name?: string }).name === 'AbortError'
}
