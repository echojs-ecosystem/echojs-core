import type { Child, Component, Props } from "../types";
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
export declare const createNode: (tag: Tag, props?: Props<any> | null, children?: Child) => Child;
//# sourceMappingURL=create-node.d.ts.map