import { List, Show, createView, mount, type Child } from "@echojs/hyperdom";
import type { Example1VM } from "./example1.model";
import {
  article,
  button,
  code,
  cx,
  div,
  h3,
  input,
  p,
  section,
  span,
  strong,
} from "@echojs/hyperdom";

export const Example1View = createView((vm: Example1VM): Child => {
  const { $count, $items, $name } = vm;

  const pillStyle = {
    padding: "4px 8px",
    background: "var(--gray-100)",
    "border-radius": "6px",
    "margin-right": "6px",
    display: "inline-block",
  } as const;

  return article(
    null,
    section(
      { class: cx("section", { "is-positive": $count.value() > 0 }) },
      h3(null, "Example1 — Counter"),
      button({ "on:click": vm.increment }, "Increment"),
      span({ style: { "margin-left": "12px", "font-weight": 700 } }, () => $count.value()),
      Show(
        () => $count.value() > 0,
        () => p({ style: { "margin-top": "8px" } }, "Count больше нуля"),
      ),
    ),

    section(
      { class: "section" },
      h3(null, "Example1 — Reactive input"),
      p(null, ["Пишем без JSX через ", code(null, "@echojs/hyperdom"), "."]),
      input({
        type: "text",
        value: $name.value(),
        "on:change": (e) => vm.setName(e.currentTarget.value),
      }),
      div({ style: { "margin-top": "8px" } }, ["Hello, ", strong(null, () => $name.value())]),
    ),

    section(
      { class: "section" },
      h3(null, "Example1 — List"),
      div({ style: { display: "flex", gap: "8px", "margin-bottom": "8px" } }, [
        button({ "on:click": vm.appendItem }, "Append"),
        button({ class: "secondary", "on:click": vm.resetItems }, "Reset"),
      ]),
      div(
        null,
        List($items, (item) => span({ style: pillStyle }, item)),
      ),
    ),
  );
});
