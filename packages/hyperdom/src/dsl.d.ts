import type { Child, ClassValue, Props } from "./types";
export type IntrinsicTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
type ElementForIntrinsicTag<T extends IntrinsicTag> = T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : T extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[T] : Element;
type PropsFor<T extends IntrinsicTag> = Props<ElementForIntrinsicTag<T>> | null | undefined;
type TagFn<T extends IntrinsicTag> = {
    (): Child;
    (props?: PropsFor<T>): Child;
    (props: PropsFor<T>, children?: Child, ...rest: Child[]): Child;
    (children?: Child, ...rest: Child[]): Child;
};
/** Small `class` builder for conditional class names. */
export declare const cx: (...values: ClassValue[]) => string;
/**
 * Tiny helpers for common DOM event props using `onXxx` form.
 *
 * If you want per-element `currentTarget` typing, prefer using `"on:..."`/`onXxx` directly on the
 * element props so it can be inferred from the tag.
 */
export declare const on: {
    readonly click: (fn: (e: MouseEvent & {
        currentTarget: Element;
    }) => void) => {
        onClick: (e: MouseEvent & {
            currentTarget: Element;
        }) => void;
    };
    readonly input: (fn: (e: Event & {
        currentTarget: Element;
    }) => void) => {
        onInput: (e: Event & {
            currentTarget: Element;
        }) => void;
    };
    readonly change: (fn: (e: Event & {
        currentTarget: Element;
    }) => void) => {
        onChange: (e: Event & {
            currentTarget: Element;
        }) => void;
    };
    readonly submit: (fn: (e: SubmitEvent & {
        currentTarget: Element;
    }) => void) => {
        onSubmit: (e: SubmitEvent & {
            currentTarget: Element;
        }) => void;
    };
};
/** Common `aria-*` attribute helpers. */
export declare const aria: {
    readonly label: (value: string) => {
        "aria-label": string;
    };
    readonly expanded: (value: boolean) => {
        "aria-expanded": boolean;
    };
    readonly pressed: (value: boolean) => {
        "aria-pressed": boolean;
    };
    readonly hidden: (value: boolean) => {
        "aria-hidden": boolean;
    };
};
/** Common `data-*` attribute helpers. */
export declare const data: {
    readonly testid: (value: string) => {
        "data-testid": string;
    };
    readonly test: (value: string) => {
        "data-test": string;
    };
};
/** `<h1>` element factory. */
export declare const h1: TagFn<"h1">;
/** `<h2>` element factory. */
export declare const h2: TagFn<"h2">;
/** `<h3>` element factory. */
export declare const h3: TagFn<"h3">;
/** `<h4>` element factory. */
export declare const h4: TagFn<"h4">;
/** `<h5>` element factory. */
export declare const h5: TagFn<"h5">;
/** `<h6>` element factory. */
export declare const h6: TagFn<"h6">;
/** `<p>` element factory. */
export declare const p: TagFn<"p">;
/** `<pre>` element factory. */
export declare const pre: TagFn<"pre">;
/** `<blockquote>` element factory. */
export declare const blockquote: TagFn<"blockquote">;
/** `<span>` element factory. */
export declare const span: TagFn<"span">;
/** `<strong>` element factory. */
export declare const strong: TagFn<"strong">;
/** `<em>` element factory. */
export declare const em: TagFn<"em">;
/** `<small>` element factory. */
export declare const small: TagFn<"small">;
/** `<code>` element factory. */
export declare const code: TagFn<"code">;
/** `<kbd>` element factory. */
export declare const kbd: TagFn<"kbd">;
/** `<div>` element factory. */
export declare const div: TagFn<"div">;
/** `<hr>` element factory. */
export declare const hr: TagFn<"hr">;
/** `<br>` element factory. */
export declare const br: TagFn<"br">;
/** `<header>` element factory. */
export declare const header: TagFn<"header">;
/** `<main>` element factory. */
export declare const main: TagFn<"main">;
/** `<footer>` element factory. */
export declare const footer: TagFn<"footer">;
/** `<nav>` element factory. */
export declare const nav: TagFn<"nav">;
/** `<section>` element factory. */
export declare const section: TagFn<"section">;
/** `<article>` element factory. */
export declare const article: TagFn<"article">;
/** `<aside>` element factory. */
export declare const aside: TagFn<"aside">;
/** `<ul>` element factory. */
export declare const ul: TagFn<"ul">;
/** `<ol>` element factory. */
export declare const ol: TagFn<"ol">;
/** `<li>` element factory. */
export declare const li: TagFn<"li">;
/** `<dl>` element factory. */
export declare const dl: TagFn<"dl">;
/** `<dt>` element factory. */
export declare const dt: TagFn<"dt">;
/** `<dd>` element factory. */
export declare const dd: TagFn<"dd">;
/** `<form>` element factory. */
export declare const form: TagFn<"form">;
/** `<label>` element factory. */
export declare const label: TagFn<"label">;
/** `<input>` element factory. */
export declare const input: TagFn<"input">;
/** `<textarea>` element factory. */
export declare const textarea: TagFn<"textarea">;
/** `<select>` element factory. */
export declare const select: TagFn<"select">;
/** `<option>` element factory. */
export declare const option: TagFn<"option">;
/** `<button>` element factory. */
export declare const button: TagFn<"button">;
/** `<img>` element factory. */
export declare const img: TagFn<"img">;
/** `<picture>` element factory. */
export declare const picture: TagFn<"picture">;
/** `<source>` element factory. */
export declare const source: TagFn<"source">;
/** `<video>` element factory. */
export declare const video: TagFn<"video">;
/** `<audio>` element factory. */
export declare const audio: TagFn<"audio">;
/** `<svg>` element factory. */
export declare const svg: TagFn<"svg">;
/** `<table>` element factory. */
export declare const table: TagFn<"table">;
/** `<thead>` element factory. */
export declare const thead: TagFn<"thead">;
/** `<tbody>` element factory. */
export declare const tbody: TagFn<"tbody">;
/** `<tfoot>` element factory. */
export declare const tfoot: TagFn<"tfoot">;
/** `<tr>` element factory. */
export declare const tr: TagFn<"tr">;
/** `<th>` element factory. */
export declare const th: TagFn<"th">;
/** `<td>` element factory. */
export declare const td: TagFn<"td">;
/** `<caption>` element factory. */
export declare const caption: TagFn<"caption">;
export {};
//# sourceMappingURL=dsl.d.ts.map