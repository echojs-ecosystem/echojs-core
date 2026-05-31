import { List, Show, createView, type Child } from "@echojs/hyperdom";
import { i18n } from "@app/i18n/index.js";
import type { CounterVM } from "@features/reactivity-counter/model/counter.model.js";
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

export const CounterView = createView((vm: CounterVM): Child => {
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
      h3(null, () => i18n.t("counter.title")),
      button({ "on:click": vm.increment }, () => i18n.t("counter.increment")),
      span({ style: { "margin-left": "12px", "font-weight": 700 } }, () => $count.value()),
      Show(
        () => $count.value() > 0,
        () => p({ style: { "margin-top": "8px" } }, () => i18n.t("counter.positive")),
      ),
    ),

    section(
      { class: "section" },
      h3(null, () => i18n.t("counter.inputTitle")),
      p(null, () => i18n.t("counter.inputHint")),
      input({
        type: "text",
        value: $name.value(),
        "on:change": (e) => vm.setName(e.currentTarget.value),
      }),
      div({ style: { "margin-top": "8px" } }, [
        () => i18n.t("counter.hello"),
        strong(null, () => $name.value()),
      ]),
    ),

    section(
      { class: "section" },
      h3(null, () => i18n.t("counter.listTitle")),
      div({ style: { display: "flex", gap: "8px", "margin-bottom": "8px" } }, [
        button({ "on:click": vm.appendItem }, () => i18n.t("counter.append")),
        button({ class: "secondary", "on:click": vm.resetItems }, () => i18n.t("counter.reset")),
      ]),
      div(
        null,
        List($items, (item) => span({ style: pillStyle }, item)),
      ),
    ),
  );
}, "CounterView");
