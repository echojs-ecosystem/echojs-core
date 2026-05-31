export type AbortInput = AbortController | AbortSignal | (() => AbortController | AbortSignal)

export type FetchAbortSource = {
  abortController?: AbortInput
  signal?: AbortInput
}

export type FetchAbortHandle = {
  readonly controller: AbortController
  readonly signal: AbortSignal
  /** `false` when user passed their own AbortController */
  readonly ownsController: boolean
  abort(reason?: unknown): void
  dispose(): void
}

export type CancelOptions = {
  silent?: boolean
  reason?: unknown
}

export const resolveAbortInput = (
  input?: AbortInput,
): AbortController | AbortSignal | undefined => {
  if (!input) return undefined
  if (typeof input === 'function') return input()
  return input
}

export const abortWithReason = (
  controller: AbortController | undefined,
  reason?: unknown,
): void => {
  if (!controller || controller.signal.aborted) return
  try {
    controller.abort(reason)
  } catch {
    controller.abort()
  }
}

const linkSignal = (source: AbortSignal, target: AbortController): (() => void) => {
  if (source.aborted) {
    abortWithReason(target, source.reason)
    return () => {}
  }

  const listener = () => abortWithReason(target, source.reason)
  source.addEventListener('abort', listener, { once: true })
  return () => source.removeEventListener('abort', listener)
}

export const mergeFetchAbortSource = (
  ...sources: (FetchAbortSource | undefined)[]
): FetchAbortSource => {
  let abortController: AbortInput | undefined
  let signal: AbortInput | undefined

  for (const source of sources) {
    if (!source) continue
    if (source.abortController !== undefined) abortController = source.abortController
    if (source.signal !== undefined) signal = source.signal
  }

  return { abortController, signal }
}

/** Creates the effective AbortController/signal for one fetch or mutation run. */
export const createFetchAbortHandle = (source?: FetchAbortSource): FetchAbortHandle => {
  const controllerInput = resolveAbortInput(source?.abortController)
  const signalInput = resolveAbortInput(source?.signal)
  const unlinks: (() => void)[] = []

  let controller: AbortController
  let ownsController: boolean

  if (controllerInput instanceof AbortController) {
    controller = controllerInput
    ownsController = false
  } else if (controllerInput instanceof AbortSignal) {
    controller = new AbortController()
    ownsController = true
    unlinks.push(linkSignal(controllerInput, controller))
  } else {
    controller = new AbortController()
    ownsController = true
  }

  if (signalInput) {
    const external =
      signalInput instanceof AbortSignal ? signalInput : signalInput.signal
    if (external !== controller.signal) {
      unlinks.push(linkSignal(external, controller))
    }
  }

  return {
    controller,
    signal: controller.signal,
    ownsController,
    abort: (reason) => abortWithReason(controller, reason),
    dispose: () => {
      for (const unlink of unlinks) unlink()
    },
  }
}
