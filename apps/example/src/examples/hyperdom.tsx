import { createView } from "@echojs-ecosystem/core";
import { signal } from "@echojs-ecosystem/reactivity";
import { h, render, Show, List } from "@echojs/hyperdom";

function HyperdomMount(): Node {
  const container = document.createElement("div");
  container.className = "hyperdom-demo";

  const count = signal(0);
  const name = signal("Echo");
  const items = signal(["A", "B", "C"]);

  const view = h("div", null, [
    h("h3", null, "Hyperdom (hyperscript runtime)"),
    h("p", null, [
      "Этот блок смонтирован через ",
      h("code", null, "@echojs/hyperdom"),
      " внутри JSX-приложения.",
    ]),

    h("div", { class: "section" }, [
      h("h4", null, "Counter"),
      h(
        "button",
        { onClick: () => count.set(count.value() + 1) },
        "Increment",
      ),
      h("span", { style: { "margin-left": "12px", "font-weight": 700 } }, () => count.value()),
      Show(
        () => count.value() > 0,
        () => h("p", { style: { "margin-top": "8px" } }, "Count больше нуля"),
      ),
    ]),

    h("div", { class: "section" }, [
      h("h4", null, "Reactive props + events"),
      h("input", {
        type: "text",
        value: () => name.value(),
        onInput: (e: Event) => name.set((e.currentTarget as HTMLInputElement).value),
        style: {
          padding: "10px",
          border: "2px solid var(--gray-300)",
          "border-radius": "var(--border-radius)",
          "font-size": "16px",
        },
      }),
      h("div", { style: { "margin-top": "8px" } }, [
        "Hello, ",
        h("strong", null, () => name.value()),
      ]),
    ]),

    h("div", { class: "section" }, [
      h("h4", null, "List"),
      h("div", { style: { display: "flex", gap: "8px", "margin-bottom": "8px" } }, [
        h("button", { onClick: () => items.set([...items.value(), String(items.value().length + 1)]) }, "Append"),
        h("button", { class: "secondary", onClick: () => items.set(["X"]) }, "Reset"),
      ]),
      h("div", null, List(items, (item) => h("span", { style: { padding: "4px 8px", background: "var(--gray-100)", "border-radius": "6px", "margin-right": "6px", display: "inline-block" } }, item))),
    ]),
  ]);

  const dispose = render(view, container);
  (container as any).__echoDispose = dispose;

  return container;
}

export const HyperdomExample = createView(() => <div>{HyperdomMount()}</div>);

