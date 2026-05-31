import type { ReadonlySignal } from '@echojs/reactivity'

import type { InfiniteQueryCache } from './core/infinite-query-cache'
import type { QueryCache } from './core/query-cache'
import type { MutationCache } from './core/mutation-cache'

export type { QueryCache } from './core/query-cache'
export type { MutationCache } from './core/mutation-cache'
export type { InfiniteQueryCache } from './core/infinite-query-cache'

export type QueryKey = readonly unknown[]

export type AbortInput = AbortController | AbortSignal | (() => AbortController | AbortSignal)

/** Per-fetch / per-run abort wiring — external controller, external signal, or auto (default). */
export type AbortControlOptions = {
  /** User-owned controller — `cancel()` / `abort()` also call `.abort()` on it */
  abortController?: AbortInput
  /** External signal — when it aborts, the in-flight operation stops */
  signal?: AbortInput
}

export type CancelOptions = {
  silent?: boolean
  reason?: unknown
}

export type FetchPageOptions = AbortControlOptions
export type MutationRunOptions = AbortControlOptions

export type AbortCapable = {
  /** Current in-flight AbortController, if any */
  abortController(): AbortController | null
  /** Current in-flight AbortSignal, if any */
  abortSignal(): AbortSignal | null
  /** Abort the in-flight operation (alias for cancel with reason) */
  abort(reason?: unknown): void
}

export type QueryStatus = 'idle' | 'pending' | 'success' | 'error'

export type QueryFetchStatus = 'idle' | 'fetching' | 'paused'

export type MutationStatus = 'idle' | 'pending' | 'success' | 'error'

export type StoreLike<Value> = {
  value(): Value
  subscribe(listener: (value: Value, prevValue: Value) => void): () => void
}

export type QueryClientConfig = {
  defaultOptions?: {
    queries?: Partial<QueryOptions<unknown, void>>
    mutations?: Partial<MutationOptions<unknown, unknown>>
  }
}

/**
 * Query generics:
 * - `TData` — тип данных в кэше / instance (после `transform`)
 * - `TParams` — параметры запроса (аргумент `queryKey` / `.with()`)
 * - `TError` — тип ошибки
 * - `TQueryData` — сырой ответ `queryFn` (до `transform`, по умолчанию = `TData`)
 */
export type QueryFnContext<
  TParams,
  TQueryData,
  TError = unknown,
> = {
  params: TParams
  signal: AbortSignal
  abortController: AbortController
  queryClient: QueryClient
  queryKey: QueryKey
}

/** @deprecated Use {@link QueryFnContext} */
export type QueryFetcherContext<TParams, TQueryData, TError = unknown> =
  QueryFnContext<TParams, TQueryData, TError>

export type QueryLifecycleContext<
  TData,
  TParams,
  TError = unknown,
> = {
  data?: TData
  error?: TError | null
  params: TParams
  queryKey: QueryKey
  queryClient: QueryClient
}

export type QueryOptions<
  TData,
  TParams = void,
  TError = unknown,
  TQueryData = TData,
> = {
  name?: string
  queryKey: (params: TParams) => QueryKey
  queryFn: (ctx: QueryFnContext<TParams, TQueryData, TError>) => Promise<TQueryData>
  transform?: (data: TQueryData) => TData | Promise<TData>
  staleTime?: number
  cacheTime?: number
  retry?: number | false | ((failureCount: number, error: unknown) => boolean)
  retryDelay?: number | ((failureCount: number, error: unknown) => number)
  keepPreviousData?: boolean
  abortPrevious?: boolean
  abortController?: AbortInput
  signal?: AbortInput
  enabled?: boolean | (() => boolean)
  refetchOnMount?: boolean | 'stale'
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  onStart?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
  onSuccess?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
  onError?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
  onSettled?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
}

export type QueryInstanceOptions<
  TData = unknown,
  TParams = void,
  TError = unknown,
> = {
  client?: QueryClient
  enabled?: boolean | (() => boolean)
  refetchOnMount?: boolean | 'stale'
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  keepPreviousData?: boolean
  abortPrevious?: boolean
  abortController?: AbortInput
  signal?: AbortInput
  staleTime?: number
  cacheTime?: number
  retry?: number | false | ((failureCount: number, error: unknown) => boolean)
  retryDelay?: number | ((failureCount: number, error: unknown) => number)
  onStart?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
  onSuccess?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
  onError?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
  onSettled?: (ctx: QueryLifecycleContext<TData, TParams, TError>) => void
}

export type RefetchOptions = {
  throwOnError?: boolean
} & AbortControlOptions

export type InvalidateQueriesOptions = {
  exact?: boolean
  /** Default: `'active'` — refetch only queries with observers */
  refetch?: boolean | 'active' | 'all' | 'none'
}

export type QueryDefinition<
  TData,
  TParams = void,
  TError = unknown,
  TQueryData = TData,
> = {
  readonly kind: 'query-definition'
  readonly name?: string
  readonly options: QueryOptions<TData, TParams, TError, TQueryData>
  queryKey(params: TParams): QueryKey
  with(
    params: TParams | (() => TParams),
    options?: QueryInstanceOptions<TData, TParams, TError>,
  ): QueryInstance<TData, TParams, TError>
  withStore<StoreValue>(
    store: StoreLike<StoreValue>,
    map: (value: StoreValue) => TParams,
    options?: QueryInstanceOptions<TData, TParams, TError>,
  ): QueryInstance<TData, TParams, TError>
}

export type QueryInstance<
  TData,
  TParams = void,
  TError = unknown,
> = AbortCapable & {
  readonly kind: 'query-instance'

  value(): TData | undefined
  data(): TData | undefined
  error(): TError | null
  params(): TParams

  status(): QueryStatus
  fetchStatus(): QueryFetchStatus

  pending(): boolean
  isPending(): boolean
  isFirstPending(): boolean
  isFetching(): boolean
  isRefetching(): boolean
  isSuccess(): boolean
  isError(): boolean
  isIdle(): boolean
  isStale(): boolean
  isPaused(): boolean
  hasData(): boolean
  hasError(): boolean

  refetch(options?: RefetchOptions): Promise<TData>
  invalidate(): void
  cancel(options?: CancelOptions): void
  remove(): void

  subscribe(listener: (data: TData | undefined) => void): () => void

  $data: ReadonlySignal<TData | undefined>
  $error: ReadonlySignal<TError | null>
  $params: ReadonlySignal<TParams>
  $status: ReadonlySignal<QueryStatus>
  $fetchStatus: ReadonlySignal<QueryFetchStatus>
  $pendingCount: ReadonlySignal<number>
  $isStale: ReadonlySignal<boolean>
  $updatedAt: ReadonlySignal<number | null>
  $abortSignal: ReadonlySignal<AbortSignal | null>
}

export type QueryFilter = QueryKey | { queryKey: QueryKey; exact?: boolean }

export type InfiniteQueryData<TPage, TPageParam> = {
  pages: TPage[]
  pageParams: TPageParam[]
}

export type InfiniteQueryFetchDirection = 'initial' | 'next' | 'previous'

/**
 * Infinite query generics:
 * - `TPage` — одна страница ответа `queryFn`
 * - `TPageParam` — cursor / page param для пагинации
 * - `TParams` — параметры `.with()` / `queryKey`
 * - `TError` — тип ошибки
 */
export type InfiniteQueryFnContext<
  TParams,
  TPageParam,
  TPage,
  TError = unknown,
> = {
  params: TParams
  pageParam: TPageParam
  signal: AbortSignal
  abortController: AbortController
  queryClient: QueryClient
  queryKey: QueryKey
}

export type InfiniteQueryLifecycleContext<
  TPage,
  TParams,
  TPageParam,
  TError = unknown,
> = {
  data?: InfiniteQueryData<TPage, TPageParam>
  error?: TError | null
  params: TParams
  queryKey: QueryKey
  queryClient: QueryClient
}

export type InfiniteQueryOptions<
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
> = {
  name?: string
  queryKey: (params: TParams) => QueryKey
  queryFn: (ctx: InfiniteQueryFnContext<TParams, TPageParam, TPage, TError>) => Promise<TPage>
  initialPageParam: TPageParam
  getNextPageParam: (
    lastPage: TPage,
    allPages: TPage[],
  ) => TPageParam | undefined | null
  getPreviousPageParam?: (
    firstPage: TPage,
    allPages: TPage[],
  ) => TPageParam | undefined | null
  staleTime?: number
  cacheTime?: number
  retry?: number | false | ((failureCount: number, error: unknown) => boolean)
  retryDelay?: number | ((failureCount: number, error: unknown) => number)
  keepPreviousData?: boolean
  abortPrevious?: boolean
  abortController?: AbortInput
  signal?: AbortInput
  enabled?: boolean | (() => boolean)
  refetchOnMount?: boolean | 'stale'
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  onStart?: (ctx: InfiniteQueryLifecycleContext<TPage, TParams, TPageParam, TError>) => void
  onSuccess?: (ctx: InfiniteQueryLifecycleContext<TPage, TParams, TPageParam, TError>) => void
  onError?: (ctx: InfiniteQueryLifecycleContext<TPage, TParams, TPageParam, TError>) => void
  onSettled?: (ctx: InfiniteQueryLifecycleContext<TPage, TParams, TPageParam, TError>) => void
}

export type InfiniteQueryInstanceOptions<
  TPage = unknown,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
> = {
  client?: QueryClient
  enabled?: boolean | (() => boolean)
  refetchOnMount?: boolean | 'stale'
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  keepPreviousData?: boolean
  abortPrevious?: boolean
  abortController?: AbortInput
  signal?: AbortInput
  staleTime?: number
  cacheTime?: number
  retry?: number | false | ((failureCount: number, error: unknown) => boolean)
  retryDelay?: number | ((failureCount: number, error: unknown) => number)
  onStart?: (ctx: InfiniteQueryLifecycleContext<TPage, TParams, TPageParam, TError>) => void
  onSuccess?: (ctx: InfiniteQueryLifecycleContext<TPage, TParams, TPageParam, TError>) => void
  onError?: (ctx: InfiniteQueryLifecycleContext<TPage, TParams, TPageParam, TError>) => void
  onSettled?: (ctx: InfiniteQueryLifecycleContext<TPage, TParams, TPageParam, TError>) => void
}

export type InfiniteQueryDefinition<
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
> = {
  readonly kind: 'infinite-query-definition'
  readonly name?: string
  readonly options: InfiniteQueryOptions<TPage, TParams, TPageParam, TError>
  queryKey(params: TParams): QueryKey
  with(
    params: TParams | (() => TParams),
    options?: InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError>,
  ): InfiniteQueryInstance<TPage, TPageParam, TParams, TError>
  withStore<StoreValue>(
    store: StoreLike<StoreValue>,
    map: (value: StoreValue) => TParams,
    options?: InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError>,
  ): InfiniteQueryInstance<TPage, TPageParam, TParams, TError>
}

export type InfiniteQueryInstance<
  TPage,
  TPageParam = unknown,
  TParams = void,
  TError = unknown,
> = AbortCapable & {
  readonly kind: 'infinite-query'

  pages(): TPage[]
  pageParams(): TPageParam[]
  data(): InfiniteQueryData<TPage, TPageParam> | null
  flatMap<TItem>(selector: (page: TPage) => TItem[]): TItem[]

  fetchNextPage(options?: FetchPageOptions): Promise<TPage | null>
  fetchPreviousPage(options?: FetchPageOptions): Promise<TPage | null>
  refetch(options?: RefetchOptions): Promise<InfiniteQueryData<TPage, TPageParam>>
  reset(): void
  cancel(options?: CancelOptions): void
  remove(): void

  hasNextPage(): boolean
  hasPreviousPage(): boolean

  pending(): boolean
  fetching(): boolean
  fetchingNextPage(): boolean
  fetchingPreviousPage(): boolean
  error(): TError | null
  params(): TParams

  subscribe(listener: (data: InfiniteQueryData<TPage, TPageParam> | null) => void): () => void

  $data: ReadonlySignal<InfiniteQueryData<TPage, TPageParam> | null>
  $pages: ReadonlySignal<TPage[]>
  $pageParams: ReadonlySignal<TPageParam[]>
  $pending: ReadonlySignal<boolean>
  $fetching: ReadonlySignal<boolean>
  $fetchingNextPage: ReadonlySignal<boolean>
  $fetchingPreviousPage: ReadonlySignal<boolean>
  $error: ReadonlySignal<TError | null>
  $params: ReadonlySignal<TParams>
  $abortSignal: ReadonlySignal<AbortSignal | null>
}

export type InfiniteQueryCacheEvent =
  | { type: 'infiniteQueryAdded'; queryKey: QueryKey; hash: string }
  | { type: 'infiniteQueryRemoved'; queryKey: QueryKey; hash: string }
  | { type: 'infiniteQueryUpdated'; queryKey: QueryKey; hash: string }
  | { type: 'infiniteQueryFetched'; queryKey: QueryKey; hash: string }

export type InfiniteQueryCacheListener = (event: InfiniteQueryCacheEvent) => void

export type ResolvedInfiniteQueryOptions<
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
> = InfiniteQueryOptions<TPage, TParams, TPageParam, TError> &
  Required<
    Pick<
      InfiniteQueryOptions<TPage, TParams, TPageParam, TError>,
      'staleTime' | 'cacheTime' | 'retry' | 'retryDelay' | 'keepPreviousData' | 'abortPrevious'
    >
  > & {
    staleTimeMs: number
    cacheTimeMs: number
  }

export type ResolvedInfiniteInstanceOptions<
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
> = InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError> &
  Required<
    Pick<
      InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError>,
      | 'enabled'
      | 'refetchOnMount'
      | 'refetchOnWindowFocus'
      | 'refetchOnReconnect'
      | 'keepPreviousData'
      | 'abortPrevious'
    >
  > & {
    staleTimeMs: number
    cacheTimeMs: number
    retry: number | false | ((failureCount: number, error: unknown) => boolean)
    retryDelay: number | ((failureCount: number, error: unknown) => number)
  }

/**
 * Mutation generics:
 * - `TData` — результат mutation
 * - `TVariables` — входные переменные `.run()`
 * - `TError` — тип ошибки
 * - `TRollback` — контекст отката из `onMutate`
 */
export type MutationFnContext<
  TVariables,
  TData,
  TError = unknown,
> = {
  variables: TVariables
  signal: AbortSignal
  abortController: AbortController
  queryClient: QueryClient
}

export type MutationLifecycleContext<
  TData,
  TVariables,
  TError = unknown,
  TRollback = unknown,
> = {
  data?: TData
  error?: TError | null
  variables: TVariables
  queryClient: QueryClient
  rollback?: TRollback
}

export type MutationOptions<
  TData,
  TVariables,
  TError = unknown,
  TRollback = unknown,
> = {
  name?: string
  mutationFn: (ctx: MutationFnContext<TVariables, TData, TError>) => Promise<TData>
  abortController?: AbortInput
  signal?: AbortInput
  retry?: number | false | ((failureCount: number, error: unknown) => boolean)
  retryDelay?: number | ((failureCount: number, error: unknown) => number)
  onMutate?: (
    ctx: MutationLifecycleContext<TData, TVariables, TError, TRollback>,
  ) => Promise<TRollback | void> | TRollback | void
  onSuccess?: (ctx: MutationLifecycleContext<TData, TVariables, TError, TRollback>) => void
  onError?: (ctx: MutationLifecycleContext<TData, TVariables, TError, TRollback>) => void
  onSettled?: (ctx: MutationLifecycleContext<TData, TVariables, TError, TRollback>) => void
}

export type MutationDefinition<
  TData,
  TVariables,
  TError = unknown,
  TRollback = unknown,
> = {
  readonly kind: 'mutation-definition'
  readonly name?: string
  readonly options: MutationOptions<TData, TVariables, TError, TRollback>
  create(options?: { client?: QueryClient }): MutationInstance<TData, TVariables, TError>
}

export type MutationInstance<
  TData,
  TVariables,
  TError = unknown,
> = AbortCapable & {
  readonly kind: 'mutation-instance'

  run(variables: TVariables, options?: MutationRunOptions): Promise<TData>
  reset(): void
  cancel(options?: CancelOptions): void

  data(): TData | undefined
  error(): TError | null
  variables(): TVariables | undefined

  status(): MutationStatus
  pending(): boolean
  isPending(): boolean
  isSuccess(): boolean
  isError(): boolean
  isIdle(): boolean

  $data: ReadonlySignal<TData | undefined>
  $error: ReadonlySignal<TError | null>
  $variables: ReadonlySignal<TVariables | undefined>
  $status: ReadonlySignal<MutationStatus>
  $pendingCount: ReadonlySignal<number>
  $abortSignal: ReadonlySignal<AbortSignal | null>
}

export type QueryCacheEvent =
  | { type: 'queryAdded'; queryKey: QueryKey; hash: string }
  | { type: 'queryRemoved'; queryKey: QueryKey; hash: string }
  | { type: 'queryUpdated'; queryKey: QueryKey; hash: string }
  | { type: 'queryInvalidated'; queryKey: QueryKey; hash: string }
  | { type: 'queryFetched'; queryKey: QueryKey; hash: string; data?: unknown }

export type MutationCacheEvent =
  | { type: 'mutationAdded'; mutationId: number }
  | { type: 'mutationUpdated'; mutationId: number }

export type QueryCacheListener = (event: QueryCacheEvent) => void

export type MutationCacheListener = (event: MutationCacheEvent) => void

export type QueryClient = {
  readonly queryCache: QueryCache
  readonly infiniteQueryCache: InfiniteQueryCache
  readonly mutationCache: MutationCache

  fetchQuery<TData, TParams = void, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params?: TParams,
    options?: QueryInstanceOptions<TData, TParams, TError>,
  ): Promise<TData>

  prefetchQuery<TData, TParams = void, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params?: TParams,
    options?: QueryInstanceOptions<TData, TParams, TError>,
  ): Promise<void>

  ensureQueryData<TData, TParams = void, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params?: TParams,
    options?: QueryInstanceOptions<TData, TParams, TError>,
  ): Promise<TData>

  getQueryData<TData>(keyOrDefinition: QueryKey): TData | undefined
  getQueryData<TData, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, void, TError, TQueryData>,
  ): TData | undefined
  getQueryData<TData, TParams, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params: TParams,
  ): TData | undefined

  setQueryData<TData>(
    keyOrDefinition: QueryKey,
    updater: TData | ((prev: TData | undefined) => TData | undefined),
  ): void
  setQueryData<TData>(
    definition: QueryDefinition<TData, void, unknown, unknown>,
    updater: TData | ((prev: TData | undefined) => TData | undefined),
  ): void
  setQueryData<TData, TParams, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params: TParams,
    updater: TData | ((prev: TData | undefined) => TData | undefined),
  ): void

  invalidateQueries(
    filter: QueryFilter,
    options?: InvalidateQueriesOptions,
  ): void
  refetchQueries(filter: QueryFilter): Promise<void>
  cancelQueries(filter: QueryFilter): void
  removeQueries(filter: QueryFilter): void
  clear(): void
}

export type ResolvedQueryOptions<
  TData,
  TParams = void,
  TError = unknown,
  TQueryData = TData,
> = QueryOptions<TData, TParams, TError, TQueryData> &
  Required<
    Pick<
      QueryOptions<TData, TParams, TError, TQueryData>,
      'staleTime' | 'cacheTime' | 'retry' | 'retryDelay' | 'keepPreviousData' | 'abortPrevious'
    >
  > & {
    staleTimeMs: number
    cacheTimeMs: number
  }

export type ResolvedInstanceOptions<
  TData,
  TParams = void,
  TError = unknown,
> = QueryInstanceOptions<TData, TParams, TError> &
  Required<
    Pick<
      QueryInstanceOptions<TData, TParams, TError>,
      | 'enabled'
      | 'refetchOnMount'
      | 'refetchOnWindowFocus'
      | 'refetchOnReconnect'
      | 'keepPreviousData'
      | 'abortPrevious'
    >
  > & {
    staleTimeMs: number
    cacheTimeMs: number
    retry: number | false | ((failureCount: number, error: unknown) => boolean)
    retryDelay: number | ((failureCount: number, error: unknown) => number)
  }
