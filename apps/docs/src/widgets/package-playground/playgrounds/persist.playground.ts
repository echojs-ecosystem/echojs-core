import { effect, signal } from "@echojs-ecosystem/framework/reactivity";
import { createStore } from "@echojs-ecosystem/framework/store";
import { withMemoryStorage } from "@echojs-ecosystem/framework/persist";
import { button, div, p } from "@echojs-ecosystem/framework/hyperdom";
import type { PackagePlaygroundDef, PlaygroundInstance } from "../types.js";
import { pg } from "../playground-ui.js";

const create = (): PlaygroundInstance => {
  const counter = createStore(0).extend(
    withMemoryStorage({ key: "docs-pg-persist-counter" }),
  );

  const $snapshot = signal<Record<string, unknown>>({
    value: 0,
    hydrated: false,
    pending: false,
  });

  effect(() => {
    $snapshot.set({
      value: counter.value(),
      hydrated: counter.persist.$hydrated.value(),
      pending: counter.persist.$pending.value(),
    });
  });

  void counter.persist.hydrate();

  return {
    $snapshot,
    view: () =>
      div(null, [
        p({ class: pg.hint() }, "Memory storage — survives clicks until you clear."),
        p({ class: pg.metric() }, () => String(counter.value())),
        div({ class: pg.actions() }, [
          button({ class: pg.btnPrimary(), onClick: () => counter.update((v) => v + 1) }, "+1"),
          button({ class: pg.btn(), onClick: () => void counter.persist.save() }, "Save"),
          button({ class: pg.btn(), onClick: () => void counter.persist.clear() }, "Clear storage"),
        ]),
      ]),
  };
};

export const persistPlayground: PackagePlaygroundDef = {
  id: "persist",
  title: "Persist extension",
  hint: "hydrated / pending flags visible in state JSON.",
  available: true,
  create,
};
