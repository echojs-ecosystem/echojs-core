import { scope, cleanup } from "@echojs-ecosystem/reactivity";
import { isFunction, isObject } from "./internals/utils.js";
import type { JSXElement, ComponentVM, ViewModelFn, ViewFn } from "./types.js";

export interface Component<VM extends ComponentVM> {
  (props?: Record<string, unknown>): JSXElement;
  __type: "echo-component";
  __vm: VM | null;
  __view: ViewFn<VM>;
  [COMPONENT_BRAND]: boolean;
}

const COMPONENT_BRAND = Symbol.for("echo.component");

export const createComponent = <VM extends ComponentVM>(
  viewModel: ViewModelFn<VM>,
  view: ViewFn<VM>,
): ((props?: Record<string, unknown>) => JSXElement) => {
  const ComponentFn = (props: Record<string, unknown> = {}): JSXElement => {
    let disposeComponent: (() => void) | null = null;
    let mounted = false;

    const renderComponent = (): JSXElement => {
      let vm: VM | null = null;

      const disposer = scope(() => {
        vm = viewModel();

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

  return ComponentFn;
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
