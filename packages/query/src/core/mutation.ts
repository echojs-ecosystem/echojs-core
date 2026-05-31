import { computed, signal } from '@echojs/reactivity'

import {
  abortWithReason,
  createFetchAbortHandle,
  mergeFetchAbortSource,
  type CancelOptions,
} from '../async/abort-control'
import { isAbortError, isCancelledError } from './cancelled-error'
import { createRetryer } from './retryer'
import type { MutationCache } from './mutation-cache'
import type {
  MutationDefinition,
  MutationInstance,
  MutationRunOptions,
  MutationStatus,
  QueryClient,
} from '../types'

let mutationIdCounter = 0

export const resetMutationIdCounter = (): void => {
  mutationIdCounter = 0
}

export class Mutation<
  TData,
  TVariables,
  TError = unknown,
  TRollback = unknown,
> {
  readonly id: number
  readonly definition: MutationDefinition<TData, TVariables, TError, TRollback>
  readonly client: QueryClient
  readonly cache: MutationCache

  readonly $data
  readonly $error
  readonly $variables
  readonly $status
  readonly $pendingCount

  #abortController: AbortController | undefined
  #abortDispose: (() => void) | undefined

  constructor(
    definition: MutationDefinition<TData, TVariables, TError, TRollback>,
    client: QueryClient,
    cache: MutationCache,
  ) {
    mutationIdCounter += 1
    this.id = mutationIdCounter
    this.definition = definition
    this.client = client
    this.cache = cache

    this.$data = signal<TData | undefined>(undefined)
    this.$error = signal<TError | null>(null)
    this.$variables = signal<TVariables | undefined>(undefined)
    this.$status = signal<MutationStatus>('idle')
    this.$pendingCount = signal(0)
  }

  getAbortController(): AbortController | undefined {
    return this.#abortController
  }

  getAbortSignal(): AbortSignal | undefined {
    return this.#abortController?.signal
  }

  async run(variables: TVariables, runOptions?: MutationRunOptions): Promise<TData> {
    const abortHandle = createFetchAbortHandle(
      mergeFetchAbortSource(this.definition.options, runOptions),
    )
    this.#abortController = abortHandle.controller
    this.#abortDispose = abortHandle.dispose
    const { controller: abortController, signal } = abortHandle

    this.$variables.set(variables)
    this.$status.set('pending')
    this.$pendingCount.set(this.$pendingCount.peek() + 1)

    this.cache.emit({ type: 'mutationAdded', mutationId: this.id })

    let rollback: TRollback | undefined

    const lifecycleCtx = {
      variables,
      queryClient: this.client,
    }

    try {
      const mutateResult = await this.definition.options.onMutate?.({
        ...lifecycleCtx,
      })
      if (typeof mutateResult !== 'undefined') {
        rollback = mutateResult as TRollback
      }

      const retryer = createRetryer<TData>({
        fn: () =>
          this.definition.options.mutationFn({
            variables,
            signal,
            abortController,
            queryClient: this.client,
          }),
        onCancel: () => abortHandle.abort(),
        retry: this.definition.options.retry,
        retryDelay: this.definition.options.retryDelay,
      })

      const data = await retryer.start()

      this.$data.set(data)
      this.$error.set(null)
      this.$status.set('success')

      this.definition.options.onSuccess?.({
        ...lifecycleCtx,
        data,
        rollback,
      })

      this.cache.emit({ type: 'mutationUpdated', mutationId: this.id })
      return data
    } catch (error) {
      if (!isCancelledError(error) && !isAbortError(error)) {
        const err = error instanceof Error ? error : new Error(String(error))
        this.$error.set(err as TError)
        this.$status.set('error')

        this.definition.options.onError?.({
          ...lifecycleCtx,
          error: err as TError,
          rollback,
        })
      }
      throw error
    } finally {
      this.$pendingCount.set(Math.max(0, this.$pendingCount.peek() - 1))
      this.#clearAbortHandle()

      this.definition.options.onSettled?.({
        ...lifecycleCtx,
        data: this.$data.peek() as TData | undefined,
        error: this.$error.peek() as TError | null,
        rollback,
      })

      this.cache.emit({ type: 'mutationUpdated', mutationId: this.id })
    }
  }

  cancel(options?: CancelOptions): void {
    abortWithReason(this.#abortController, options?.reason)
  }

  #clearAbortHandle(): void {
    this.#abortDispose?.()
    this.#abortDispose = undefined
    this.#abortController = undefined
  }

  reset(): void {
    this.$data.set(undefined)
    this.$error.set(null)
    this.$variables.set(undefined)
    this.$status.set('idle')
    this.$pendingCount.set(0)
  }

  toInstance(): MutationInstance<TData, TVariables, TError> {
    const mutation = this

    const $data = computed((): TData | undefined => mutation.$data.value() as TData | undefined)
    const $error = computed((): TError | null => mutation.$error.value() as TError | null)
    const $variables = computed(
      (): TVariables | undefined => mutation.$variables.value() as TVariables | undefined,
    )
    const $status = computed((): MutationStatus => mutation.$status.value())
    const $pendingCount = computed(() => mutation.$pendingCount.value())
    const $abortSignal = computed((): AbortSignal | null => mutation.getAbortSignal() ?? null)

    return {
      kind: 'mutation-instance',
      run: (variables, options) => mutation.run(variables, options),
      reset: () => mutation.reset(),
      cancel: (options) => mutation.cancel(options),
      abort: (reason) => mutation.cancel({ reason }),
      abortController: () => mutation.getAbortController() ?? null,
      abortSignal: () => mutation.getAbortSignal() ?? null,
      data: () => $data.value() as TData | undefined,
      error: () => $error.value() as TError | null,
      variables: () => $variables.value() as TVariables | undefined,
      status: () => $status.value(),
      pending: () => $status.value() === 'pending',
      isPending: () => $status.value() === 'pending',
      isSuccess: () => $status.value() === 'success',
      isError: () => $status.value() === 'error',
      isIdle: () => $status.value() === 'idle',
      $data,
      $error,
      $variables,
      $status,
      $pendingCount,
      $abortSignal,
    }
  }
}
