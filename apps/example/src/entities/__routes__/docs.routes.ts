import { createRoutes } from "@echojs-ecosystem/router";
import { docsShellLayoutPage } from "@pages/docs/layout/docs-shell-layout.page.js";
import { docsHomePage } from "@pages/docs/home/docs-home.page.js";
import { reactivityPage } from "@pages/docs/reactivity/reactivity.page.js";
import { formsPage } from "@pages/docs/forms/forms.page.js";
import { formsNestedPage } from "@pages/docs/forms/nested/forms-nested.page.js";
import { statePage } from "@pages/docs/state/state.page.js";
import { persistencePage } from "@pages/docs/persistence/persistence.page.js";
import { queryPage } from "@pages/docs/query/query.page.js";
import { accountPage } from "@pages/docs/account/account.page.js";
import {
  legacyExample1Route,
  legacyExample3Route,
  legacyExample4Route,
  legacyPersistRoute,
  legacyStoreRoute,
} from "@entities/__routes__/legacy.routes.js";

export const docsRoutes = createRoutes([
  {
    path: "/docs",
    name: "docs",
    layoutView: docsShellLayoutPage,
    children: [
      { path: "/", name: "docs-home", routeView: docsHomePage },
      { path: "reactivity", name: "reactivity", routeView: reactivityPage },
      { path: "forms", name: "forms", routeView: formsPage },
      { path: "forms/nested", name: "forms-nested", routeView: formsNestedPage },
      { path: "state", name: "state", routeView: statePage },
      { path: "persistence", name: "persistence", routeView: persistencePage },
      { path: "query", name: "query", routeView: queryPage },
      { path: "account", name: "account", routeView: accountPage },
      { path: "example1", name: "legacy-example1", route: legacyExample1Route },
      { path: "example3", name: "legacy-example3", route: legacyExample3Route },
      { path: "example4", name: "legacy-example4", route: legacyExample4Route },
      { path: "store", name: "legacy-store", route: legacyStoreRoute },
      { path: "persist", name: "legacy-persist", route: legacyPersistRoute },
    ],
  },
]);
