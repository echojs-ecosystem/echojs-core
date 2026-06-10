import { signal } from '@echojs-ecosystem/reactivity'

import { runLifecycle } from '../async/lifecycle'
import {
  abortWithReason,
  createFetchAbortHandle,
  mergeFetchAbortSource,
  type CancelOptions,
  type FetchAbortSource,
} from '../async/abort-control'
import { CancelledError, isCancelledError } from './cancelled-error'
import {
  defaultInfiniteQueryState,
  infiniteQueryReducer,
  type InfiniteQueryAction,
  type InfiniteQueryState,
} from './infinite-query-state'
import { Removable } from './removable'
import { createRetryer } from './retryer'
import { hashKey } from '../utils/hash'
import { isStaleByTime } from './query-state'
import type { InfiniteQueryCache } from './infinite-query-cache'
import type {
  InfiniteQueryData,
  InfiniteQueryDefinition,
  InfiniteQueryFetchDirection,
  QueryClient,
  QueryFetchStatus,
  QueryKey,
  QueryStatus,
  RefetchOptions,
  ResolvedInfiniteInstanceOptions,
} from '../types'

export type InfiniteQueryObserverLike = {
  onInfiniteQueryUpdate(): void
}

export type InfiniteQueryConfig<
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
> = {
  client: QueryClient
  cache: InfiniteQueryCache
  definition: InfiniteQueryDefinition<TPage, TParams, TPageParam, TError>
  params: TParams
  queryKey: QueryKey
  options: ResolvedInfiniteInstanceOptions<TPage, TParams, TPageParam, TError>
}

export const hasInfiniteNextPage = <TPage, TPageParam>(
  data: InfiniteQueryData<TPage, TPageParam> | undefined,
  getNextPageParam: (lastPage: TPage, allPages: TPage[]) => TPageParam | undefined | null,
): boolean => {
  if (!data || data.pages.length === 0) return true
  const lastPage = data.pages[data.pages.length - 1]!
  const next = getNextPageParam(lastPage, data.pages)
  return next !== undefined && next !== null
}

export const hasInfinitePreviousPage = <TPage, TPageParam>(
  data: InfiniteQueryData<TPage, TPageParam> | undefined,
  getPreviousPageParam:
    | ((firstPage: TPage, allPages: TPage[]) => TPageParam | undefined | null)
    | undefined,
): boolean => {
  if (!getPreviousPageParam || !data || data.pages.length === 0) return false
  const firstPage = data.pages[0]!
  const prev = getPreviousPageParam(firstPage, data.pages)
  return prev !== undefined && prev !== null
}

export class InfiniteQuery<
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
> extends Removable {
  readonly queryKey: QueryKey
  readonly queryHash: string
  readonly definition: InfiniteQueryDefinition<TPage, TParams, TPageParam, TError>
  readonly client: QueryClient

  params: TParams
  options: ResolvedInfiniteInstanceOptions<TPage, TParams, TPageParam, TError>

  state: InfiniteQueryState<TPage, TPageParam, TError>
  observers: Set<InfiniteQueryObserverLike> = new Set()

  readonly $data
  readonly $error
  readonly $status
  readonly $fetchStatus
  readonly $pendingCount
  readonly $updatedAt
  readonly $isInvalidated
  readonly $fetchingNextPage
  readonly $fetchingPreviousPage

  #retryer: ReturnType<typeof createRetryer<TPage>> | undefined
  #abortController: AbortController | undefined
  #abortDispose: (() => void) | undefined
  #cache: InfiniteQueryCache
  #requestId = 0

  constructor(config: InfiniteQueryConfig<TPage, TParams, TPageParam, TError>) {
    super()
    this.client = config.client
    this.#cache = config.cache
    this.definition = config.definition
    this.params = config.params
    this.queryKey = config.queryKey
    this.queryHash = hashKey(config.queryKey)
    this.options = config.options

    this.state = defaultInfiniteQueryState<TPage, TPageParam, TError>()
    this.updateGcTime(this.options.cacheTimeMs)

    this.$data = signal<InfiniteQueryData<TPage, TPageParam> | undefined>(undefined)
    this.$error = signal<TError | null>(null)
    this.$status = signal<QueryStatus>('idle')
    this.$fetchStatus = signal<QueryFetchStatus>('idle')
    this.$pendingCount = signal(0)
    this.$updatedAt = signal<number | null>(null)
    this.$isInvalidated = signal(false)
    this.$fetchingNextPage = signal(false)
    this.$fetchingPreviousPage = signal(false)
  }

  isActive(): boolean {
    return this.observers.size > 0
  }

  isStale(): boolean {
    return isStaleByTime(
      this.state.dataUpdatedAt,
      this.options.staleTimeMs,
      this.state.isInvalidated,
      this.state.data !== undefined,
    )
  }

  hasData(): boolean {
    return this.state.data !== undefined && this.state.data.pages.length > 0
  }

  hasNextPage(): boolean {
    return hasInfiniteNextPage(this.state.data, this.definition.options.getNextPageParam)
  }

  hasPreviousPage(): boolean {
    return hasInfinitePreviousPage(this.state.data, this.definition.options.getPreviousPageParam)
  }

  addObserver(observer: InfiniteQueryObserverLike): void {
    if (!this.observers.has(observer)) {
      this.observers.add(observer)
      this.clearGcTimeout()
    }
  }

  removeObserver(observer: InfiniteQueryObserverLike): void {
    if (this.observers.delete(observer) && this.observers.size === 0) {
      this.scheduleGc(() => this.#cache.remove(this))
    }
  }

  reset(): void {
    this.#requestId += 1
    void this.cancel({ silent: true })
    this.#dispatch({ type: 'reset' })
  }

  getAbortController(): AbortController | undefined {
    return this.#abortController
  }

  getAbortSignal(): AbortSignal | undefined {
    return this.#abortController?.signal
  }

  cancel(options?: CancelOptions): Promise<void> {
    this.#requestId += 1
    abortWithReason(this.#abortController, options?.reason)
    const promise = this.#retryer?.promise
    this.#retryer?.cancel(options)
    this.#retryer = undefined
    this.#clearAbortHandle()
    this.#dispatch({
      type: 'setState',
      state: {
        fetchStatus: 'idle',
        fetchingNextPage: false,
        fetchingPreviousPage: false,
      },
    })
    return promise ? promise.then(() => undefined).catch(() => undefined) : Promise.resolve()
  }

  async refetch(options?: RefetchOptions): Promise<InfiniteQueryData<TPage, TPageParam>> {
    await this.cancel({ silent: true })
    this.#dispatch({ type: 'reset' })
    await this.fetchPage('initial', options)
    if (!this.state.data) {
      throw new Error('Infinite query refetch failed')
    }
    return this.state.data
  }

  async fetchNextPage(options?: FetchAbortSource): Promise<TPage | null> {
    if (!this.hasNextPage()) return null
    const direction: InfiniteQueryFetchDirection = this.hasData() ? 'next' : 'initial'
    return this.fetchPage(direction, options)
  }

  async fetchPreviousPage(options?: FetchAbortSource): Promise<TPage | null> {
    if (!this.hasPreviousPage()) return null
    return this.fetchPage('previous', options)
  }

  async fetchPage(
    direction: InfiniteQueryFetchDirection,
    abortSource?: FetchAbortSource,
  ): Promise<TPage | null> {
    if (direction === 'next' && !this.hasNextPage()) return null
    if (direction === 'previous' && !this.hasPreviousPage()) return null

    const requestId = ++this.#requestId
    const abortHandle = createFetchAbortHandle(
      mergeFetchAbortSource(this.options, abortSource),
    )
    this.#abortController = abortHandle.controller
    this.#abortDispose = abortHandle.dispose
    const { controller: abortController, signal } = abortHandle

    const { initialPageParam, getNextPageParam, getPreviousPageParam } = this.definition.options
    const current = this.state.data
    let pageParam: TPageParam

    if (direction === 'initial') {
      pageParam = initialPageParam
    } else if (direction === 'next') {
      const lastPage = current!.pages[current!.pages.length - 1]!
      pageParam = getNextPageParam(lastPage, current!.pages) as TPageParam
    } else {
      const firstPage = current!.pages[0]!
      pageParam = getPreviousPageParam!(firstPage, current!.pages) as TPageParam
    }

    const lifecycleCtx = {
      params: this.params,
      queryKey: this.queryKey,
      queryClient: this.client,
    }

    this.#dispatch({ type: 'fetch', direction })
    this.$pendingCount.set(this.$pendingCount.peek() + 1)
    void runLifecycle(this.options, 'start', lifecycleCtx)

    this.#retryer = createRetryer<TPage>({
      fn: async () => {
        const page = await this.definition.options.queryFn({
          params: this.params,
          pageParam,
          signal,
          abortController,
          queryClient: this.client,
          queryKey: this.queryKey,
        })

        if (signal.aborted) {
          throw new CancelledError({ silent: true })
        }

        return page
      },
      onCancel: () => abortHandle.abort(),
      onFail: (failureCount, error) => {
        const err = (error instanceof Error ? error : new Error(String(error))) as Error
        this.#dispatch({ type: 'failed', failureCount, error: err as TError })
      },
      retry: this.options.retry,
      retryDelay: this.options.retryDelay,
    })

    try {
      const page = await this.#retryer.start()

      if (requestId !== this.#requestId) {
        return null
      }

      const nextData = this.#mergePage(direction, pageParam, page)
      this.#dispatch({ type: 'success', data: nextData })
      this.#cache.emit({
        type: 'infiniteQueryFetched',
        queryKey: this.queryKey,
        hash: this.queryHash,
      })
      await runLifecycle(this.options, 'success', { ...lifecycleCtx, data: nextData })
      await runLifecycle(this.options, 'settled', { ...lifecycleCtx, data: nextData })
      return page
    } catch (error) {
      if (requestId !== this.#requestId) {
        return null
      }

      if (isCancelledError(error)) {
        if (error.silent) {
          return null
        }
        throw error
      }

      const err = error instanceof Error ? error : new Error(String(error))
      this.#dispatch({ type: 'error', error: err as TError })
      await runLifecycle(this.options, 'error', { ...lifecycleCtx, error: err as TError })
      await runLifecycle(this.options, 'settled', { ...lifecycleCtx, error: err as TError })
      throw error
    } finally {
      if (requestId === this.#requestId) {
        this.$pendingCount.set(Math.max(0, this.$pendingCount.peek() - 1))
        this.#retryer = undefined
        this.#clearAbortHandle()
        this.scheduleGc(() => {
          if (this.observers.size === 0) this.#cache.remove(this)
        })
      }
    }
  }

  #clearAbortHandle(): void {
    this.#abortDispose?.()
    this.#abortDispose = undefined
    this.#abortController = undefined
  }

  onFocus(): void {
    if (this.isActive() && this.isStale() && this.options.refetchOnWindowFocus) {
      void this.refetch()
    }
  }

  onOnline(): void {
    if (this.isActive() && this.isStale() && this.options.refetchOnReconnect) {
      void this.refetch()
    }
  }

  #mergePage(
    direction: InfiniteQueryFetchDirection,
    pageParam: TPageParam,
    page: TPage,
  ): InfiniteQueryData<TPage, TPageParam> {
    const current = this.state.data

    if (direction === 'initial' || !current) {
      return { pages: [page], pageParams: [pageParam] }
    }

    if (direction === 'next') {
      return {
        pages: [...current.pages, page],
        pageParams: [...current.pageParams, pageParam],
      }
    }

    return {
      pages: [page, ...current.pages],
      pageParams: [pageParam, ...current.pageParams],
    }
  }

  #dispatch(action: InfiniteQueryAction<TPage, TPageParam, TError>): void {
    this.state = infiniteQueryReducer(this.state, action)
    this.syncSignals()
    this.#cache.emit({
      type: 'infiniteQueryUpdated',
      queryKey: this.queryKey,
      hash: this.queryHash,
    })
    for (const observer of this.observers) {
      observer.onInfiniteQueryUpdate()
    }
  }

  private syncSignals(): void {
    this.$data.set(this.state.data)
    this.$error.set(this.state.error)
    this.$status.set(this.state.status)
    this.$fetchStatus.set(this.state.fetchStatus)
    this.$updatedAt.set(this.state.dataUpdatedAt || null)
    this.$isInvalidated.set(this.state.isInvalidated)
    this.$fetchingNextPage.set(this.state.fetchingNextPage)
    this.$fetchingPreviousPage.set(this.state.fetchingPreviousPage)
  }
}
