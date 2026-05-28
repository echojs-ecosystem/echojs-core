import type { Child } from "../types";
type SignalLike<T> = {
    value(): T;
};
/**
 * List rendering helper.
 *
 * Returns a function so the list can be used as a dynamic child and re-evaluated when reactive
 * dependencies change.
 */
export declare const List: <T>(source: SignalLike<readonly T[]> | (() => readonly T[]), renderItem: (item: T, index: () => number) => Child) => (() => Child);
export {};
//# sourceMappingURL=list.d.ts.map