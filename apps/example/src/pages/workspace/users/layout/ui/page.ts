import { createLayoutView } from "@echojs/router";
import type { Child } from "@echojs/hyperdom";
import { div, h4, p } from "@echojs/hyperdom";
import { usersListPage } from "@pages/workspace/users/list/ui/page.js";
import { Breadcrumbs } from "@pages/workspace/ui/breadcrumbs.js";
import { code, NavLink } from "@pages/workspace/ui/common.js";

export const usersLayoutPage = createLayoutView({
  name: "users-layout",
  view: ({ outlet }) =>
    div({ class: "router-page router-page--layout" }, [
      Breadcrumbs([
        { label: "Router" },
        { label: "Пользователи", to: usersListPage },
      ]),
      h4(null, "Раздел /users"),
      p({ class: "router-muted" }, [
        "Layout с outlet: список и профиль ",
        code(":id"),
        " + query ",
        code("tab"),
        ". ",
        NavLink({
          to: usersListPage,
          activeClass: "router-nav-active",
          class: "router-form-link",
          children: "К списку",
        }),
      ]),
      div({ class: "router-outlet" }, outlet() as Child),
    ]),
});
