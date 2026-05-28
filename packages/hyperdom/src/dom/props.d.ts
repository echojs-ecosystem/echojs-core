/**
 * Applies a single prop to an element.
 *
 * Events are deferred and handled by `setProps()` so they can participate in scope cleanup.
 */
export declare const setProp: (el: Element, key: string, value: unknown) => void;
/**
 * Applies a props object to an element.
 *
 * - Event props (`on...`, `"on:..."`) are deferred via bindings so they can be cleaned up.
 * - Function-valued props (except `ref`) are treated as reactive getters and re-evaluated.
 */
export declare const setProps: (el: Element, props: Record<string, unknown> | null | undefined) => void;
//# sourceMappingURL=props.d.ts.map