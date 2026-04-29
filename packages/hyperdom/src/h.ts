import type { Child, Component, Props } from "./types";
import { createNode, type Tag } from "./dom/create-node";

function isProps(value: unknown): value is Props {
  return value === null || (typeof value === "object" && value !== null && !Array.isArray(value) && !(value as any).nodeType);
}

function normalizeChildren(list: unknown[]): Child | undefined {
  if (list.length === 0) return undefined;
  if (list.length === 1) return list[0] as Child;
  return list as Child[];
}

export function h<P = any>(
  tag: string | Component<P>,
  props?: (P & Props) | null,
  children?: Child,
  ...rest: Child[]
): Child {
  // Support h('div', 'text') and h('div', [..]) as a convenience
  if (children === undefined && rest.length === 0 && props !== undefined && !isProps(props)) {
    return createNode(tag as Tag, null, props as any as Child);
  }

  const normalized = normalizeChildren(children === undefined ? [] : [children, ...rest]);
  return createNode(tag as Tag, props ?? null, normalized);
}

