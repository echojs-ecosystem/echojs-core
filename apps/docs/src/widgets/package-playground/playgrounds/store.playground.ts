import { effect, signal } from "@echojs-ecosystem/reactivity";
import { createStore, select, withActions } from "@echojs-ecosystem/store";
import { button, div, p } from "@echojs-ecosystem/hyperdom";
import type { PackagePlaygroundDef, PlaygroundInstance } from "../types.js";
import { pg } from "../playground-ui.js";

const create = (): PlaygroundInstance => {
  const counter = createStore(0, { name: "pg-counter" }).extend(
    withActions({
      inc: (s) => () => s.set(Number(s.value()) + 1),
      add: (s) => (n: number) => s.set(Number(s.value()) + n),
    }),
  );
  const theme = createStore("light" as "light" | "dark", { name: "pg-theme" }).extend(
    withActions({
      toggle: (s) => () => s.update((t) => (t === "light" ? "dark" : "light")),
    }),
  );
  const label = select(counter, (n) => `×${n}`, { name: "pg-label" });

  const $snapshot = signal<Record<string, unknown>>({});

  effect(() => {
    $snapshot.set({
      counter: counter.value(),
      label: label.value(),
      theme: theme.value(),
    });
  });

  return {
    $snapshot,
    view: () =>
      div(null, [
        p({ class: pg.hint() }, "Store + withActions + select derived store."),
        p({ class: pg.metric() }, () => label.value()),
        p({ class: pg.row() }, () => `theme = ${theme.value()}`),
        div({ class: pg.actions() }, [
          button({ class: pg.btnPrimary(), onClick: () => counter.inc() }, "+1"),
          button({ class: pg.btn(), onClick: () => counter.add(5) }, "+5"),
          button({ class: pg.btn(), onClick: () => theme.toggle() }, "Toggle theme"),
        ]),
      ]),
  };
};

export const storePlayground: PackagePlaygroundDef = {
  id: "store",
  title: "Store & actions",
  hint: "Mutations go through store actions; select mirrors counter.",
  available: true,
  create,
};
