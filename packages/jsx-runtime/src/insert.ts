import { effect, cleanup } from "@echojs-ecosystem/reactivity";
import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import {
  isSignalish,
  isArray,
  isFunction,
  isNullOrUndefined,
  isString,
  isNumber,
} from "./internals/utils.js";
import { createTextNode, createReactiveText } from "./text.js";
import type { JSXElement } from "./types.js";

type DOMNode = Node;
type CleanupFn = () => void;

const isNode = (value: unknown): value is Node => value instanceof Node;

const toNode = (value: unknown): Node => {
  if (isNode(value)) return value;
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

const insertArray = (parent: Node, children: unknown[], marker: Node | null): CleanupFn => {
  const disposers: CleanupFn[] = [];
  const nodes: Node[] = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (isSignalish(child)) {
      const placeholder = document.createTextNode("");
      if (marker && marker.parentNode === parent) {
        parent.insertBefore(placeholder, marker);
      } else {
        parent.appendChild(placeholder);
      }
      nodes.push(placeholder);

      const dispose = effect(() => {
        const value = (child as Signal<unknown>).value();
        const newNode = toNode(value);

        if (placeholder.parentNode === parent) {
          parent.replaceChild(newNode, placeholder);
        }

        const idx = nodes.indexOf(placeholder);
        if (idx !== -1) {
          nodes[idx] = newNode;
        }
      });

      disposers.push(dispose);
    } else if (isFunction(child)) {
      const placeholder = document.createTextNode("");
      if (marker && marker.parentNode === parent) {
        parent.insertBefore(placeholder, marker);
      } else {
        parent.appendChild(placeholder);
      }
      nodes.push(placeholder);

      const dispose = effect(() => {
        const value = (child as () => unknown)();
        const newNode = toNode(value);

        if (placeholder.parentNode === parent) {
          parent.replaceChild(newNode, placeholder);
        }

        const idx = nodes.indexOf(placeholder);
        if (idx !== -1) {
          nodes[idx] = newNode;
        }
      });

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
    const textNode = createReactiveText(value as Signal<unknown>);
    if (marker && marker.parentNode === parent) {
      parent.insertBefore(textNode, marker);
    } else {
      parent.appendChild(textNode);
    }
    return;
  }

  if (isFunction(value)) {
    const textNode = createReactiveText(value as () => unknown);
    if (marker && marker.parentNode === parent) {
      parent.insertBefore(textNode, marker);
    } else {
      parent.appendChild(textNode);
    }
    return;
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
