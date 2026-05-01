import type { Child, Component, Props } from "./types";
import { createNode, type IntrinsicTagName, type Tag } from "./dom/create-node";
import { getStrictContextChecks } from "./config";
import { isInViewContext } from "./view";
import { getCurrentScope } from "./lifecycle/cleanup";

type ElementForIntrinsicTag<T extends IntrinsicTagName> = T extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[T]
  : T extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[T]
    : Element;

/** True when a value looks like a props bag (not a child). */
const isProps = (value: unknown): value is Props<any> => {
  return (
    value === null ||
    (typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value as any).nodeType)
  );
};

/** Normalizes `children` arguments into a single `Child` value. */
const normalizeChildren = (list: unknown[]): Child | undefined => {
  if (list.length === 0) return undefined;
  if (list.length === 1) return list[0] as Child;
  return list as Child[];
};

/**
 * Typed callable signature for `h()`.
 *
 * This is written as a type (not function overloads) so the runtime implementation can be an
 * arrow function while still preserving overload-like call inference.
 */
export type H = {
  <T extends IntrinsicTagName>(
    tag: T,
    props?: Props<ElementForIntrinsicTag<T>> | null,
    children?: Child,
    ...rest: Child[]
  ): Child;
  <P = any>(
    tag: Component<P>,
    props?: (P & Props<Element>) | null,
    children?: Child,
    ...rest: Child[]
  ): Child;
};

/**
 * Creates a DOM node (or calls a component function) with props and children.
 *
 * Supports a convenience call shape: `h("div", "text")` (treat second arg as children when it
 * doesn't look like a props object).
 */
export const h: H = ((
  tag: IntrinsicTagName | Component<any>,
  props?: Props<any> | null,
  children?: Child,
  ...rest: Child[]
): Child => {
  // Strict mode: prevent accidental UI construction at module scope.
  // But allow calls inside:
  // - createView() (initial view creation)
  // - render()/dynamic regions/effects (they run under a lifecycle scope)
  if (getStrictContextChecks() && !isInViewContext() && !getCurrentScope()) {
    throw new Error(
      "hyperdom: h() called outside of view/render context. Wrap UI creation in createView(...), or call it while rendering.",
    );
  }

  // Support h('div', 'text') and h('div', [..]) as a convenience
  if (children === undefined && rest.length === 0 && props !== undefined && !isProps(props)) {
    return createNode(tag as Tag, null, props as any as Child);
  }

  const normalized = normalizeChildren(children === undefined ? [] : [children, ...rest]);
  return createNode(tag as Tag, props ?? null, normalized);
}) as unknown as H;
