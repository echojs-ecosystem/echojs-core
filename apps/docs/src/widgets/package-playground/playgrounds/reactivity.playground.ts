import { batch, computed, effect, signal } from "@echojs-ecosystem/framework/reactivity";
import { button, div, input, p, span } from "@echojs-ecosystem/framework/hyperdom";
import type { PackagePlaygroundDef, PlaygroundInstance } from "../types.js";
import { pg } from "../playground-ui.js";

const create = (): PlaygroundInstance => {
  const $count = signal(0);
  const $name = signal("Echo");
  const $snapshot = signal<Record<string, unknown>>({ count: 0, name: "Echo" });

  const $doubled = computed(() => $count.value() * 2);

  effect(() => {
    $snapshot.set({
      count: $count.value(),
      name: $name.value(),
      doubled: $doubled.value(),
    });
  });

  return {
    $snapshot,
    view: () =>
      div(null, [
        p({ class: pg.hint() }, "Signals update the preview and the state panel."),
        div({ class: pg.metric() }, () => String($count.value())),
        p({ class: pg.row() }, () => `computed doubled = ${$doubled.value()}`),
        div({ class: pg.actions() }, [
          button({ class: pg.btnPrimary(), onClick: () => $count.update((n) => n + 1) }, "+1"),
          button({
            class: pg.btn(),
            onClick: () =>
              batch(() => {
                $count.set(0);
                $name.set("Echo");
              }),
          }, "Reset batch"),
        ]),
        input({
          class: pg.input(),
          type: "text",
          value: () => $name.value(),
          onInput: (e) => $name.set(e.currentTarget.value),
        }),
        p({ class: pg.row() }, [span(null, "Hello, "), () => $name.value()]),
      ]),
  };
};

export const reactivityPlayground: PackagePlaygroundDef = {
  id: "reactivity",
  title: "Signals & computed",
  hint: "Click buttons and edit the input — watch JSON state update live.",
  available: true,
  create,
};
