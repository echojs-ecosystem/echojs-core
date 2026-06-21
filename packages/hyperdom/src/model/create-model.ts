import type {
  CreateModelOptions,
  ModelFactory,
} from './create-model.types'

export type {
  CreateModelOptions,
  ModelFactory,
  ModelFactoryFn,
  ModelSection,
  ModelSectionRecord,
  StructuredModelShape,
} from './create-model.types'

let modelDepth = 0
let modelLifecycleDepth = 0

/** Returns true while a `createModel(...)` factory is executing. */
export const isInModelContext = (): boolean => modelDepth > 0

/** Returns true while a model factory runs inside an active model lifecycle scope. */
export const isInModelLifecycleContext = (): boolean =>
  modelLifecycleDepth > 0 && modelDepth > 0

/** @internal Used by {@link createComponent} to mark model lifecycle scope. */
export const runInModelLifecycle = <T>(fn: () => T): T => {
  modelLifecycleDepth++
  try {
    return fn()
  } finally {
    modelLifecycleDepth--
  }
}

const wrapModelFactory = <VM>(factory: () => VM, name: string): ModelFactory<VM> => {
  const make = (): VM => {
    modelDepth++
    try {
      return factory()
    } finally {
      modelDepth--
    }
  }

  return Object.assign(make, { displayName: name })
}

/**
 * Wraps a model factory to mark "model construction context".
 *
 * @example Flat exports (default)
 * ```ts
 * createModel(() => ({ count: () => 0, increment: () => {} }), 'CounterModel')
 * ```
 *
 * @example Structured exports
 * ```ts
 * createModel(
 *   () => ({
 *     state: { count: () => 0 },
 *     functions: { increment: () => {} },
 *   }),
 *   { name: 'CounterModel', structExports: true },
 * )
 * ```
 */
export function createModel<VM>(
  factory: () => VM,
  nameOrOptions: string | CreateModelOptions,
): ModelFactory<VM> {
  const name = typeof nameOrOptions === 'string' ? nameOrOptions : nameOrOptions.name
  return wrapModelFactory(factory, name)
}
