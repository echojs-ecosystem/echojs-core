import type { Child, Props } from "./types";
import { h } from "./h";

export type IntrinsicTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;

type ElementForIntrinsicTag<T extends IntrinsicTag> = T extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[T]
  : T extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[T]
    : Element;

type PropsFor<T extends IntrinsicTag> = Props<ElementForIntrinsicTag<T>> | null | undefined;

/**
 * Low-level tag factory: `tag("div", props, ...children)`.
 *
 * Prefer the convenience exports like `div(...)`, `button(...)`, etc. when you want strong
 * per-element typing.
 */
export const tag = <T extends IntrinsicTag>(
  name: T,
  props?: PropsFor<T>,
  ...children: Child[]
): Child => {
  return h(name as any, props ?? null, ...children);
};

export type ClassValue =
  | string
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>
  | ClassValue[];

/** Small `class` builder for conditional class names. */
export const cx = (...values: ClassValue[]): string => {
  const out: string[] = [];
  const push = (v: ClassValue): void => {
    if (!v) return;
    if (typeof v === "string") {
      const s = v.trim();
      if (s) out.push(s);
      return;
    }
    if (Array.isArray(v)) {
      for (const x of v) push(x);
      return;
    }
    for (const [k, ok] of Object.entries(v)) {
      if (ok) out.push(k);
    }
  };
  for (const v of values) push(v);
  return out.join(" ");
};

/**
 * Tiny helpers for common DOM event props using `onXxx` form.
 *
 * If you want per-element `currentTarget` typing, prefer using `"on:..."`/`onXxx` directly on the
 * element props so it can be inferred from the tag.
 */
export const on = {
  click: (fn: (e: MouseEvent & { currentTarget: Element }) => void) => ({ onClick: fn }),
  input: (fn: (e: Event & { currentTarget: Element }) => void) => ({ onInput: fn }),
  change: (fn: (e: Event & { currentTarget: Element }) => void) => ({ onChange: fn }),
  submit: (fn: (e: SubmitEvent & { currentTarget: Element }) => void) => ({ onSubmit: fn }),
} as const;

/** Common `aria-*` attribute helpers. */
export const aria = {
  label: (value: string) => ({ "aria-label": value }),
  expanded: (value: boolean) => ({ "aria-expanded": value }),
  pressed: (value: boolean) => ({ "aria-pressed": value }),
  hidden: (value: boolean) => ({ "aria-hidden": value }),
} as const;

/** Common `data-*` attribute helpers. */
export const data = {
  testid: (value: string) => ({ "data-testid": value }),
  test: (value: string) => ({ "data-test": value }),
} as const;

// Convenience exports (flat) — чтобы писать `button(...)`, `section(...)` и т.д.
/** `<h1>` element factory. */
export const h1 = (props?: Props<HTMLHeadingElement> | null, ...children: Child[]) =>
  tag("h1", props, ...children);
/** `<h2>` element factory. */
export const h2 = (props?: Props<HTMLHeadingElement> | null, ...children: Child[]) =>
  tag("h2", props, ...children);
/** `<h3>` element factory. */
export const h3 = (props?: Props<HTMLHeadingElement> | null, ...children: Child[]) =>
  tag("h3", props, ...children);
/** `<h4>` element factory. */
export const h4 = (props?: Props<HTMLHeadingElement> | null, ...children: Child[]) =>
  tag("h4", props, ...children);
/** `<h5>` element factory. */
export const h5 = (props?: Props<HTMLHeadingElement> | null, ...children: Child[]) =>
  tag("h5", props, ...children);
/** `<h6>` element factory. */
export const h6 = (props?: Props<HTMLHeadingElement> | null, ...children: Child[]) =>
  tag("h6", props, ...children);

/** `<p>` element factory. */
export const p = (props?: Props<HTMLParagraphElement> | null, ...children: Child[]) =>
  tag("p", props, ...children);
/** `<pre>` element factory. */
export const pre = (props?: Props<HTMLPreElement> | null, ...children: Child[]) =>
  tag("pre", props, ...children);
/** `<blockquote>` element factory. */
export const blockquote = (props?: Props<HTMLQuoteElement> | null, ...children: Child[]) =>
  tag("blockquote", props, ...children);

/** `<span>` element factory. */
export const span = (props?: Props<HTMLSpanElement> | null, ...children: Child[]) =>
  tag("span", props, ...children);
/** `<strong>` element factory. */
export const strong = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("strong", props as any, ...children);
/** `<em>` element factory. */
export const em = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("em", props as any, ...children);
/** `<small>` element factory. */
export const small = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("small", props as any, ...children);
/** `<code>` element factory. */
export const code = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("code", props as any, ...children);
/** `<kbd>` element factory. */
export const kbd = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("kbd", props as any, ...children);

/** `<div>` element factory. */
export const div = (props?: Props<HTMLDivElement> | null, ...children: Child[]) =>
  tag("div", props, ...children);
/** `<hr>` element factory. */
export const hr = (props?: Props<HTMLHRElement> | null) => tag("hr", props);
/** `<br>` element factory. */
export const br = (props?: Props<HTMLBRElement> | null) => tag("br", props);

/** `<header>` element factory. */
export const header = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("header", props as any, ...children);
/** `<main>` element factory. */
export const main = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("main", props as any, ...children);
/** `<footer>` element factory. */
export const footer = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("footer", props as any, ...children);
/** `<nav>` element factory. */
export const nav = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("nav", props as any, ...children);
/** `<section>` element factory. */
export const section = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("section", props as any, ...children);
/** `<article>` element factory. */
export const article = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("article", props as any, ...children);
/** `<aside>` element factory. */
export const aside = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("aside", props as any, ...children);

/** `<ul>` element factory. */
export const ul = (props?: Props<HTMLUListElement> | null, ...children: Child[]) =>
  tag("ul", props, ...children);
/** `<ol>` element factory. */
export const ol = (props?: Props<HTMLOListElement> | null, ...children: Child[]) =>
  tag("ol", props, ...children);
/** `<li>` element factory. */
export const li = (props?: Props<HTMLLIElement> | null, ...children: Child[]) =>
  tag("li", props, ...children);
/** `<dl>` element factory. */
export const dl = (props?: Props<HTMLDListElement> | null, ...children: Child[]) =>
  tag("dl", props, ...children);
/** `<dt>` element factory. */
export const dt = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("dt", props as any, ...children);
/** `<dd>` element factory. */
export const dd = (props?: Props<HTMLElement> | null, ...children: Child[]) =>
  tag("dd", props as any, ...children);

/** `<form>` element factory. */
export const form = (props?: Props<HTMLFormElement> | null, ...children: Child[]) =>
  tag("form", props, ...children);
/** `<label>` element factory. */
export const label = (props?: Props<HTMLLabelElement> | null, ...children: Child[]) =>
  tag("label", props, ...children);
/** `<input>` element factory. */
export const input = (props?: Props<HTMLInputElement> | null) => tag("input", props);
/** `<textarea>` element factory. */
export const textarea = (props?: Props<HTMLTextAreaElement> | null, ...children: Child[]) =>
  tag("textarea", props, ...children);
/** `<select>` element factory. */
export const select = (props?: Props<HTMLSelectElement> | null, ...children: Child[]) =>
  tag("select", props, ...children);
/** `<option>` element factory. */
export const option = (props?: Props<HTMLOptionElement> | null, ...children: Child[]) =>
  tag("option", props, ...children);
/** `<button>` element factory. */
export const button = (props?: Props<HTMLButtonElement> | null, ...children: Child[]) =>
  tag("button", props, ...children);

/** `<img>` element factory. */
export const img = (props?: Props<HTMLImageElement> | null) => tag("img", props);
/** `<picture>` element factory. */
export const picture = (props?: Props<HTMLPictureElement> | null, ...children: Child[]) =>
  tag("picture", props, ...children);
/** `<source>` element factory. */
export const source = (props?: Props<HTMLSourceElement> | null) => tag("source", props);
/** `<video>` element factory. */
export const video = (props?: Props<HTMLVideoElement> | null, ...children: Child[]) =>
  tag("video", props, ...children);
/** `<audio>` element factory. */
export const audio = (props?: Props<HTMLAudioElement> | null, ...children: Child[]) =>
  tag("audio", props, ...children);
/** `<svg>` element factory. */
export const svg = (props?: Props<SVGSVGElement> | null, ...children: Child[]) =>
  tag("svg", props as any, ...children);

/** `<table>` element factory. */
export const table = (props?: Props<HTMLTableElement> | null, ...children: Child[]) =>
  tag("table", props, ...children);
/** `<thead>` element factory. */
export const thead = (props?: Props<HTMLTableSectionElement> | null, ...children: Child[]) =>
  tag("thead", props, ...children);
/** `<tbody>` element factory. */
export const tbody = (props?: Props<HTMLTableSectionElement> | null, ...children: Child[]) =>
  tag("tbody", props, ...children);
/** `<tfoot>` element factory. */
export const tfoot = (props?: Props<HTMLTableSectionElement> | null, ...children: Child[]) =>
  tag("tfoot", props, ...children);
/** `<tr>` element factory. */
export const tr = (props?: Props<HTMLTableRowElement> | null, ...children: Child[]) =>
  tag("tr", props, ...children);
/** `<th>` element factory. */
export const th = (props?: Props<HTMLTableCellElement> | null, ...children: Child[]) =>
  tag("th", props, ...children);
/** `<td>` element factory. */
export const td = (props?: Props<HTMLTableCellElement> | null, ...children: Child[]) =>
  tag("td", props, ...children);
/** `<caption>` element factory. */
export const caption = (props?: Props<HTMLTableCaptionElement> | null, ...children: Child[]) =>
  tag("caption", props, ...children);
