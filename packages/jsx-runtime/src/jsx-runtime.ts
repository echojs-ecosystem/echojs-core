import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import {
  isSignalish,
  isFunction,
  isString,
  isObject,
  isNullOrUndefined,
  isArray,
} from "./internals/utils.js";
import { createElement, setProp } from "./element.js";
import { setEvents, setEvent } from "./events.js";
import { insert } from "./insert.js";
import { createReactiveText } from "./text.js";
import { applyShowDirective } from "./directives/show.js";
import { _$if } from "./directives/if.js";
import type { JSXElement, JSXProps, JSXComponent, Signalish } from "./types.js";

export const Fragment = (props: { children?: JSXElement }): JSXElement => {
  const fragment = document.createDocumentFragment();

  if (props.children) {
    insert(fragment, props.children, null);
  }

  return fragment;
};

const processChildren = (children: JSXElement): JSXElement => {
  if (isNullOrUndefined(children)) {
    return null;
  }

  if (isSignalish(children)) {
    return createReactiveText(children as Signal<unknown>);
  }

  if (isFunction(children)) {
    return createReactiveText(children as () => unknown);
  }

  if (isArray(children)) {
    const fragment = document.createDocumentFragment();
    for (const child of children) {
      const processed = processChildren(child);
      if (processed !== null && processed !== undefined) {
        fragment.appendChild(
          processed instanceof Node ? processed : document.createTextNode(String(processed)),
        );
      }
    }
    return fragment;
  }

  if (children instanceof Node) {
    return children;
  }

  return String(children);
};

const collectElseBranches = (
  children: JSXElement[],
  startIndex: number,
): { elseNode: (() => JSXElement) | null; consumedCount: number } => {
  const elseBranches: Array<() => JSXElement> = [];
  let consumedCount = 0;

  for (let i = startIndex; i < children.length; i++) {
    const child = children[i];

    if (child instanceof Element) {
      const hasElse = child.hasAttribute("data-echo-else");
      const hasElseIf = child.hasAttribute("data-echo-else-if");

      if (hasElse || hasElseIf) {
        child.removeAttribute(hasElse ? "data-echo-else" : "data-echo-else-if");

        const elseIfCondition = hasElseIf
          ? (child as Element & { __echoElseIfCondition?: Signalish<boolean> })
              .__echoElseIfCondition
          : undefined;

        const renderFn = (): JSXElement => child.cloneNode(true) as Element;

        if (hasElseIf && elseIfCondition !== undefined) {
          (renderFn as unknown as { __condition: Signalish<boolean> }).__condition =
            elseIfCondition;
        }

        elseBranches.push(renderFn);
        consumedCount++;

        if (hasElse) {
          break;
        }
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (elseBranches.length === 0) {
    return { elseNode: null, consumedCount: 0 };
  }

  if (elseBranches.length === 1) {
    return { elseNode: elseBranches[0]!, consumedCount };
  }

  return {
    elseNode: () => {
      for (const branch of elseBranches) {
        const condition = (branch as unknown as { __condition?: Signalish<boolean> }).__condition;
        if (condition === undefined) {
          return branch();
        }
        const condValue = isSignalish(condition)
          ? (condition as Signal<boolean>).value()
          : condition;
        if (condValue) {
          return branch();
        }
      }
      return null;
    },
    consumedCount,
  };
};

const createJSXElement = (
  tag: string,
  props: Record<string, unknown>,
  children: JSXElement,
  isSvg: boolean,
): JSXElement => {
  const hasIfDirective = "if" in props;
  const hasShowDirective = "show" in props;

  if (hasIfDirective) {
    const condition = props.if as Signalish<boolean>;

    let processedChildren: JSXElement = children;
    let elseNode: (() => JSXElement) | null = null;

    if (isArray(children)) {
      const { elseNode: collectedElse, consumedCount } = collectElseBranches(children, 0);
      if (collectedElse) {
        elseNode = collectedElse;
        const remainingChildren = (children as JSXElement[]).slice(consumedCount);
        processedChildren =
          remainingChildren.length === 1 ? remainingChildren[0]! : remainingChildren;
      }
    }

    const marker = document.createComment("if");

    const createThenBranch = (): JSXElement => {
      const element = isSvg
        ? document.createElementNS("http://www.w3.org/2000/svg", tag)
        : createElement(tag);

      for (const [name, value] of Object.entries(props)) {
        if (
          name === "children" ||
          name === "if" ||
          name === "else" ||
          name === "else-if" ||
          name === "show"
        )
          continue;

        if (name.startsWith("on:")) {
          setEvent(element, name, value as () => void);
          continue;
        }

        setProp(element, name, value as Signalish<unknown>);
      }

      setEvents(element, props);

      if (processedChildren) {
        const processed = processChildren(processedChildren);
        if (processed !== null && processed !== undefined) {
          if (processed instanceof Node) {
            element.appendChild(processed);
          } else {
            element.appendChild(document.createTextNode(String(processed)));
          }
        }
      }

      return element;
    };

    const createElseBranch = elseNode
      ? (): JSXElement => {
          const result = elseNode!();
          if (result instanceof Element) {
            const clone = result.cloneNode(true) as Element;
            const childNodes = Array.from(clone.childNodes);
            const fragment = document.createDocumentFragment();
            childNodes.forEach((node) => fragment.appendChild(node));
            return fragment.childNodes.length === 1 ? fragment.firstChild! : fragment;
          }
          return result;
        }
      : undefined;

    (marker as unknown as Record<string, (container: Node) => () => void>).__echoIfProcessor = (
      container: Node,
    ): (() => void) => {
      return _$if(container, condition, createThenBranch, createElseBranch);
    };

    return marker;
  }

  const element = isSvg
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : createElement(tag);

  if (hasShowDirective) {
    applyShowDirective(element as HTMLElement, props.show as Signalish<boolean>);
  }

  for (const [name, value] of Object.entries(props)) {
    if (name === "children") continue;
    if (name === "if" || name === "show" || name === "else" || name === "else-if") continue;

    if (name.startsWith("on:")) {
      setEvent(element, name, value as () => void);
      continue;
    }

    setProp(element, name, value as Signalish<unknown>);
  }

  setEvents(element, props);

  if (children) {
    const processed = processChildren(children);
    if (processed !== null && processed !== undefined) {
      if (processed instanceof Node) {
        element.appendChild(processed);
      } else {
        element.appendChild(document.createTextNode(String(processed)));
      }
    }
  }

  return element;
};

const isSvgTag = (tag: string): boolean => {
  const svgTags = new Set([
    "animate",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "switch",
    "symbol",
    "text",
    "textPath",
    "title",
    "tspan",
    "use",
    "view",
  ]);
  return svgTags.has(tag);
};

export const jsx = <P extends JSXProps>(
  type: string | JSXComponent<P>,
  props: P,
  key?: string | number,
): JSXElement => {
  const { children: propsChildren, ...restProps } = props;
  const children = propsChildren;

  if (isFunction(type) && !isString(type)) {
    const componentFn = type as JSXComponent<P>;
    const componentProps = { ...restProps } as P;

    if (key !== undefined) {
      (componentProps as Record<string, unknown>).key = key;
    }

    if (children !== undefined && children !== null) {
      (componentProps as Record<string, JSXElement>).children = children;
    }

    return componentFn(componentProps);
  }

  const tag = type as string;
  const isSvg = tag === "svg" || isSvgTag(tag);

  return createJSXElement(tag, restProps as Record<string, unknown>, children, isSvg);
};

export const jsxs = jsx;

export { jsx as jsxDEV };
