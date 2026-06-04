import { createRoute, redirect } from "@echojs/router";
import { reactivityPage } from "@pages/docs/reactivity/reactivity.page.js";
import { formsPage } from "@pages/docs/forms/forms.page.js";
import { formsNestedPage } from "@pages/docs/forms/nested/forms-nested.page.js";
import { statePage } from "@pages/docs/state/state.page.js";
import { persistencePage } from "@pages/docs/persistence/persistence.page.js";
import { queryPage } from "@pages/docs/query/query.page.js";
import { accountPage } from "@pages/docs/account/account.page.js";
const legacyReactivityRoute = createRoute("legacy-reactivity");
const legacyFormsRoute = createRoute("legacy-forms");
const legacyFormsNestedRoute = createRoute("legacy-forms-nested");
const legacyStateRoute = createRoute("legacy-state");
const legacyPersistenceRoute = createRoute("legacy-persistence");
const legacyQueryRoute = createRoute("legacy-query");
const legacyAccountRoute = createRoute("legacy-account");

export const legacyPathRedirectRoutes = [
  { path: "/reactivity", name: "legacy-reactivity", route: legacyReactivityRoute },
  { path: "/forms", name: "legacy-forms", route: legacyFormsRoute },
  { path: "/forms/nested", name: "legacy-forms-nested", route: legacyFormsNestedRoute },
  { path: "/state", name: "legacy-state", route: legacyStateRoute },
  { path: "/persistence", name: "legacy-persistence", route: legacyPersistenceRoute },
  { path: "/query", name: "legacy-query", route: legacyQueryRoute },
  { path: "/account", name: "legacy-account", route: legacyAccountRoute },
] as const;

redirect({ from: legacyReactivityRoute, to: reactivityPage });
redirect({ from: legacyFormsRoute, to: formsPage });
redirect({ from: legacyFormsNestedRoute, to: formsNestedPage });
redirect({ from: legacyStateRoute, to: statePage });
redirect({ from: legacyPersistenceRoute, to: persistencePage });
redirect({ from: legacyQueryRoute, to: queryPage });
redirect({ from: legacyAccountRoute, to: accountPage });
