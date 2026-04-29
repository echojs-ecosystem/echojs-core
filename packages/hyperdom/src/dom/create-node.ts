import type { Child, Component, Props } from "../types";
import { setProps } from "./props";
import { mountChild, mountChildren } from "./children";

export type Tag = string | Component<any>;

export function createNode(tag: Tag, props?: Props | null, children?: Child): Child {
  if (typeof tag === "function") {
    const nextProps = { ...(props ?? {}), children } as any;
    return tag(nextProps);
  }

  const el = document.createElement(tag);
  setProps(el, props ?? null);

  if (children !== undefined) {
    if (Array.isArray(children)) mountChildren(el, children, null);
    else mountChild(el, children, null);
  }

  return el;
}

