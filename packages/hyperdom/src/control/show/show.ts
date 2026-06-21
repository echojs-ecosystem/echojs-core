import type { Child } from "../../core/types";
import { displayRegion } from "../display-region";

/**
 * Conditional region — keeps both branches in the DOM and toggles `display`.
 *
 * Unlike unmounting, hidden content stays mounted (state, focus, scroll preserved).
 */
export const Show = (
  condition: () => boolean,
  then: () => Child,
  fallback?: () => Child,
): (() => Child) => {
  return () => {
    const thenRegion = displayRegion(condition, then);

    if (!fallback) return thenRegion;

    return [
      thenRegion,
      displayRegion(() => !condition(), fallback),
    ];
  };
};
