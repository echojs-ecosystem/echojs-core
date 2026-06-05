import { effect, cleanup } from "@echojs-ecosystem/reactivity";
import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import { isSignalish, isObject, isString, isArray, isFunction } from "./internals/utils";
import type { Signalish } from "./types";

const SVG_NS = "http://www.w3.org/2000/svg";
const MATHML_NS = "http://www.w3.org/1998/Math/MathML";

const isSvgElement = (tag: string): boolean => {
  const svgTags = new Set([
    "svg",
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

const isMathMLElement = (tag: string): boolean => {
  const mathTags = new Set([
    "math",
    "maction",
    "annotation",
    "annotation-xml",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mi",
    "mmultiscripts",
    "mn",
    "mo",
    "mover",
    "mpadded",
    "mphantom",
    "mprescripts",
    "mroot",
    "mrow",
    "ms",
    "mspace",
    "msqrt",
    "mstyle",
    "msub",
    "msubsup",
    "msup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "none",
    "semantics",
  ]);
  return mathTags.has(tag);
};

export const createElement = (tag: string): Element => {
  if (isSvgElement(tag)) {
    return document.createElementNS(SVG_NS, tag);
  }
  if (isMathMLElement(tag)) {
    return document.createElementNS(MATHML_NS, tag);
  }
  return document.createElement(tag);
};

const setStyle = (
  element: HTMLElement,
  style: Signalish<string | Record<string, string | number>>,
): void => {
  if (isSignalish(style)) {
    const dispose = effect(() => {
      const value = (style as Signal<string | Record<string, string | number>>).value();
      applyStyle(element, value);
    });
    cleanup(dispose);
  } else {
    applyStyle(element, style);
  }
};

const applyStyle = (
  element: HTMLElement,
  style: string | Record<string, string | number>,
): void => {
  if (isString(style)) {
    element.style.cssText = style;
  } else if (isObject(style)) {
    for (const [key, value] of Object.entries(style)) {
      if (value != null) {
        element.style.setProperty(
          key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
          String(value),
        );
      }
    }
  }
};

const setClass = (element: Element, value: Signalish<string>): void => {
  if (isSignalish(value)) {
    const dispose = effect(() => {
      const classValue = (value as Signal<string>).value();
      element.className = isString(classValue) ? classValue : String(classValue ?? "");
    });
    cleanup(dispose);
  } else {
    element.className = isString(value) ? value : String(value ?? "");
  }
};

const setAttribute = (
  element: Element,
  name: string,
  value: Signalish<string | number | boolean | null | undefined>,
): void => {
  if (isSignalish(value)) {
    const dispose = effect(() => {
      const resolvedValue = (value as Signal<string | number | boolean | null | undefined>).value();
      applyAttribute(element, name, resolvedValue);
    });
    cleanup(dispose);
  } else {
    applyAttribute(element, name, value);
  }
};

const applyAttribute = (
  element: Element,
  name: string,
  value: string | number | boolean | null | undefined,
): void => {
  if (value === null || value === undefined || value === false) {
    element.removeAttribute(name);
  } else if (value === true) {
    element.setAttribute(name, "");
  } else {
    element.setAttribute(name, String(value));
  }
};

// Helper to safely set properties on an element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setElementProperty = (element: unknown, name: string, value: unknown): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (element as Record<string, unknown>)[name] = value;
};

const setProperty = (element: Element, name: string, value: Signalish<unknown>): void => {
  if (isSignalish(value)) {
    const dispose = effect(() => {
      const resolvedValue = (value as Signal<unknown>).value();
      setElementProperty(element, name, resolvedValue);
    });
    cleanup(dispose);
  } else {
    setElementProperty(element, name, value);
  }
};

const BOOLEAN_ATTRS = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "draggable",
  "contenteditable",
]);

const isBooleanAttr = (name: string): boolean => {
  return BOOLEAN_ATTRS.has(name.toLowerCase());
};

export const setProp = (element: Element, name: string, value: Signalish<unknown>): void => {
  if (name === "class" || name === "className") {
    setClass(element, value as Signalish<string>);
    return;
  }

  if (name === "style") {
    setStyle(element as HTMLElement, value as Signalish<string | Record<string, string | number>>);
    return;
  }

  if (name.startsWith("prop:")) {
    const propName = name.slice(5);
    setProperty(element, propName, value);
    return;
  }

  if (name.startsWith("attr:")) {
    const attrName = name.slice(5);
    setAttribute(
      element,
      attrName,
      value as Signalish<string | number | boolean | null | undefined>,
    );
    return;
  }

  if (name in element && !isBooleanAttr(name)) {
    setProperty(element, name, value);
  } else {
    setAttribute(element, name, value as Signalish<string | number | boolean | null | undefined>);
  }
};

export const setProps = (element: Element, props: Record<string, unknown>): void => {
  for (const [name, value] of Object.entries(props)) {
    if (value === undefined) continue;
    setProp(element, name, value as Signalish<unknown>);
  }
};
