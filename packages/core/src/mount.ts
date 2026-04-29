import { scope, effect } from "@echojs-ecosystem/reactivity";
import type { Signal } from "@echojs-ecosystem/reactivity";
import { isSignalish, isFunction, isArray } from "./internals/utils";
import type { JSXElement } from "./types";

export interface MountResult {
  node: Node;
  dispose: () => void;
}

export const mount = (container: Node, content: JSXElement): MountResult => {
  const disposers: Array<() => void> = [];

  const dispose = (): void => {
    for (let i = disposers.length - 1; i >= 0; i--) {
      try {
        disposers[i]?.();
      } catch {
        // Ignore cleanup errors
      }
    }
  };

  let node: Node;

  const cleanupScope = scope(() => {
    if (content instanceof DocumentFragment) {
      const firstChild = content.firstChild;
      if (content.childNodes.length === 1 && firstChild) {
        node = firstChild;
      } else {
        node = content;
      }
    } else if (content instanceof Node) {
      node = content;
    } else if (isSignalish(content)) {
      const initialValue = (content as Signal<unknown>).value();
      node = document.createTextNode(String(initialValue ?? ""));

      const disposeEffect = effect(() => {
        const value = (content as Signal<unknown>).value();
        node.nodeValue = String(value ?? "");
      });

      disposers.push(disposeEffect);
    } else if (isFunction(content)) {
      const initialValue = (content as () => unknown)();
      node = document.createTextNode(String(initialValue ?? ""));

      const disposeEffect = effect(() => {
        const value = (content as () => unknown)();
        node.nodeValue = String(value ?? "");
      });

      disposers.push(disposeEffect);
    } else if (isArray(content)) {
      const fragment = document.createDocumentFragment();
      for (const item of content) {
        if (item === null || item === undefined) continue;

        if (item instanceof Node) {
          fragment.appendChild(item);
        } else if (isSignalish(item)) {
          const textNode = document.createTextNode("");
          fragment.appendChild(textNode);

          const disposeEffect = effect(() => {
            const value = (item as Signal<unknown>).value();
            textNode.nodeValue = String(value ?? "");
          });

          disposers.push(disposeEffect);
        } else if (isFunction(item)) {
          const textNode = document.createTextNode("");
          fragment.appendChild(textNode);

          const disposeEffect = effect(() => {
            const value = (item as () => unknown)();
            textNode.nodeValue = String(value ?? "");
          });

          disposers.push(disposeEffect);
        } else {
          fragment.appendChild(document.createTextNode(String(item)));
        }
      }

      const firstChild = fragment.firstChild;
      if (fragment.childNodes.length === 1 && firstChild) {
        node = firstChild;
      } else {
        node = fragment;
      }
    } else {
      node = document.createTextNode(String(content ?? ""));
    }
  });

  disposers.push(cleanupScope);

  if (node! instanceof DocumentFragment) {
    container.appendChild(node);
  } else {
    container.appendChild(node!);
  }

  return { node: node!, dispose };
};

export const unmount = (node: Node): void => {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }

  const dispose = (node as unknown as Record<string, (() => void) | undefined>).__echoDispose;
  if (isFunction(dispose)) {
    dispose();
  }

  const ifProcessor = (
    node as unknown as Record<string, ((container: Node) => () => void) | undefined>
  ).__echoIfProcessor;
  if (isFunction(ifProcessor)) {
    const result = ifProcessor(node.parentNode || document.createDocumentFragment());
    if (isFunction(result)) {
      result();
    }
  }
};

export const render = (content: JSXElement): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  mount(fragment, content);
  return fragment;
};

export const renderToString = (content: JSXElement): string => {
  const fragment = render(content);
  const wrapper = document.createElement("div");
  wrapper.appendChild(fragment.cloneNode(true));
  return wrapper.innerHTML;
};

export const createRoot = (
  container: Node,
): {
  mount: (content: JSXElement) => MountResult;
  unmount: () => void;
} => {
  let currentResult: MountResult | null = null;

  return {
    mount: (content: JSXElement): MountResult => {
      if (currentResult) {
        unmount(currentResult.node);
        currentResult.dispose();
      }

      currentResult = mount(container, content);
      return currentResult;
    },

    unmount: (): void => {
      if (currentResult) {
        unmount(currentResult.node);
        currentResult.dispose();
        currentResult = null;
      }
    },
  };
};
