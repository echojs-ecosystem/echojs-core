import { createLayoutView } from "@echojs-ecosystem/router";
import { div, h4, li, p, ul, type Child } from "@echojs-ecosystem/hyperdom";
import { CATALOG_CATEGORIES, findCategory } from "@entities/catalog/demo-data.js";
import { catalogVariantPage } from "@pages/workspace/catalog/catalog-variant.page.js";
import { Breadcrumbs, ParamPill } from "@pages/workspace/ui/breadcrumbs.js";
import { code, NavLink } from "@pages/workspace/ui/common.js";

const catalogQuickLinks = (): Child[] => {
  const items: Child[] = [];
  for (const category of CATALOG_CATEGORIES) {
    const product = category.products[0];
    const variant = product?.variants[0];
    if (!product || !variant) continue;
    items.push(
      li(null, [
        NavLink({
          to: catalogVariantPage,
          params: {
            categoryId: category.id,
            productId: product.id,
            variantId: variant.id,
          },
          query: { tab: "specs" },
          activeClass: "router-nav-active",
          class: "router-user-link",
          children: `${category.name} → ${product.name} → ${variant.name}`,
        }),
      ]),
    );
  }
  return items;
};

export const catalogCategoryLayoutPage = createLayoutView({
  name: "catalog-category-layout",
  view: ({ params, outlet }) => {
    const { categoryId } = params as { categoryId: string };
    const category = findCategory(categoryId);

    return div({ class: "router-page router-page--layout router-nested-layout" }, [
      Breadcrumbs([{ label: "Каталог" }, { label: category?.name ?? categoryId }]),
      h4(null, () => `Категория: ${category?.name ?? categoryId}`),
      p({ class: "router-muted" }, [
        "Паттерн ",
        code(null, "/catalog/:categoryId/product/:productId/variant/:variantId?tab=…"),
        " — ",
        ParamPill("categoryId", categoryId),
      ]),
      ul({ class: "router-nested-links" }, catalogQuickLinks()),
      div({ class: "router-outlet router-outlet--nested" }, outlet() as Child),
    ]);
  },
});

