import { effect, signal } from "@echojs-ecosystem/framework/reactivity";
import {
  createMemoryUrlStateAdapter,
  createQueryParams,
  parseAsInteger,
  parseAsString,
} from "@echojs-ecosystem/framework/url-state";
import { button, div, input, p } from "@echojs-ecosystem/framework/hyperdom";
import type { PackagePlaygroundDef, PlaygroundInstance } from "../types.js";
import { pg } from "../playground-ui.js";

const adapter = createMemoryUrlStateAdapter("?q=echo&page=1");

const filters = createQueryParams(
  {
    q: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
  },
  { adapter, history: "replace" },
);

const create = (): PlaygroundInstance => {
  const $snapshot = signal<Record<string, unknown>>({});

  effect(() => {
    const v = filters.value();
    $snapshot.set({
      values: v,
      search: adapter.getSearch(),
    });
  });

  return {
    $snapshot,
    view: () =>
      div(null, [
        p({ class: pg.hint() }, "Memory adapter — URL string updates in state panel."),
        input({
          class: pg.input(),
          type: "text",
          value: () => filters.value().q,
          onInput: (e) =>
            filters.set({ ...filters.value(), q: e.currentTarget.value, page: 1 }),
        }),
        div({ class: pg.actions() }, [
          button(
            {
              class: pg.btn(),
              onClick: () =>
                filters.update((v) => ({ ...v, page: Math.max(1, v.page - 1) })),
            },
            "Page −",
          ),
          button(
            {
              class: pg.btnPrimary(),
              onClick: () => filters.update((v) => ({ ...v, page: v.page + 1 })),
            },
            "Page +",
          ),
          button({ class: pg.btn(), onClick: () => filters.reset() }, "Reset"),
        ]),
        p({ class: pg.row() }, () => `page = ${filters.value().page}`),
      ]),
  };
};

export const urlStatePlayground: PackagePlaygroundDef = {
  id: "url-state",
  title: "URL search params",
  hint: "Typed params synced to an in-memory search string.",
  available: true,
  create,
};
