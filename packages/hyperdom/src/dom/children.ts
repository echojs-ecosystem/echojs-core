import type { Child } from "../core/types";
import {
  createScope,
  disposeScope,
  runWithScope,
  type Scope,
  getCurrentScope,
  onCleanup,
} from "../lifecycle/cleanup";
import { createReactiveEffect } from "../lifecycle/reactive";
import { clearBetween } from "./clear-between";
import { collectBetween } from "./collect-between";
import { addBinding } from "./add-binding";
import { activateTree } from "./activate-tree";

const isNode = (v: unknown): v is Node =>
  typeof v === "object" && v !== null && typeof (v as any).nodeType === "number";

/** Creates a DOM Text node from a primitive child. */
const normalizeText = (v: string | number): Text => document.createTextNode(String(v));

/**
 * Mounts a single `Child` value into the DOM.
 *
 * Returns the list of inserted nodes for bookkeeping by higher-level mounts.
 */
export const mountChild = (parent: Node, child: Child, before: Node | null): Node[] => {
  if (child == null || child === false || child === true) return [];

  if (typeof child === "string" || typeof child === "number") {
    const node = normalizeText(child);
    parent.insertBefore(node, before);
    return [node];
  }

  if (typeof child === "function") {
    return mountDynamic(parent, child as () => Child, before);
  }

  if (Array.isArray(child)) {
    return mountChildren(parent, child, before);
  }

  if (isNode(child)) {
    parent.insertBefore(child, before);
    return [child];
  }

  // Unknown values: ignore
  return [];
};

/** Mounts an array of children into the DOM. */
export const mountChildren = (parent: Node, children: Child[], before: Node | null): Node[] => {
  const out: Node[] = [];
  for (const child of children) {
    if (Array.isArray(child)) out.push(...mountChildren(parent, child, before));
    else out.push(...mountChild(parent, child, before));
  }
  return out;
};

/**
 * Mounts a dynamic region (`() => Child`) between two comment markers.
 *
 * The region is activated later (via bindings) when `render()` runs inside a scope, so reactive
 * dependencies can be tracked and cleaned up correctly.
 */
const mountDynamic = (parent: Node, compute: () => Child, before: Node | null): Node[] => {
  const start = document.createComment("hyperdom:start");
  const end = document.createComment("hyperdom:end");
  parent.insertBefore(end, before);
  parent.insertBefore(start, end);

  let regionScope: Scope | null = null;

  const update = () => {
    if (regionScope) {
      disposeScope(regionScope);
      regionScope = null;
    }
    clearBetween(start, end);

    const next = compute();
    const nextScope = createScope();
    regionScope = nextScope;

    runWithScope(nextScope, () => {
      mountChild(parent, next, end);
      // Activate deferred bindings (props/events/dynamic regions) created inside this region scope.
      // Without this, reactive props/events inside dynamic regions would never start updating.
      for (const node of collectBetween(start, end)) {
        activateTree(node);
      }
    });
  };

  const activate = () => {
    const ownerScope = getCurrentScope();
    if (!ownerScope) {
      // If somehow activated outside of render scope, do a one-off render without reactivity.
      update();
      return;
    }

    const updateInOwnerScope = () => runWithScope(ownerScope, update);

    createReactiveEffect(updateInOwnerScope, () => {
      if (regionScope) disposeScope(regionScope);
      clearBetween(start, end);
      start.parentNode?.removeChild(start);
      end.parentNode?.removeChild(end);
    });
  };

  // Defer activation until render() runs inside a scope.
  addBinding(end, activate);

  // Also ensure markers are removed on scope dispose even if activation never happened.
  addBinding(end, () => {
    onCleanup(() => {
      if (regionScope) disposeScope(regionScope);
      clearBetween(start, end);
      start.parentNode?.removeChild(start);
      end.parentNode?.removeChild(end);
    });
  });

  return [start, end];
};
