import type { Child, Component, Props } from "../types";
import { setProps } from "./props";
import { mountChild, mountChildren } from "./children";

export type HtmlTagName = keyof HTMLElementTagNameMap;
export type SvgTagName = keyof SVGElementTagNameMap;
export type IntrinsicTagName = HtmlTagName | SvgTagName;

export type Tag = IntrinsicTagName | Component<any>;

/**
 * Creates an element for an intrinsic tag, or calls a component function.
 *
 * - Intrinsic tags are created via `document.createElement(...)`
 * - Props are applied via `setProps(...)`
 * - Children are mounted immediately
 */
export const createNode = (tag: Tag, props?: Props<any> | null, children?: Child): Child => {
  if (typeof tag === "function") {
    const nextProps = { ...(props ?? {}), children } as any;
    return tag(nextProps);
  }

  // Note: createElement supports both HTML and SVG tag names.
  const element = document.createElement(tag as string);
  setProps(element, props ?? null);

  if (children !== undefined) {
    if (Array.isArray(children)) mountChildren(element , children, null);
    else mountChild(element, children, null);
  }

  return element;
};
