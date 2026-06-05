import { computed, signal } from '@echojs-ecosystem/reactivity'

import { QueryObserver } from './query-observer'
import {
  isQueryError,
  isQueryFetching,
  isQueryIdle,
  isQueryPaused,
  isQueryPending,
  isQuerySuccess,
} from './query-status'
import type {
  QueryClient,
  QueryDefinition,
  QueryInstance,
  QueryInstanceOptions,
  QueryStatus,
  CancelOptions,
  RefetchOptions,
} from '../types'
import type { Query } from '../core/query'

const effectiveQuery = <TData, TParams, TError, TQueryData = TData>(
  observer: QueryObserver<TData, TParams, TError, TQueryData>,
): Query<TData, TParams, TError, TQueryData> | null => {
  const query = observer.getQuery()
  if (!query) return observer.getPreviousQuery()
  if (query.hasData()) return query
  const prev = observer.getPreviousQuery()
  if (prev && observer.options.keepPreviousData) return prev
  return query
}

export const createQueryInstance = <
  TData,
  TParams = void,
  TError = unknown,
  TQueryData = TData,
>(
  definition: QueryDefinition<TData, TParams, TError, TQueryData>,
  client: QueryClient,
  params: TParams | (() => TParams),
  instanceOptions?: QueryInstanceOptions<TData, TParams, TError>,
): QueryInstance<TData, TParams, TError> => {
  const observer = new QueryObserver(definition, client, params, instanceOptions)
  const $params = signal<TParams>(observer.getParams())

  observer.subscribe(() => $params.set(observer.getParams()))

  const readQuery = () => effectiveQuery(observer)

  const $data = computed((): TData | undefined => readQuery()?.$data.value() as TData | undefined)
  const $error = computed((): TError | null => readQuery()?.$error.value() as TError | null ?? null)
  const $status = computed((): QueryStatus => readQuery()?.$status.value() ?? 'idle')
  const $fetchStatus = computed(() => observer.getQuery()?.$fetchStatus.value() ?? 'idle')
  const $pendingCount = computed(() => observer.getQuery()?.$pendingCount.value() ?? 0)
  const $updatedAt = computed(() => observer.getQuery()?.$updatedAt.value() ?? null)
  const $isStale = computed(() => observer.getQuery()?.isStale() ?? true)
  const $abortSignal = computed((): AbortSignal | null => readQuery()?.getAbortSignal() ?? null)

  return {
    kind: 'query-instance',

    value: () => $data.value() as TData | undefined,
    data: () => $data.value() as TData | undefined,
    error: () => $error.value() as TError | null,
    params: () => $params.value() as TParams,

    status: () => $status.value(),
    fetchStatus: () => $fetchStatus.value(),

    pending: () => isQueryPending($status.value()),
    isPending: () => isQueryPending($status.value()),
    isFirstPending: () => {
      const q = observer.getQuery()
      return q ? q.state.status === 'pending' && !q.state.hadSuccess : false
    },
    isRefetching: () => {
      const q = observer.getQuery()
      return q ? q.state.fetchStatus === 'fetching' && q.hasData() : false
    },
    isFetching: () => isQueryFetching($fetchStatus.value()),
    isSuccess: () => isQuerySuccess($status.value()),
    isError: () => isQueryError($status.value()),
    isIdle: () => isQueryIdle($status.value()),
    isStale: () => $isStale.value(),
    isPaused: () => isQueryPaused($fetchStatus.value()),
    hasData: () => $data.value() !== undefined,
    hasError: () => $error.value() !== null,

    refetch: (options?: RefetchOptions) => observer.refetch(options),
    invalidate: () => observer.invalidate(),
    cancel: (options?: CancelOptions) => observer.cancel(options),
    abort: (reason?: unknown) => observer.cancel({ reason }),
    abortController: () => observer.getQuery()?.getAbortController() ?? null,
    abortSignal: () => observer.getQuery()?.getAbortSignal() ?? null,
    remove: () => {
      observer.remove()
      observer.destroy()
    },

    subscribe(listener: (data: TData | undefined) => void): () => void {
      return observer.subscribe(() => listener($data.value() as TData | undefined))
    },

    $data: $data as QueryInstance<TData, TParams, TError>['$data'],
    $error: $error as QueryInstance<TData, TParams, TError>['$error'],
    $params: $params as QueryInstance<TData, TParams, TError>['$params'],
    $status: $status as QueryInstance<TData, TParams, TError>['$status'],
    $fetchStatus: $fetchStatus as QueryInstance<TData, TParams, TError>['$fetchStatus'],
    $pendingCount: $pendingCount as QueryInstance<TData, TParams, TError>['$pendingCount'],
    $isStale: $isStale as QueryInstance<TData, TParams, TError>['$isStale'],
    $updatedAt: $updatedAt as QueryInstance<TData, TParams, TError>['$updatedAt'],
    $abortSignal: $abortSignal as QueryInstance<TData, TParams, TError>['$abortSignal'],
  }
}
