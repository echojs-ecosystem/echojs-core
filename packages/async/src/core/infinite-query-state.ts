import type { InfiniteQueryData, QueryFetchStatus, QueryStatus } from '../types'

export type InfiniteQueryState<TPage, TPageParam, TError> = {
  data: InfiniteQueryData<TPage, TPageParam> | undefined
  error: TError | null
  status: QueryStatus
  fetchStatus: QueryFetchStatus
  dataUpdatedAt: number
  errorUpdatedAt: number
  fetchFailureCount: number
  isInvalidated: boolean
  hadSuccess: boolean
  fetchingNextPage: boolean
  fetchingPreviousPage: boolean
}

export const defaultInfiniteQueryState = <
  TPage,
  TPageParam,
  TError,
>(): InfiniteQueryState<TPage, TPageParam, TError> => ({
  data: undefined,
  error: null,
  status: 'idle',
  fetchStatus: 'idle',
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  fetchFailureCount: 0,
  isInvalidated: false,
  hadSuccess: false,
  fetchingNextPage: false,
  fetchingPreviousPage: false,
})

export type InfiniteQueryAction<TPage, TPageParam, TError> =
  | { type: 'fetch'; direction: 'initial' | 'next' | 'previous' }
  | { type: 'success'; data: InfiniteQueryData<TPage, TPageParam> }
  | { type: 'error'; error: TError }
  | { type: 'failed'; failureCount: number; error: TError }
  | { type: 'invalidate' }
  | { type: 'reset' }
  | { type: 'setState'; state: Partial<InfiniteQueryState<TPage, TPageParam, TError>> }

export const infiniteQueryReducer = <TPage, TPageParam, TError>(
  state: InfiniteQueryState<TPage, TPageParam, TError>,
  action: InfiniteQueryAction<TPage, TPageParam, TError>,
): InfiniteQueryState<TPage, TPageParam, TError> => {
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        fetchStatus: 'fetching',
        fetchingNextPage: action.direction === 'next' || action.direction === 'initial',
        fetchingPreviousPage: action.direction === 'previous',
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
        fetchingNextPage: false,
        fetchingPreviousPage: false,
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
        fetchingNextPage: false,
        fetchingPreviousPage: false,
      }
    case 'failed':
      return {
        ...state,
        fetchFailureCount: action.failureCount,
        error: action.error,
      }
    case 'invalidate':
      return { ...state, isInvalidated: true }
    case 'reset':
      return defaultInfiniteQueryState<TPage, TPageParam, TError>()
    case 'setState':
      return { ...state, ...action.state }
    default:
      return state
  }
}
