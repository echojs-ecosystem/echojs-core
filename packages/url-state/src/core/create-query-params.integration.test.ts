// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { createView, h, render } from "@echojs-ecosystem/hyperdom";

import { createMemoryUrlStateAdapter } from "../adapters/memory-adapter";
import { createQueryParams } from "../core/create-query-params";
import { parseAsArrayOf } from "../parsers/array";
import { parseAsBoolean } from "../parsers/boolean";
import { parseAsInteger } from "../parsers/integer";
import { parseAsLiteral } from "../parsers/literal";
import { parseAsString } from "../parsers/string";

const flush = async (): Promise<void> => {
  await Promise.resolve();
  await Promise.resolve();
};

const ordersLikeSchema = {
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  status: parseAsLiteral(["all", "pending", "paid", "shipped", "refunded"] as const).withDefault("all"),
  priority: parseAsBoolean.withDefault(false),
  tag: parseAsArrayOf(parseAsString).withDefault([]),
};

const createOrdersLikeFilters = (search = "") =>
  createQueryParams(ordersLikeSchema, {
    adapter: createMemoryUrlStateAdapter(search),
    defaultVisibility: "show",
    shallow: true,
    history: "replace",
    urlKeys: { priority: "prio" },
  });

describe("integration: createQueryParams re-render stability", () => {
  it("partial set preserves references for unchanged fields", async () => {
    const filters = createOrdersLikeFilters();
    const initial = filters.value();

    filters.set({ q: "a" });
    await flush();
    const afterQ = filters.value();

    expect(afterQ.page).toBe(initial.page);
    expect(afterQ.status).toBe(initial.status);
    expect(afterQ.priority).toBe(initial.priority);
    expect(afterQ.tag).toBe(initial.tag);

    filters.set({ status: "paid" });
    await flush();
    const afterStatus = filters.value();

    expect(afterStatus.q).toBe(afterQ.q);
    expect(afterStatus.page).toBe(afterQ.page);
    expect(afterStatus.tag).toBe(afterQ.tag);
  });

  it("emits once per user set after adapter round-trip", async () => {
    const filters = createOrdersLikeFilters();
    let notifications = 0;
    const unsub = filters.subscribe(() => {
      notifications += 1;
    });

    filters.set({ q: "echo" });
    await flush();
    unsub();

    expect(notifications).toBe(1);
  });

  it("skips signal update when partial set only repeats current values", async () => {
    const filters = createOrdersLikeFilters("?q=bike&page=2&status=paid");
    let notifications = 0;
    const unsub = filters.subscribe(() => {
      notifications += 1;
    });

    filters.set({ page: 2, status: "paid" });
    await flush();
    unsub();

    expect(notifications).toBe(0);
  });

  it("adapter sync does not emit when URL matches current snapshot", async () => {
    const adapter = createMemoryUrlStateAdapter("?q=bike&page=1");
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(""),
        page: parseAsInteger.withDefault(1),
      },
      { adapter },
    );

    let notifications = 0;
    const unsub = filters.subscribe(() => {
      notifications += 1;
    });

    filters.set({ q: "bike" });
    await flush();
    unsub();

    expect(notifications).toBe(0);
  });

  it("preserves search input DOM node when another filter changes (HyperDOM)", async () => {
    const filters = createOrdersLikeFilters();
    const container = document.createElement("div");

    const FilterBarView = createView(
      () =>
        h("div", null, [
          h("input", {
            "data-testid": "search",
            value: () => filters.value().q,
            onInput: (event: Event) => {
              const target = event.currentTarget as HTMLInputElement;
              filters.set({ q: target.value, page: 1 });
            },
          }),
          h("button", {
            type: "button",
            "data-testid": "status-paid",
            onClick: () => filters.set({ status: "paid", page: 1 }),
          }),
        ]),
      "FilterBarView",
    );

    render(FilterBarView(), container);

    const input = container.querySelector('[data-testid="search"]') as HTMLInputElement;
    const statusButton = container.querySelector('[data-testid="status-paid"]') as HTMLButtonElement;

    statusButton.click();
    await flush();

    expect(container.querySelector('[data-testid="search"]')).toBe(input);
    expect(filters.value().status).toBe("paid");
  });

  it("preserves search input DOM node while query updates (HyperDOM)", async () => {
    const filters = createOrdersLikeFilters();
    const container = document.createElement("div");

    const SearchInputView = createView(
      () =>
        h("input", {
          "data-testid": "search",
          value: () => filters.value().q,
          onInput: (event: Event) => {
            const target = event.currentTarget as HTMLInputElement;
            filters.set({ q: target.value, page: 1 });
          },
        }),
      "SearchInputView",
    );

    render(SearchInputView(), container);

    const input = container.querySelector('[data-testid="search"]') as HTMLInputElement;

    filters.set({ q: "e", page: 1 });
    await flush();
    expect(container.querySelector('[data-testid="search"]')).toBe(input);
    expect(input.value).toBe("e");

    filters.set({ q: "ec", page: 1 });
    await flush();
    expect(container.querySelector('[data-testid="search"]')).toBe(input);
    expect(input.value).toBe("ec");
  });
});
