// @vitest-environment jsdom
/**
 * DOM re-render tests for url-state + HyperDOM.
 *
 * Reproduces the orders-list anti-pattern: reading query params and derived async
 * data at the top of a dynamic view region causes HyperDOM to tear down and
 * remount the entire subtree on any filter change.
 */
import { computed } from "@echojs-ecosystem/reactivity";
import { h, render } from "@echojs-ecosystem/hyperdom";
import { describe, expect, it } from "vitest";

import { createMemoryUrlStateAdapter } from "../adapters/memory-adapter";
import { createQueryParams } from "./create-query-params";
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
  status: parseAsLiteral(["all", "pending", "paid"] as const).withDefault("all"),
};

const createOrdersLikeFilters = (search = "") =>
  createQueryParams(ordersLikeSchema, {
    adapter: createMemoryUrlStateAdapter(search),
    history: "replace",
  });

const createMountTracker = () => {
  const mountCounts = new Map<string, number>();
  const nodes = new Map<string, Element | null>();

  const track =
    (id: string) =>
    (el: Element | null): void => {
      if (el) {
        mountCounts.set(id, (mountCounts.get(id) ?? 0) + 1);
        nodes.set(id, el);
      } else {
        nodes.set(id, null);
      }
    };

  return { mountCounts, nodes, track };
};

/** Simulates ordersList — refetches when any filter field changes. */
const createListData = (filters: ReturnType<typeof createOrdersLikeFilters>) =>
  computed(() => {
    const f = filters.value();
    return {
      total: f.q.length + f.page,
      q: f.q,
      status: f.status,
    };
  });

describe("integration: DOM re-render on query param changes", () => {
  it("anti-pattern (orders-list style): remounts entire tree when any filter changes", async () => {
    const filters = createOrdersLikeFilters();
    const listData = createListData(filters);
    const container = document.createElement("div");
    const { mountCounts, nodes, track } = createMountTracker();

    render(
      () => {
        const snapshot = filters.value();
        const response = listData.value();

        return h("div", { "data-testid": "page", ref: track("page") }, [
          h("input", {
            "data-testid": "search",
            ref: track("search"),
            value: snapshot.q,
            onInput: (event: Event) => {
              const target = event.currentTarget as HTMLInputElement;
              filters.set({ q: target.value, page: 1 });
            },
          }),
          h("table", { "data-testid": "table", ref: track("table") }, String(response.total)),
        ]);
      },
      container,
    );
    await flush();

    const searchBefore = nodes.get("search");
    const tableBefore = nodes.get("table");
    expect(searchBefore).toBeTruthy();
    expect(mountCounts.get("search")).toBe(1);

    filters.set({ status: "paid", page: 1 });
    await flush();

    expect(nodes.get("search")).not.toBe(searchBefore);
    expect(nodes.get("table")).not.toBe(tableBefore);
    expect(mountCounts.get("search")).toBe(2);
    expect(mountCounts.get("table")).toBe(2);
  });

  it("anti-pattern: remounts search input on q change (focus loss scenario)", async () => {
    const filters = createOrdersLikeFilters();
    const listData = createListData(filters);
    const container = document.createElement("div");
    const { mountCounts, nodes, track } = createMountTracker();

    render(
      () => {
        const snapshot = filters.value();
        const response = listData.value();

        return h("div", null, [
          h("input", {
            "data-testid": "search",
            ref: track("search"),
            value: snapshot.q,
          }),
          h("span", { "data-testid": "total" }, String(response.total)),
        ]);
      },
      container,
    );
    await flush();

    const searchBefore = nodes.get("search");
    filters.set({ q: "echo", page: 1 });
    await flush();

    expect(nodes.get("search")).not.toBe(searchBefore);
    expect(mountCounts.get("search")).toBe(2);
  });

  it("structured view: keeps filter DOM when an unrelated param changes", async () => {
    const filters = createOrdersLikeFilters();
    const listData = createListData(filters);
    const container = document.createElement("div");
    const { mountCounts, nodes, track } = createMountTracker();

    render(
      () =>
        h("div", { "data-testid": "page" }, [
          h("input", {
            "data-testid": "search",
            ref: track("search"),
            value: () => filters.value().q,
            onInput: (event: Event) => {
              const target = event.currentTarget as HTMLInputElement;
              filters.set({ q: target.value, page: 1 });
            },
          }),
          () => {
            const response = listData.value();
            return h("table", { "data-testid": "table", ref: track("table") }, String(response.total));
          },
        ]),
      container,
    );
    await flush();

    const searchBefore = nodes.get("search");
    const tableBefore = nodes.get("table");

    filters.set({ status: "paid", page: 1 });
    await flush();

    expect(nodes.get("search")).toBe(searchBefore);
    expect(mountCounts.get("search")).toBe(1);
    expect(nodes.get("table")).not.toBe(tableBefore);
    expect(mountCounts.get("table")).toBe(2);
  });

  it("structured view: keeps search input DOM while q changes", async () => {
    const filters = createOrdersLikeFilters();
    const listData = createListData(filters);
    const container = document.createElement("div");
    const { mountCounts, nodes, track } = createMountTracker();

    render(
      () =>
        h("div", null, [
          h("input", {
            "data-testid": "search",
            ref: track("search"),
            value: () => filters.value().q,
            onInput: (event: Event) => {
              const target = event.currentTarget as HTMLInputElement;
              filters.set({ q: target.value, page: 1 });
            },
          }),
          () => {
            const response = listData.value();
            return h("span", { "data-testid": "total" }, String(response.total));
          },
        ]),
      container,
    );
    await flush();

    const search = nodes.get("search") as HTMLInputElement;

    filters.set({ q: "e", page: 1 });
    await flush();
    expect(nodes.get("search")).toBe(search);
    expect(search.value).toBe("e");
    expect(mountCounts.get("search")).toBe(1);

    filters.set({ q: "ec", page: 1 });
    await flush();
    expect(nodes.get("search")).toBe(search);
    expect(search.value).toBe("ec");
    expect(mountCounts.get("search")).toBe(1);
  });

  it("structured view: list refetch remounts table but not filter bar", async () => {
    const filters = createOrdersLikeFilters();
    const listData = createListData(filters);
    const container = document.createElement("div");
    const { mountCounts, nodes, track } = createMountTracker();

    render(
      () =>
        h("div", null, [
          h("section", { "data-testid": "filters", ref: track("filters") }, [
            h("input", {
              "data-testid": "search",
              ref: track("search"),
              value: () => filters.value().q,
            }),
          ]),
          h("section", { "data-testid": "content" }, () => {
            const response = listData.value();
            return h("table", { "data-testid": "table", ref: track("table") }, String(response.total));
          }),
        ]),
      container,
    );
    await flush();

    const searchBefore = nodes.get("search");
    const filtersBefore = nodes.get("filters");

    filters.set({ q: "bike", page: 1 });
    await flush();

    expect(nodes.get("search")).toBe(searchBefore);
    expect(nodes.get("filters")).toBe(filtersBefore);
    expect(mountCounts.get("search")).toBe(1);
    expect(mountCounts.get("filters")).toBe(1);
    expect(mountCounts.get("table")).toBe(2);
  });
});
