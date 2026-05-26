import { h } from "./h";
/** True when a value looks like a props bag (not a child). */
const isProps = (value) => {
    return (value === null ||
        (typeof value === "object" &&
            value !== null &&
            !Array.isArray(value) &&
            !value.nodeType));
};
/** Normalizes `children` arguments into a single `Child` value. */
const normalizeChildren = (list) => {
    if (list.length === 0)
        return undefined;
    if (list.length === 1)
        return list[0];
    return list;
};
const makeTag = (name) => {
    return ((arg1, arg2, ...rest) => {
        // Vue-like call shapes:
        // - div()
        // - div(props)
        // - div('text') / div([..]) / div(() => ...)
        // - div(props, children, ...rest)
        const props = isProps(arg1) ? arg1 : null;
        const childrenList = isProps(arg1) ? [arg2, ...rest] : [arg1, arg2, ...rest];
        const children = normalizeChildren(childrenList.filter((x) => x !== undefined));
        return h(name, props, children);
    });
};
/** Small `class` builder for conditional class names. */
export const cx = (...values) => {
    const out = [];
    const push = (value) => {
        if (!value)
            return;
        if (typeof value === "string") {
            const s = value.trim();
            if (s)
                out.push(s);
            return;
        }
        if (Array.isArray(value)) {
            for (const x of value)
                push(x);
            return;
        }
        for (const [k, ok] of Object.entries(value)) {
            if (ok)
                out.push(k);
        }
    };
    for (const value of values)
        push(value);
    return out.join(" ");
};
/**
 * Tiny helpers for common DOM event props using `onXxx` form.
 *
 * If you want per-element `currentTarget` typing, prefer using `"on:..."`/`onXxx` directly on the
 * element props so it can be inferred from the tag.
 */
export const on = {
    click: (fn) => ({ onClick: fn }),
    input: (fn) => ({ onInput: fn }),
    change: (fn) => ({ onChange: fn }),
    submit: (fn) => ({ onSubmit: fn }),
};
/** Common `aria-*` attribute helpers. */
export const aria = {
    label: (value) => ({ "aria-label": value }),
    expanded: (value) => ({ "aria-expanded": value }),
    pressed: (value) => ({ "aria-pressed": value }),
    hidden: (value) => ({ "aria-hidden": value }),
};
/** Common `data-*` attribute helpers. */
export const data = {
    testid: (value) => ({ "data-testid": value }),
    test: (value) => ({ "data-test": value }),
};
// Convenience exports (flat) — чтобы писать `button(...)`, `section(...)` и т.д.
/** `<h1>` element factory. */
export const h1 = makeTag("h1");
/** `<h2>` element factory. */
export const h2 = makeTag("h2");
/** `<h3>` element factory. */
export const h3 = makeTag("h3");
/** `<h4>` element factory. */
export const h4 = makeTag("h4");
/** `<h5>` element factory. */
export const h5 = makeTag("h5");
/** `<h6>` element factory. */
export const h6 = makeTag("h6");
/** `<p>` element factory. */
export const p = makeTag("p");
/** `<pre>` element factory. */
export const pre = makeTag("pre");
/** `<blockquote>` element factory. */
export const blockquote = makeTag("blockquote");
/** `<span>` element factory. */
export const span = makeTag("span");
/** `<strong>` element factory. */
export const strong = makeTag("strong");
/** `<em>` element factory. */
export const em = makeTag("em");
/** `<small>` element factory. */
export const small = makeTag("small");
/** `<code>` element factory. */
export const code = makeTag("code");
/** `<kbd>` element factory. */
export const kbd = makeTag("kbd");
/** `<div>` element factory. */
export const div = makeTag("div");
/** `<hr>` element factory. */
export const hr = makeTag("hr");
/** `<br>` element factory. */
export const br = makeTag("br");
/** `<header>` element factory. */
export const header = makeTag("header");
/** `<main>` element factory. */
export const main = makeTag("main");
/** `<footer>` element factory. */
export const footer = makeTag("footer");
/** `<nav>` element factory. */
export const nav = makeTag("nav");
/** `<section>` element factory. */
export const section = makeTag("section");
/** `<article>` element factory. */
export const article = makeTag("article");
/** `<aside>` element factory. */
export const aside = makeTag("aside");
/** `<ul>` element factory. */
export const ul = makeTag("ul");
/** `<ol>` element factory. */
export const ol = makeTag("ol");
/** `<li>` element factory. */
export const li = makeTag("li");
/** `<dl>` element factory. */
export const dl = makeTag("dl");
/** `<dt>` element factory. */
export const dt = makeTag("dt");
/** `<dd>` element factory. */
export const dd = makeTag("dd");
/** `<form>` element factory. */
export const form = makeTag("form");
/** `<label>` element factory. */
export const label = makeTag("label");
/** `<input>` element factory. */
export const input = makeTag("input");
/** `<textarea>` element factory. */
export const textarea = makeTag("textarea");
/** `<select>` element factory. */
export const select = makeTag("select");
/** `<option>` element factory. */
export const option = makeTag("option");
/** `<button>` element factory. */
export const button = makeTag("button");
/** `<img>` element factory. */
export const img = makeTag("img");
/** `<picture>` element factory. */
export const picture = makeTag("picture");
/** `<source>` element factory. */
export const source = makeTag("source");
/** `<video>` element factory. */
export const video = makeTag("video");
/** `<audio>` element factory. */
export const audio = makeTag("audio");
/** `<svg>` element factory. */
export const svg = makeTag("svg");
/** `<table>` element factory. */
export const table = makeTag("table");
/** `<thead>` element factory. */
export const thead = makeTag("thead");
/** `<tbody>` element factory. */
export const tbody = makeTag("tbody");
/** `<tfoot>` element factory. */
export const tfoot = makeTag("tfoot");
/** `<tr>` element factory. */
export const tr = makeTag("tr");
/** `<th>` element factory. */
export const th = makeTag("th");
/** `<td>` element factory. */
export const td = makeTag("td");
/** `<caption>` element factory. */
export const caption = makeTag("caption");
//# sourceMappingURL=dsl.js.map