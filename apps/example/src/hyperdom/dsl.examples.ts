import { signal } from "@echojs-ecosystem/reactivity";
import { List, Show, type Child } from "@echojs/hyperdom";
import { button, code, div, h3, h4, input, p, section, span, strong } from "@echojs/hyperdom";

export function exampleCounter(): Child {
  const $count = signal(0);

  return section(
    { class: "section" },
    h4(null, "Counter (DSL example)"),
    button({ onClick: () => $count.update((n) => n + 1) }, "Increment"),
    span({ style: { "margin-left": "12px", "font-weight": 700 } }, () => $count.value()),
    Show(
      () => $count.value() > 0,
      () => p({ style: { "margin-top": "8px" } }, "Count больше нуля"),
    ),
  );
}

export function exampleMiniApp(): Child {
  const $name = signal("Echo");
  const $items = signal(["A", "B", "C"]);

  return div(
    null,
    h3(null, "Hyperdom DSL mini-app"),
    p(null, ["Пишем декларативно поверх ", code(null, "@echojs/hyperdom"), "."]),

    section(
      { class: "section" },
      h4(null, "Reactive input"),
      input({
        type: "text",
        value: () => $name.value(),
        onInput: (e: Event) => $name.set((e.currentTarget as HTMLInputElement).value),
      }),
      p({ style: { "margin-top": "8px" } }, ["Hello, ", strong(null, () => $name.value())]),
    ),

    section(
      { class: "section" },
      h4(null, "List"),
      button(
        { onClick: () => $items.set([...$items.value(), String($items.value().length + 1)]) },
        "Append",
      ),
      button({ class: "secondary", onClick: () => $items.set(["X"]) }, "Reset"),
      div(
        { style: { "margin-top": "8px" } },
        List($items, (item) => span({ style: { "margin-right": "8px" } }, item)),
      ),
    ),
  );
}
