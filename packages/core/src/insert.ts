import { effect, scope } from "@echojs-ecosystem/reactivity";
import type { Signal } from "@echojs-ecosystem/reactivity";
import {
  isSignalish,
  isArray,
  isFunction,
  isNullOrUndefined,
  isString,
  isNumber,
} from "./internals/utils";
import { createTextNode } from "./text";
import type { JSXElement } from "./types";

type DOMNode = Node;
type CleanupFn = () => void;

const isNode = (value: unknown): value is Node => value instanceof Node;

const toNode = (value: unknown): Node => {
  if (isNode(value)) return value;
  if (isArray(value)) {
    return createFragment(value);
  }
  if (isString(value) || isNumber(value)) {
    return createTextNode(value);
  }
  return createTextNode("");
};

const clearNode = (node: Node): void => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

const insertSingleNode = (
  parent: Node,
  value: unknown,
  marker: Node | null,
  replace: boolean,
): Node | null => {
  const node = toNode(value);

  if (replace && marker && marker.parentNode === parent) {
    parent.replaceChild(node, marker);
  } else if (marker && marker.parentNode === parent) {
    parent.insertBefore(node, marker);
  } else {
    parent.appendChild(node);
  }

  return node;
};

const createFragment = (children: unknown[]): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  for (const child of children) {
    if (!isNullOrUndefined(child)) {
      fragment.appendChild(toNode(child));
    }
  }
  return fragment;
};

const insertDynamic = (parent: Node, getValue: () => unknown, marker: Node | null): CleanupFn => {
  // IMPORTANT:
  // We can't rely on replaceChild(toNode(nextValue), currentNode) when nextValue can be an array.
  // Arrays are converted to DocumentFragment, and fragments are "consumed" on insertion (no parentNode),
  // which breaks subsequent updates. Instead, manage a stable range with start/end markers.
  const start = document.createTextNode("");
  const end = document.createTextNode("");

  if (marker && marker.parentNode === parent) {
    parent.insertBefore(start, marker);
    parent.insertBefore(end, marker);
  } else {
    parent.appendChild(start);
    parent.appendChild(end);
  }

  const clearRange = () => {
    let node = start.nextSibling;
    while (node && node !== end) {
      const next = node.nextSibling;
      parent.removeChild(node);
      node = next;
    }
  };

  let disposeSubtree: CleanupFn | null = null;

  const disposeEffect = effect(() => {
    // Dispose предыдущего поддерева (и его cleanup'ов)
    if (disposeSubtree) {
      try {
        disposeSubtree();
      } catch {
        // ignore
      }
      disposeSubtree = null;
    }

    // ВАЖНО: ВСЁ делаем внутри scope() - и чтение сигналов, и создание DOM.
    // effectScope из alien-signals не отключает трекинг, он только создаёт scope для cleanup.
    // Так что чтение сигналов внутри scope() всё равно будет tracked.
    const disposeScope = scope(() => {
      clearRange();
      const nextValue = getValue();
      insert(parent, nextValue as JSXElement, end);
    });

    // DisposeScope освобождает cleanup'и, зарегистрированные в этом пересчёте
    disposeSubtree = disposeScope;
  });

  return () => {
    if (disposeSubtree) {
      disposeSubtree();
      disposeSubtree = null;
    }
    clearRange();
    if (start.parentNode === parent) parent.removeChild(start);
    if (end.parentNode === parent) parent.removeChild(end);
    disposeEffect();
  };
};

const insertArray = (parent: Node, children: unknown[], marker: Node | null): CleanupFn => {
  const disposers: CleanupFn[] = [];
  const nodes: Node[] = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (isSignalish(child)) {
      const dispose = insertDynamic(parent, () => (child as Signal<unknown>).value(), marker);
      disposers.push(dispose);
    } else if (isFunction(child)) {
      const dispose = insertDynamic(parent, child as () => unknown, marker);
      disposers.push(dispose);
    } else if (isArray(child)) {
      const innerMarker = document.createTextNode("");
      if (marker && marker.parentNode === parent) {
        parent.insertBefore(innerMarker, marker);
      } else {
        parent.appendChild(innerMarker);
      }
      nodes.push(innerMarker);

      const dispose = insertArray(parent, child, innerMarker);
      disposers.push(dispose);
    } else if (!isNullOrUndefined(child)) {
      const node = toNode(child);
      if (marker && marker.parentNode === parent) {
        parent.insertBefore(node, marker);
      } else {
        parent.appendChild(node);
      }
      nodes.push(node);
    }
  }

  return () => {
    for (const dispose of disposers) {
      dispose();
    }
  };
};

export const insert = (
  parent: Node,
  value: JSXElement,
  marker: Node | null = null,
): (() => void) | void => {
  if (isNullOrUndefined(value)) {
    return;
  }

  if (isSignalish(value)) {
    return insertDynamic(parent, () => (value as Signal<unknown>).value(), marker);
  }

  if (isFunction(value)) {
    return insertDynamic(parent, value as () => unknown, marker);
  }

  if (isArray(value)) {
    return insertArray(parent, value, marker);
  }

  if (isNode(value)) {
    if (marker && marker.parentNode === parent) {
      parent.insertBefore(value, marker);
    } else {
      parent.appendChild(value);
    }
    return;
  }

  const textNode = createTextNode(value);
  if (marker && marker.parentNode === parent) {
    parent.insertBefore(textNode, marker);
  } else {
    parent.appendChild(textNode);
  }
};

export const insertBefore = (
  parent: Node,
  value: JSXElement,
  marker: Node,
): (() => void) | void => {
  return insert(parent, value, marker);
};

export const appendChildren = (parent: Node, children: JSXElement): (() => void) | void => {
  return insert(parent, children, null);
};
