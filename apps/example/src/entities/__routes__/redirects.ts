import { redirect } from "@echojs/router";
import {
  legacyExample1Route,
  legacyExample3Route,
  legacyExample4Route,
  legacyPersistRoute,
  legacyStoreRoute,
  legacyUserRoute,
} from "@entities/__routes__/legacy.routes.js";
import { userPage } from "@pages/workspace/users/detail/ui/page.js";
import { reactivityPage } from "@pages/reactivity/ui/page.js";
import { formsPage } from "@pages/forms/ui/page.js";
import { formsNestedPage } from "@pages/forms/nested/ui/page.js";
import { statePage } from "@pages/state/ui/page.js";
import { persistencePage } from "@pages/persistence/ui/page.js";

redirect({
  from: legacyUserRoute,
  to: userPage,
  mapParams: ({ id }) => ({ id }),
  mapQuery: () => ({ tab: "profile" as const }),
});

redirect({ from: legacyExample1Route, to: reactivityPage });
redirect({ from: legacyExample3Route, to: formsPage });
redirect({ from: legacyExample4Route, to: formsNestedPage });
redirect({ from: legacyStoreRoute, to: statePage });
redirect({ from: legacyPersistRoute, to: persistencePage });
