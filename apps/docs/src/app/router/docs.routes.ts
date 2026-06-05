import { createRoutes } from "@echojs/router";
import { canonicalDocsRouteItems } from "@core/content/nav.js";
import { getDocPage } from "@app/router/doc-pages.js";
import { docsShellLayoutPage } from "@pages/doc/docs.layout.js";

const docChildren = canonicalDocsRouteItems().map((item) => ({
  path: item.contentId,
  name: item.routeName,
  routeView: getDocPage(item.contentId),
}));

export const docsRoutes = createRoutes([
  {
    path: "/docs",
    name: "docs",
    layoutView: docsShellLayoutPage,
    children: docChildren,
  },
]);
