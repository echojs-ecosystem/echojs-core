import { createRouteView } from "@echojs/router";
import type { Child } from "@echojs/hyperdom";
import { input, label } from "@echojs/hyperdom";
import { createQueryParams, createRouterUrlStateAdapter } from "@echojs/url-state";
import type { QueryParamsState } from "@echojs/url-state";
import {
  debounce,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
} from "@echojs/url-state";
import { appRouter } from "@app/router/index.js";
import { CATALOG_CATEGORIES, type CatalogProduct } from "@entities/catalog/demo-data.js";
import { Breadcrumbs } from "@pages/workspace/ui/breadcrumbs.js";
import { button, code, div, h4, p, pre, section, span } from "@pages/workspace/ui/common.js";

type SortMode = "relevance" | "price_asc" | "price_desc" | "name";
type ViewMode = "grid" | "list";

const allProducts = (): Array<{ categoryId: string; categoryName: string; product: CatalogProduct }> => {
  const out: Array<{ categoryId: string; categoryName: string; product: CatalogProduct }> = [];
  for (const category of CATALOG_CATEGORIES) {
    for (const product of category.products) {
      out.push({ categoryId: category.id, categoryName: category.name, product });
    }
  }
  return out;
};

// Demo: “в наличии” — просто мокаем по id, чтобы было что фильтровать.
const isInStock = (productId: string): boolean => productId.length % 2 === 0;

const productsQuerySchema = {
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  inStock: parseAsBoolean.withDefault(false),
  sort: parseAsLiteral(["relevance", "price_asc", "price_desc", "name"] as const).withDefault(
    "relevance" satisfies SortMode,
  ),
  view: parseAsLiteral(["grid", "list"] as const).withDefault("grid" satisfies ViewMode),
  tag: parseAsArrayOf(parseAsString).withDefault([]),
} as const;

let productsQuery: QueryParamsState<typeof productsQuerySchema> | null = null;

const getProductsQuery = (): QueryParamsState<typeof productsQuerySchema> => {
  if (productsQuery) return productsQuery;
  productsQuery = createQueryParams(productsQuerySchema, {
    adapter: createRouterUrlStateAdapter(appRouter),
    // Чтобы набор символов в input не спамил history/URL.
    limitUrlUpdates: debounce(150),
    clearOnDefault: true,
    shallow: true,
    history: "replace",
    urlKeys: { inStock: "stock" },
  });
  return productsQuery;
};

const tagBtn = (active: boolean): Record<string, string> => ({
  padding: "6px 10px",
  border: "1px solid var(--gray-300)",
  "border-radius": "999px",
  background: active ? "var(--primary)" : "white",
  color: active ? "white" : "var(--gray-900)",
  cursor: "pointer",
});

export const workspaceProductsPage = createRouteView({
  name: "workspace-products",
  view: (): Child => {
    const state = getProductsQuery();
    const q = state.value();

    const source = allProducts();
    const filtered = source
      .filter((item) => {
        if (!q.q.trim()) return true;
        const needle = q.q.trim().toLowerCase();
        return (
          item.product.name.toLowerCase().includes(needle) ||
          item.categoryName.toLowerCase().includes(needle) ||
          item.product.id.toLowerCase().includes(needle)
        );
      })
      .filter((item) => (q.inStock ? isInStock(item.product.id) : true))
      .filter((item) =>
        q.tag.length ? q.tag.some((t: string) => item.product.name.toLowerCase().includes(t)) : true,
      );

    const sorted = [...filtered].sort((a, b) => {
      if (q.sort === "name") return a.product.name.localeCompare(b.product.name);
      if (q.sort === "price_asc") return a.product.id.localeCompare(b.product.id);
      if (q.sort === "price_desc") return b.product.id.localeCompare(a.product.id);
      return 0;
    });

    const pageSize = 4;
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const safePage = Math.min(Math.max(1, q.page), totalPages);
    const start = (safePage - 1) * pageSize;
    const items = sorted.slice(start, start + pageSize);

    if (safePage !== q.page) state.set({ page: safePage });

    const setPage = (next: number): void => {
      state.set({ page: next }, { history: "push" });
    };

    const ProductCard = (item: (typeof items)[number]): Child =>
      section(
        {
          class: "workspace-card",
          style: {
            padding: "12px",
            display: "grid",
            gap: "6px",
          },
        },
        [
          p(null, [code(null, item.categoryId), " / ", span(null, item.categoryName)]),
          h4(null, item.product.name),
          p({ class: "router-muted" }, [
            "id: ",
            code(null, item.product.id),
            " • variants: ",
            code(null, String(item.product.variants.length)),
            " • stock: ",
            code(null, isInStock(item.product.id) ? "in" : "out"),
          ]),
        ],
      );

    const toggleTag = (tag: string): void => {
      const current = state.value().tag;
      const next = current.includes(tag) ? current.filter((t: string) => t !== tag) : [...current, tag];
      state.set({ tag: next, page: 1 });
    };

    const activeTags = state.value().tag;
    const tags = ["phone", "lamp", "pad"] as const;

    return div({ class: "router-page" }, [
      Breadcrumbs([{ label: "Workspace" }, { label: "Товары (URL state)" }]),
      h4(null, "Товары — фильтры в URL"),
      p({ class: "router-muted" }, [
        "Это демо показывает ",
        code(null, "@echojs/url-state"),
        ": значения фильтров типизированы парсерами, живут в ",
        code(null, "search params"),
        ", и синхронизируются как state (без React/Vue/Solid).",
      ]),

      section({ class: "workspace-card", style: { display: "grid", gap: "10px" } }, [
        div({ style: { display: "grid", gap: "6px" } }, [
          p({ class: "router-form-label" }, "Поиск (q)"),
          input({
            class: "control",
            value: q.q,
            placeholder: "например: phone / lamp / electronics",
            "on:input": (e: { currentTarget: HTMLInputElement }) => {
              state.set({ q: e.currentTarget.value, page: 1 });
            },
          }),
        ]),

        label({ style: { display: "flex", gap: "10px", "align-items": "center" } }, [
          input({
            type: "checkbox",
            checked: q.inStock,
            "on:change": (e: { currentTarget: HTMLInputElement }) => {
              state.set({ inStock: e.currentTarget.checked, page: 1 });
            },
          }),
          span(null, ["Только в наличии (", code(null, "stock"), ")"]),
        ]),

        div({ style: { display: "grid", gap: "6px" } }, [
          p({ class: "router-form-label" }, "Теги (repeated key)"),
          div({ style: { display: "flex", gap: "8px", "flex-wrap": "wrap" } }, [
            ...tags.map((t) =>
              button(
                {
                  type: "button",
                  style: tagBtn(activeTags.includes(t)),
                  "on:click": () => toggleTag(t),
                },
                t,
              ),
            ),
            button(
              { type: "button", class: "secondary", "on:click": () => state.set({ tag: [], page: 1 }) },
              "Очистить",
            ),
          ]),
        ]),

        div({ style: { display: "flex", gap: "10px", "align-items": "center", "flex-wrap": "wrap" } }, [
          button(
            { type: "button", class: "secondary", "on:click": () => state.set({ sort: "relevance", page: 1 }) },
            "Sort: relevance",
          ),
          button(
            { type: "button", class: "secondary", "on:click": () => state.set({ sort: "name", page: 1 }) },
            "Sort: name",
          ),
          button(
            { type: "button", class: "secondary", "on:click": () => state.set({ sort: "price_asc", page: 1 }) },
            "Sort: price_asc",
          ),
          button(
            { type: "button", class: "secondary", "on:click": () => state.set({ sort: "price_desc", page: 1 }) },
            "Sort: price_desc",
          ),
        ]),

        div({ style: { display: "flex", gap: "10px", "align-items": "center" } }, [
          button(
            { type: "button", class: "secondary", "on:click": () => state.set({ view: "grid" }) },
            "View: grid",
          ),
          button(
            { type: "button", class: "secondary", "on:click": () => state.set({ view: "list" }) },
            "View: list",
          ),
          button({ type: "button", class: "secondary", "on:click": () => state.reset() }, "Reset"),
          button({ type: "button", class: "secondary", "on:click": () => state.clear() }, "Clear"),
        ]),
      ]),

      p({ class: "router-muted" }, () => `Результатов: ${sorted.length} • страница ${safePage}/${totalPages}`),
      div(
        {
          style:
            q.view === "grid"
              ? { display: "grid", gap: "10px", "grid-template-columns": "repeat(2, minmax(0, 1fr))" }
              : { display: "grid", gap: "10px" },
        },
        items.map(ProductCard),
      ),

      div({ style: { display: "flex", gap: "8px", margin: "12px 0" } }, [
        button(
          { type: "button", class: "secondary", "on:click": () => setPage(Math.max(1, safePage - 1)) },
          "← Prev",
        ),
        button(
          { type: "button", class: "secondary", "on:click": () => setPage(Math.min(totalPages, safePage + 1)) },
          "Next →",
        ),
      ]),

      pre({ class: "router-playground-code" }, () =>
        JSON.stringify(
          {
            url: appRouter.$fullPath.value(),
            queryState: state.value(),
          },
          null,
          2,
        ),
      ),
    ]);
  },
});

