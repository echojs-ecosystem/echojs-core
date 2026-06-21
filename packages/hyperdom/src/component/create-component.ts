import { scope } from "@echojs-ecosystem/reactivity";

import { runInModelLifecycle } from "../model/create-model";
import type { ModelFactoryFn } from "../model/create-model.types";
import type { Child } from "../core/types";
import { onCleanup } from "../lifecycle/cleanup";
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
    let vm: VM | null = null;
    let disposeModel: (() => void) | null = null;

    const ensureModel = (): VM => {
      if (vm) return vm;

      disposeModel = scope(() => {
        runInModelLifecycle(() => {
          vm = model();
        });
      });

      onCleanup(() => {
        disposeModel?.();
        disposeModel = null;
        vm = null;
      });

      return vm!;
    };

    return () => view(ensureModel());
  }, options?.name);
