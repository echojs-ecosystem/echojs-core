import type { QueryLifecycleContext } from '../types'

export const runLifecycle = async <TData, TParams = void, TError = unknown>(
  hooks: {
    onStart?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
    onSuccess?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
    onError?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
    onSettled?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
  },
  phase: 'start' | 'success' | 'error' | 'settled',
  ctx: QueryLifecycleContext<TData, TParams, TError>,
): Promise<void> => {
  if (phase === 'start') hooks.onStart?.(ctx)
  if (phase === 'success') hooks.onSuccess?.(ctx)
  if (phase === 'error') hooks.onError?.(ctx)
  if (phase === 'settled') hooks.onSettled?.(ctx)
}
