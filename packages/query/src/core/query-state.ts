import type { QueryFetchStatus, QueryStatus } from '../types'

export type QueryState<Data, Error> = {
  data: Data | undefined
  error: Error | null
  status: QueryStatus
  fetchStatus: QueryFetchStatus
  dataUpdatedAt: number
  errorUpdatedAt: number
  fetchFailureCount: number
  isInvalidated: boolean
  hadSuccess: boolean
}

export type QueryAction<Data, Error> =
  | { type: 'fetch' }
  | { type: 'success'; data: Data }
  | { type: 'error'; error: Error }
  | { type: 'failed'; failureCount: number; error: Error }
  | { type: 'invalidate' }
  | { type: 'setState'; state: Partial<QueryState<Data, Error>> }

export const defaultQueryState = <Data, Error>(): QueryState<Data, Error> => ({
  data: undefined,
  error: null,
  status: 'idle',
  fetchStatus: 'idle',
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  fetchFailureCount: 0,
  isInvalidated: false,
  hadSuccess: false,
})

export const queryReducer = <Data, Error>(
  state: QueryState<Data, Error>,
  action: QueryAction<Data, Error>,
): QueryState<Data, Error> => {
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        fetchStatus: 'fetching',
        ...(state.data === undefined && state.status === 'idle'
          ? { status: 'pending' as const, error: null }
          : {}),
      }
    case 'success':
      return {
        ...state,
        data: action.data,
        error: null,
        status: 'success',
        fetchStatus: 'idle',
        dataUpdatedAt: Date.now(),
        fetchFailureCount: 0,
        isInvalidated: false,
        hadSuccess: true,
      }
    case 'error':
      return {
        ...state,
        error: action.error,
        status: 'error',
        fetchStatus: 'idle',
        errorUpdatedAt: Date.now(),
        fetchFailureCount: state.fetchFailureCount + 1,
        isInvalidated: true,
      }
    case 'failed':
      return {
        ...state,
        fetchFailureCount: action.failureCount,
        error: action.error,
      }
    case 'invalidate':
      return {
        ...state,
        isInvalidated: true,
      }
    case 'setState':
      return {
        ...state,
        ...action.state,
      }
    default:
      return state
  }
}

export const timeUntilStale = (updatedAt: number, staleTimeMs = 0): number =>
  Math.max(updatedAt + staleTimeMs - Date.now(), 0)

export const isStaleByTime = (
  dataUpdatedAt: number,
  staleTimeMs: number,
  isInvalidated: boolean,
  hasData: boolean,
): boolean => {
  if (!hasData) return true
  if (isInvalidated) return true
  if (!Number.isFinite(staleTimeMs)) return false
  return timeUntilStale(dataUpdatedAt, staleTimeMs) === 0
}
