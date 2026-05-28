import { effect, scope, cleanup } from "@echojs/reactivity";
import type { ReadonlySignal, Signal } from "@echojs/reactivity";
import { isSignalish, isFunction } from "../internals/utils";
import { insert, appendChildren } from "../insert";
import type { JSXElement, Signalish } from "../types";

type RenderFn = () => JSXElement;
type ConditionFn = () => boolean | Signal<boolean> | ReadonlySignal<boolean>;

type Branch = {
  condition: ConditionFn;
  render: RenderFn;
};

const renderBranch = (
  parent: Node,
  render: RenderFn,
  marker: Node,
  previousDispose: (() => void) | null,
): { dispose: () => void; node: Node | null } => {
  if (previousDispose) {
    previousDispose();
  }

  let activeNode: Node | null = null;

  const dispose = scope(() => {
    const result = render();

    if (result instanceof DocumentFragment) {
      const firstChild = result.firstChild;
      parent.insertBefore(result, marker);
      activeNode = firstChild;
    } else if (result instanceof Node) {
      parent.insertBefore(result, marker);
      activeNode = result;
    } else if (result !== null && result !== undefined) {
      const textNode = document.createTextNode(String(result));
      parent.insertBefore(textNode, marker);
      activeNode = textNode;
    }
  });

  return { dispose, node: activeNode };
};

export const _$if = (
  parent: Node,
  condition: Signalish<boolean>,
  thenRender: RenderFn,
  elseRender?: RenderFn,
): (() => void) => {
  const marker = document.createTextNode("");
  parent.appendChild(marker);

  let currentDispose: (() => void) | null = null;
  let lastBranch: "then" | "else" | null = null;

  const update = (): void => {
    const condValue = isSignalish(condition) ? (condition as Signal<boolean>).value() : condition;

    const targetBranch: "then" | "else" = condValue ? "then" : "else";

    if (targetBranch === lastBranch) return;

    if (currentDispose) {
      currentDispose();
      currentDispose = null;
    }

    if (condValue) {
      const { dispose } = renderBranch(parent, thenRender, marker, null);
      currentDispose = dispose;
      lastBranch = "then";
    } else if (elseRender) {
      const { dispose } = renderBranch(parent, elseRender, marker, null);
      currentDispose = dispose;
      lastBranch = "else";
    } else {
      lastBranch = "else";
    }
  };

  if (isSignalish(condition)) {
    const disposeEffect = effect(update);
    cleanup(disposeEffect);
    return () => {
      disposeEffect();
      if (currentDispose) currentDispose();
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    };
  } else {
    update();
    return () => {
      if (currentDispose) currentDispose();
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    };
  }
};

export const _$switch = (parent: Node, branches: Branch[], fallback?: RenderFn): (() => void) => {
  const marker = document.createTextNode("");
  parent.appendChild(marker);

  let currentDispose: (() => void) | null = null;
  let lastIndex = -1;

  const getActiveIndex = (): number => {
    for (let i = 0; i < branches.length; i++) {
      const branch = branches[i]!;
      const cond = branch.condition();
      const condValue = isSignalish(cond) ? (cond as Signal<boolean>).value() : cond;
      if (condValue) return i;
    }
    return -1;
  };

  const update = (): void => {
    const activeIndex = getActiveIndex();

    if (activeIndex === lastIndex) return;

    if (currentDispose) {
      currentDispose();
      currentDispose = null;
    }

    if (activeIndex >= 0) {
      const { dispose } = renderBranch(parent, branches[activeIndex]!.render, marker, null);
      currentDispose = dispose;
    } else if (fallback) {
      const { dispose } = renderBranch(parent, fallback, marker, null);
      currentDispose = dispose;
    }

    lastIndex = activeIndex;
  };

  const hasReactiveConditions = branches.some((b) => {
    const cond = b.condition();
    return isSignalish(cond);
  });

  if (hasReactiveConditions) {
    const disposeEffect = effect(update);
    cleanup(disposeEffect);
    return () => {
      disposeEffect();
      if (currentDispose) currentDispose();
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    };
  } else {
    update();
    return () => {
      if (currentDispose) currentDispose();
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    };
  }
};
