import type { Child, Component, Props } from "./types";
import { type IntrinsicTagName } from "./dom/create-node";
type ElementForIntrinsicTag<T extends IntrinsicTagName> = T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : T extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[T] : Element;
/**
 * Typed callable signature for `h()`.
 *
 * This is written as a type (not function overloads) so the runtime implementation can be an
 * arrow function while still preserving overload-like call inference.
 */
export type H = {
    <T extends IntrinsicTagName>(tag: T, props?: Props<ElementForIntrinsicTag<T>> | null, children?: Child, ...rest: Child[]): Child;
    <T extends IntrinsicTagName>(tag: T, children?: Child, ...rest: Child[]): Child;
    <P = any>(tag: Component<P>, props?: (P & Props<Element>) | null, children?: Child, ...rest: Child[]): Child;
    <P = any>(tag: Component<P>, children?: Child, ...rest: Child[]): Child;
};
/**
 * Creates a DOM node (or calls a component function) with props and children.
 *
 * Supports a convenience call shape: `h("div", "text")` (treat second arg as children when it
 * doesn't look like a props object).
 */
export declare const h: H;
export {};
//# sourceMappingURL=h.d.ts.map