import { signal } from '@echojs/reactivity'

import { CancelledError, isCancelledError } from './cancelled-error'
import { Removable } from './removable'
import { createRetryer } from './retryer'
import {
  defaultQueryState,
  isStaleByTime,
  queryReducer,
  type QueryAction,
  type QueryState,
} from './query-state'
import type { QueryCache } from './query-cache'
import type {
  QueryClient,
  QueryDefinition,
  QueryFetchStatus,
  QueryKey,
  QueryLifecycleContext,
  QueryStatus,
  ResolvedInstanceOptions,
} from '../types'
import { runLifecycle } from '../async/lifecycle'
import {
  abortWithReason,
  createFetchAbortHandle,
  mergeFetchAbortSource,
  type CancelOptions,
  type FetchAbortSource,
} from '../async/abort-control'
import { hashKey } from '../utils/hash'
import { functionalUpdate } from '../utils/functional-update'

export type QueryObserverLike = {
  onQueryUpdate(): void
}

export type QueryConfig<
  TData,
  TParams = void,
  TError = unknown,
  TQueryData = TData,
> = {
  client: QueryClient
  cache: QueryCache
  definition: QueryDefinition<TData, TParams, TError, TQueryData>
  params: TParams
  queryKey: QueryKey
  options: ResolvedInstanceOptions<TData, TParams, TError>
}

export class Query<TData, TParams = void, TError = unknown, TQueryData = TData> extends Removable {
  readonly queryKey: QueryKey
  readonly queryHash: string
  readonly definition: QueryDefinition<TData, TParams, TError, TQueryData>
  readonly client: QueryClient

  params: TParams
  options: ResolvedInstanceOptions<TData, TParams, TError>

  state: QueryState<TData, TError>
  observers: Set<QueryObserverLike> = new Set()

  readonly $data
  readonly $error
  readonly $status
  readonly $fetchStatus
  readonly $pendingCount
  readonly $updatedAt
  readonly $isInvalidated

  #retryer: ReturnType<typeof createRetryer<TData>> | undefined
  #abortController: AbortController | undefined
  #abortDispose: (() => void) | undefined
  #cache: QueryCache

  constructor(config: QueryConfig<TData, TParams, TError, TQueryData>) {
    super()
    this.client = config.client
    this.#cache = config.cache
    this.definition = config.definition
    this.params = config.params
    this.queryKey = config.queryKey
    this.queryHash = hashKey(config.queryKey)
    this.options = config.options

    this.state = defaultQueryState<TData, TError>()
    this.updateGcTime(this.options.cacheTimeMs)

    this.$data = signal<TData | undefined>(undefined)
    this.$error = signal<TError | null>(null)
    this.$status = signal<QueryStatus>('idle')
    this.$fetchStatus = signal<QueryFetchStatus>('idle')
    this.$pendingCount = signal(0)
    this.$updatedAt = signal<number | null>(null)
    this.$isInvalidated = signal(false)
  }

  get promise(): Promise<TData> | undefined {
    return this.#retryer?.promise
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

  isStaleByTime(staleTimeMs = this.options.staleTimeMs): boolean {
    return isStaleByTime(
      this.state.dataUpdatedAt,
      staleTimeMs,
      this.state.isInvalidated,
      this.state.data !== undefined,
    )
  }

  hasData(): boolean {
    return this.state.data !== undefined
  }

  addObserver(observer: QueryObserverLike): void {
    if (!this.observers.has(observer)) {
      this.observers.add(observer)
      this.clearGcTimeout()
    }
  }

  removeObserver(observer: QueryObserverLike): void {
    if (this.observers.delete(observer) && this.observers.size === 0) {
      this.scheduleGc(() => this.#cache.remove(this))
    }
  }

  setData(updater: TData | ((prev: TData | undefined) => TData | undefined)): TData | undefined {
    const next = functionalUpdate(updater, this.state.data)
    this.#dispatch({ type: 'success', data: next as TData })
    return next
  }

  invalidate(): void {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: 'invalidate' })
      this.#cache.emit({
        type: 'queryInvalidated',
        queryKey: this.queryKey,
        hash: this.queryHash,
      })
    }
  }

  getAbortController(): AbortController | undefined {
    return this.#abortController
  }

  getAbortSignal(): AbortSignal | undefined {
    return this.#abortController?.signal
  }

  cancel(options?: CancelOptions): Promise<void> {
    abortWithReason(this.#abortController, options?.reason)
    const promise = this.#retryer?.promise
    this.#retryer?.cancel(options)
    this.#retryer = undefined
    this.#clearAbortHandle()
    this.#dispatch({ type: 'setState', state: { fetchStatus: 'idle' } })
    return promise ? promise.then(() => undefined).catch(() => undefined) : Promise.resolve()
  }

  async fetch(
    options?: { cancelRefetch?: boolean } & FetchAbortSource,
  ): Promise<TData> {
    if (
      this.state.fetchStatus !== 'idle' &&
      this.#retryer &&
      this.state.data !== undefined
    ) {
      if (options?.cancelRefetch) {
        await this.cancel({ silent: true })
      } else {
        return this.#retryer.promise
      }
    }

    const abortHandle = createFetchAbortHandle(
      mergeFetchAbortSource(this.options, options),
    )
    this.#abortController = abortHandle.controller
    this.#abortDispose = abortHandle.dispose
    const { controller: abortController, signal } = abortHandle
    const lifecycleCtx: QueryLifecycleContext<TData, TParams, TError> = {
      params: this.params,
      queryKey: this.queryKey,
      queryClient: this.client,
    }

    this.#dispatch({ type: 'fetch' })
    this.$pendingCount.set(this.$pendingCount.peek() + 1)
    void runLifecycle(this.options, 'start', lifecycleCtx)

    this.#retryer = createRetryer<TData>({
      fn: async () => {
        const raw: TQueryData = await this.definition.options.queryFn({
          params: this.params,
          signal,
          abortController,
          queryClient: this.client,
          queryKey: this.queryKey,
        })

        if (signal.aborted) {
          throw new CancelledError({ silent: true })
        }

        const transform = this.definition.options.transform
        return transform ? await transform(raw) : (raw as unknown as TData)
      },
      onCancel: () => abortHandle.abort(),
      onFail: (failureCount, error) => {
        const err = (error instanceof Error ? error : new Error(String(error))) as Error
        this.#dispatch({
          type: 'failed',
          failureCount,
          error: err as TError,
        })
      },
      retry: this.options.retry,
      retryDelay: this.options.retryDelay,
    })

    try {
      const data = await this.#retryer.start()
      this.#dispatch({ type: 'success', data })
      this.#cache.emit({
        type: 'queryFetched',
        queryKey: this.queryKey,
        hash: this.queryHash,
        data,
      })
      await runLifecycle(this.options, 'success', { ...lifecycleCtx, data })
      await runLifecycle(this.options, 'settled', { ...lifecycleCtx, data })
      return data
    } catch (error) {
      if (isCancelledError(error)) {
        if (error.silent) {
          return this.state.data as TData
        }
        throw error
      }
      const err = error instanceof Error ? error : new Error(String(error))
      this.#dispatch({ type: 'error', error: err as TError })
      await runLifecycle(this.options, 'error', { ...lifecycleCtx, error: err as TError })
      await runLifecycle(this.options, 'settled', { ...lifecycleCtx, error: err as TError })
      throw error
    } finally {
      this.$pendingCount.set(Math.max(0, this.$pendingCount.peek() - 1))
      this.#retryer = undefined
      this.#clearAbortHandle()
      this.scheduleGc(() => {
        if (this.observers.size === 0) this.#cache.remove(this)
      })
    }
  }

  #clearAbortHandle(): void {
    this.#abortDispose?.()
    this.#abortDispose = undefined
    this.#abortController = undefined
  }

  onFocus(): void {
    if (this.isActive() && this.isStale() && this.options.refetchOnWindowFocus) {
      void this.fetch()
    }
  }

  onOnline(): void {
    if (this.isActive() && this.isStale() && this.options.refetchOnReconnect) {
      void this.fetch()
    }
  }

  #dispatch(action: QueryAction<TData, TError>): void {
    this.state = queryReducer(this.state, action)
    this.syncSignals()
    this.#cache.emit({
      type: 'queryUpdated',
      queryKey: this.queryKey,
      hash: this.queryHash,
    })
    for (const observer of this.observers) {
      observer.onQueryUpdate()
    }
  }

  private syncSignals(): void {
    this.$data.set(this.state.data)
    this.$error.set(this.state.error)
    this.$status.set(this.state.status)
    this.$fetchStatus.set(this.state.fetchStatus)
    this.$updatedAt.set(this.state.dataUpdatedAt || null)
    this.$isInvalidated.set(this.state.isInvalidated)
  }
}
