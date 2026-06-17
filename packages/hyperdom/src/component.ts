import type { ModelFactoryFn } from "./create-model.types";
import type { Child } from "./types";
export type ViewFn<VM> = (vm: VM) => Child;

export type CreateComponentOptions = {
  /** Debug label (e.g. "Counter" → Counter.displayName). */
  name?: string;
};

const labelComponent = (fn: () => Child, name?: string): (() => Child) => {
  if (!name) return fn;
  return Object.assign(fn, { displayName: name });
};

/**
 * Binds a model factory and view into a callable component.
 *
 * @example No props
 * ```ts
 * export const Counter = createComponent(createCounterModel, CounterView);
 * // route: view: () => Counter()
 * ```
 *
 * @example With props — pass the bound model factory
 * ```ts
 * export const CodeBlock = (props: Props) =>
 *   createComponent(createCodeBlockModel(props), CodeBlockView)();
 * ```
 */
export const createComponent = <VM>(
  model: ModelFactoryFn<VM>,
  view: ViewFn<VM>,
  options?: CreateComponentOptions,
): (() => Child) =>
  labelComponent((): Child => {
    const vm = model();
    return view(vm);
  }, options?.name);
