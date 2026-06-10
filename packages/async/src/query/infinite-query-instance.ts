import { computed, signal } from '@echojs-ecosystem/reactivity'

import { InfiniteQueryObserver } from './infinite-query-observer'
import { isQueryPending } from './query-status'
import type {
  InfiniteQueryData,
  InfiniteQueryDefinition,
  InfiniteQueryInstance,
  InfiniteQueryInstanceOptions,
  CancelOptions,
  FetchPageOptions,
  QueryClient,
  RefetchOptions,
} from '../types'
import type { InfiniteQuery } from '../core/infinite-query'

const effectiveInfiniteQuery = <TPage, TParams, TPageParam, TError>(
  observer: InfiniteQueryObserver<TPage, TParams, TPageParam, TError>,
): InfiniteQuery<TPage, TParams, TPageParam, TError> | null => {
  const query = observer.getQuery()
  if (!query) return observer.getPreviousQuery()
  if (query.hasData()) return query
  const prev = observer.getPreviousQuery()
  if (prev && observer.options.keepPreviousData) return prev
  return query
}

export const createInfiniteQueryInstance = <
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
>(
  definition: InfiniteQueryDefinition<TPage, TParams, TPageParam, TError>,
  client: QueryClient,
  params: TParams | (() => TParams),
  instanceOptions?: InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError>,
): InfiniteQueryInstance<TPage, TPageParam, TParams, TError> => {
  const observer = new InfiniteQueryObserver(definition, client, params, instanceOptions)
  const $params = signal<TParams>(observer.getParams())

  observer.subscribe(() => $params.set(observer.getParams()))

  const readQuery = () => effectiveInfiniteQuery(observer)

  const readData = (): InfiniteQueryData<TPage, TPageParam> | null => {
    const data = readQuery()?.$data.value() as InfiniteQueryData<TPage, TPageParam> | undefined
    return data ?? null
  }

  const $data = computed((): InfiniteQueryData<TPage, TPageParam> | null => readData())
  const $pages = computed((): TPage[] => readData()?.pages ?? [])
  const $pageParams = computed((): TPageParam[] => readData()?.pageParams ?? [])
  const $error = computed((): TError | null => readQuery()?.$error.value() as TError | null ?? null)
  const $pending = computed(() => {
    const q = readQuery()
    return q ? isQueryPending(q.$status.value()) : false
  })
  const $fetching = computed(() => readQuery()?.$fetchStatus.value() === 'fetching')
  const $fetchingNextPage = computed(() => readQuery()?.$fetchingNextPage.value() ?? false)
  const $fetchingPreviousPage = computed(
    () => readQuery()?.$fetchingPreviousPage.value() ?? false,
  )
  const $abortSignal = computed((): AbortSignal | null => readQuery()?.getAbortSignal() ?? null)

  const getQuery = () => {
    const q = observer.getQuery()
    if (!q) throw new Error('InfiniteQueryObserver has no active query')
    return q
  }

  return {
    kind: 'infinite-query',

    pages: () => $pages.value() as TPage[],
    pageParams: () => $pageParams.value() as TPageParam[],
    data: () => $data.value() as InfiniteQueryData<TPage, TPageParam> | null,
    flatMap: <TItem>(selector: (page: TPage) => TItem[]) =>
      ($pages.value() as TPage[]).flatMap((page) => selector(page)),

    fetchNextPage: (options?: FetchPageOptions) => getQuery().fetchNextPage(options),
    fetchPreviousPage: (options?: FetchPageOptions) => getQuery().fetchPreviousPage(options),
    refetch: (options?: RefetchOptions) => getQuery().refetch(options),
    reset: () => getQuery().reset(),
    cancel: (options?: CancelOptions) => observer.cancel(options),
    abort: (reason?: unknown) => observer.cancel({ reason }),
    abortController: () => readQuery()?.getAbortController() ?? null,
    abortSignal: () => readQuery()?.getAbortSignal() ?? null,
    remove: () => {
      observer.remove()
      observer.destroy()
    },

    hasNextPage: () => readQuery()?.hasNextPage() ?? true,
    hasPreviousPage: () => readQuery()?.hasPreviousPage() ?? false,

    pending: () => $pending.value(),
    fetching: () => $fetching.value(),
    fetchingNextPage: () => $fetchingNextPage.value(),
    fetchingPreviousPage: () => $fetchingPreviousPage.value(),
    error: () => $error.value() as TError | null,
    params: () => $params.value() as TParams,

    subscribe(listener: (data: InfiniteQueryData<TPage, TPageParam> | null) => void): () => void {
      return observer.subscribe(() => listener($data.value() as InfiniteQueryData<TPage, TPageParam> | null))
    },

    $data: $data as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$data'],
    $pages: $pages as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$pages'],
    $pageParams: $pageParams as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$pageParams'],
    $pending: $pending as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$pending'],
    $fetching: $fetching as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$fetching'],
    $fetchingNextPage:
      $fetchingNextPage as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$fetchingNextPage'],
    $fetchingPreviousPage:
      $fetchingPreviousPage as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$fetchingPreviousPage'],
    $error: $error as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$error'],
    $params: $params as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$params'],
    $abortSignal:
      $abortSignal as InfiniteQueryInstance<TPage, TPageParam, TParams, TError>['$abortSignal'],
  }
}
