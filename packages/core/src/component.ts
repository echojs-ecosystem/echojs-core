import { scope, cleanup, effect, signal, computed } from "@echojs-ecosystem/reactivity";
import type { Signal, ReadonlySignal } from "@echojs-ecosystem/reactivity";
import { isFunction, isObject } from "./internals/utils.js";
import type { JSXElement, JSXComponent, ComponentVM, ViewFn, ModelContext, ModelResult } from "./types.js";

export interface Component<VM> {
  (props?: Record<string, unknown>): JSXElement;
  __type: "echo-component";
  __vm: VM | null;
  __view: ViewFn<VM>;
  [COMPONENT_BRAND]: boolean;
}

const COMPONENT_BRAND = Symbol.for("echo.component");

// Контекст для создания модели
export interface ModelContextType {
  signal: typeof signal;
  computed: typeof computed;
  effect: typeof effect;
  cleanup: typeof cleanup;
  batch: <T>(fn: () => T) => T;
  props: Record<string, unknown>;
}

// Тип для функции модели
export type ModelFn<VM> = (ctx: ModelContextType) => VM;

// Опции для createModel
export interface CreateModelOptions {
  props?: Record<string, unknown>;
}

/**
 * Создает модель (ViewModel) с signals, effects и т.д.
 * Возвращает объект с данными и методами для компонента
 */
export const createModel = <VM>(
  modelFn: ModelFn<VM>
): (() => VM) => {
  return (): VM => {
    const context: ModelContextType = {
      signal,
      computed,
      effect,
      cleanup,
      batch: <T>(fn: () => T): T => fn(),
      props: {},
    };

    let vm: VM | null = null;

    const disposer = scope(() => {
      vm = modelFn(context);
    });

    // Сохраняем disposer для очистки
    if (vm && isObject(vm)) {
      (vm as Record<string, unknown>).__dispose = disposer;
    }

    if (!vm) {
      throw new Error("Model function must return an object");
    }

    return vm;
  };
};

/**
 * Создает view функцию для рендеринга JSX
 * Принимает ViewModel и возвращает JSX элемент
 */
export const createView = <VM>(
  viewFn: ViewFn<VM>
): ViewFn<VM> => {
  return (vm: VM): JSXElement => {
    // View рендеринг должен происходить внутри scope для работы cleanup
    let result: JSXElement;
    const disposer = scope(() => {
      result = viewFn(vm);
    });

    // Сохраняем disposer на результате для очистки
    if (result! instanceof Node) {
      (result as unknown as Record<string, (() => void) | null>).__echoDispose = disposer;
    }

    return result!;
  };
};

/**
 * Комбинирует model и view в полноценный компонент
 * Использует createModel и createView внутри
 */
export const createComponent = <VM>(
  modelOrFn: ModelFn<VM> | (() => VM),
  view: ViewFn<VM>
): JSXComponent<Record<string, unknown>> => {
  const ComponentFn = (props: Record<string, unknown> = {}): JSXElement => {
    let disposeComponent: (() => void) | null = null;
    let mounted = false;

    const renderComponent = (): JSXElement => {
      let vm: VM | null = null;

      const disposer = scope(() => {
        if (isFunction(modelOrFn) && modelOrFn.length === 1) {
          // Если функция принимает 1 аргумент (context), используем createModel
          const context: ModelContextType = {
            signal,
            computed,
            effect,
            cleanup,
            batch: <T>(fn: () => T): T => fn(),
            props,
          };
          vm = (modelOrFn as ModelFn<VM>)(context);
        } else {
          // Иначе просто вызываем как функцию
          vm = (modelOrFn as () => VM)();
        }

        if (isObject(vm) && isObject(props)) {
          for (const [key, value] of Object.entries(props)) {
            if (!(key in (vm as Record<string, unknown>))) {
              (vm as Record<string, unknown>)[key] = value;
            }
          }
        }
      });

      disposeComponent = disposer;

      if (!vm) {
        throw new Error("ViewModel must return an object");
      }

      const result = view(vm);

      mounted = true;

      return result;
    };

    const result = renderComponent();

    if (result instanceof DocumentFragment) {
      const marker = document.createTextNode("");
      result.appendChild(marker);

      const originalDispose = disposeComponent as (() => void) | null;
      disposeComponent = () => {
        if (originalDispose !== null && typeof originalDispose === "function") {
          originalDispose();
        }
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      };
    }

    if (result instanceof Node) {
      (result as unknown as Record<string, (() => void) | null>).__echoDispose = disposeComponent;
    }

    return result;
  };

  const typedComponent = ComponentFn as unknown as Component<VM>;
  typedComponent.__type = "echo-component";
  typedComponent.__vm = null;
  typedComponent.__view = view;
  typedComponent[COMPONENT_BRAND] = true;

  return ComponentFn as unknown as JSXComponent<Record<string, unknown>>;
};

export const isComponent = (value: unknown): boolean => {
  if (!isFunction(value)) return false;
  const brandedValue = value as unknown as Record<symbol, boolean>;
  return brandedValue[COMPONENT_BRAND] === true;
};

export const getComponentDispose = (node: Node): (() => void) | null => {
  const dispose = (node as unknown as Record<string, (() => void) | null>).__echoDispose;
  return isFunction(dispose) ? dispose : null;
};
