import { createRouteView } from "@echojs-ecosystem/router";
import { bindField } from "@echojs-ecosystem/form";
import { createField, createForm } from "@echojs-ecosystem/form";
import { button, div, h4, input, label, p, pre, span } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { z } from "zod";
import { findVariant } from "@entities/catalog/demo-data.js";
import { Breadcrumbs, ParamPill } from "@pages/workspace/ui/breadcrumbs.js";
import { code } from "@pages/workspace/ui/common.js";

type VariantTab = "specs" | "stock" | "order";

const tabBtn = (active: boolean): Record<string, string> => ({
  padding: "6px 12px",
  border: "1px solid var(--gray-300)",
  "border-radius": "6px",
  background: active ? "var(--primary)" : "white",
  color: active ? "white" : "var(--gray-900)",
  cursor: "pointer",
});

const orderSchema = z.object({
  quantity: z.coerce.number().int().min(1).max(99),
  note: z.string().max(120).optional(),
});

const orderForm = createForm(
  { quantity: createField(1), note: createField("") },
  { name: "CatalogVariantOrderForm", validationSchema: orderSchema, defaultValues: { quantity: 1, note: "" } },
);

const fieldError = (errors: readonly string[]): Child =>
  errors.length ? div({ class: "router-form-error" }, errors.join(", ")) : null;

export const catalogVariantPage = createRouteView<
  { categoryId: string; productId: string; variantId: string },
  { tab?: VariantTab }
>({
  name: "catalog-variant",
  view: ({ params, query }) => {
    const { quantity, note } = orderForm.fields;
    const tab = query.tab ?? "specs";
    const found = findVariant(params.categoryId, params.productId, params.variantId);
    const setTab = (next: VariantTab): void => {
      catalogVariantPage.go(
        {
          categoryId: params.categoryId,
          productId: params.productId,
          variantId: params.variantId,
        },
        { query: { tab: next }, replace: true },
      );
    };

    return div({ class: "router-page" }, [
      Breadcrumbs([
        { label: "Каталог" },
        { label: found?.category.name ?? params.categoryId },
        { label: found?.product.name ?? params.productId },
        { label: found?.variant.name ?? params.variantId },
      ]),
      h4(null, () => found?.variant.name ?? params.variantId),
      p({ class: "router-muted" }, [
        "Лист с ",
        code(null, ":categoryId/:productId/:variantId"),
        " и вкладками; на ",
        code(null, "order"),
        " — форма заказа.",
      ]),
      div({ class: "router-param-row" }, [
        ParamPill("categoryId", params.categoryId),
        ParamPill("productId", params.productId),
        ParamPill("variantId", params.variantId),
        span({ class: "router-param-pill" }, ["tab = ", span(null, tab)]),
      ]),
      div({ class: "router-tabs", style: { display: "flex", gap: "8px", margin: "12px 0" } }, [
        button({ style: tabBtn(tab === "specs"), onClick: () => setTab("specs") }, "Характеристики"),
        button({ style: tabBtn(tab === "stock"), onClick: () => setTab("stock") }, "Склад"),
        button({ style: tabBtn(tab === "order"), onClick: () => setTab("order") }, "Заказ"),
      ]),
      tab === "specs"
        ? p(null, () => `SKU: ${found?.variant.sku ?? "—"}`)
        : tab === "stock"
          ? p(null, "На складе: 42 шт. (мок)")
          : div({ class: "router-auth-form router-auth-form--inline" }, [
              label(null, [
                span({ class: "router-form-label" }, "Количество"),
                input({
                  ...bindField(quantity, { variant: "number", controlledValue: true }),
                }),
                () => fieldError(quantity.meta().errors),
              ]),
              label(null, [
                span({ class: "router-form-label" }, "Комментарий"),
                input({
                  ...bindField(note, { variant: "text", controlledValue: true }),
                }),
              ]),
              button(
                {
                  type: "button",
                  onClick: async () => {
                    await orderForm.submit(async (value) => {
                      console.log("order", { ...value, sku: found?.variant.sku });
                    });
                  },
                },
                "Оформить",
              ),
            ]),
      pre({ class: "router-playground-code" }, () => JSON.stringify({ params, query: { tab } }, null, 2)),
    ]);
  },
});

