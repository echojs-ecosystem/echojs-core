import { createLayoutView } from "@echojs/router";
import { div, h4, li, p, ul, type Child } from "@echojs/hyperdom";
import { findProduct } from "@entities/catalog/demo-data.js";
import { catalogVariantPage } from "@pages/workspace/catalog/variant/ui/page.js";
import { Breadcrumbs, ParamPill } from "@pages/workspace/ui/breadcrumbs.js";
import { NavLink } from "@pages/workspace/ui/common.js";

export const catalogProductLayoutPage = createLayoutView({
  name: "catalog-product-layout",
  view: ({ params, outlet }) => {
    const { categoryId, productId } = params as { categoryId: string; productId: string };
    const found = findProduct(categoryId, productId);

    return div(
      { class: "router-page router-page--layout router-nested-layout router-nested-layout--level2" },
      [
        Breadcrumbs([
          { label: "Каталог" },
          { label: found?.category.name ?? categoryId },
          { label: found?.product.name ?? productId },
        ]),
        h4(null, () => `Товар: ${found?.product.name ?? productId}`),
        p({ class: "router-muted" }, [
          "Уровень 2 — ",
          ParamPill("categoryId", categoryId),
          " ",
          ParamPill("productId", productId),
        ]),
        ul(
          { class: "router-nested-links" },
          (found?.product.variants ?? []).map((variant) =>
            li(null, [
              NavLink({
                to: catalogVariantPage,
                params: { categoryId, productId, variantId: variant.id },
                query: { tab: "specs" },
                activeClass: "router-nav-active",
                class: "router-user-link",
                children: `${variant.name} (${variant.sku})`,
              }),
            ]),
          ) as Child[],
        ),
        div({ class: "router-outlet router-outlet--nested" }, outlet() as Child),
      ],
    );
  },
});
