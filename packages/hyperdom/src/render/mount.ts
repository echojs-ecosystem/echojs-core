import type { Child } from "../core/types";
import { render } from "./render";

export interface MountResult {
  node: HTMLElement;
  dispose: () => void;
}

/**
 * Mounts a view tree into a DOM container (app/test entry point).
 *
 * Wraps {@link render} and returns `{ node, dispose }`.
 */
export const mount = (
  view: Child,
  options?: { container?: HTMLElement; className?: string },
): MountResult => {
  const node = options?.container ?? document.createElement("div");
  if (options?.className) node.className = options.className;

  const dispose = render(view, node);

  (node as any).__echoDispose = dispose;

  return { node, dispose };
};
