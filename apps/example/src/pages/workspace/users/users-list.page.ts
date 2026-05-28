import { createRouteView } from "@echojs/router";
import { div, h4, li, NavLink, ul } from "@pages/workspace/ui/common.js";
import { USERS } from "@entities/user/index.js";
import { userPage } from "@pages/workspace/users/user-detail.page.js";

export const usersListPage = createRouteView({
  name: "users-list",
  view: () =>
    div({ class: "router-page" }, [
      h4(null, "Список"),
      ul({ class: "router-user-list" }, [
        ...USERS.map((user) =>
          li(null, [
            NavLink({
              to: userPage,
              params: { id: user.id },
              query: { tab: "profile" },
              activeClass: "router-nav-active",
              class: "router-user-link",
              children: `${user.name} (${user.role})`,
            }),
          ]),
        ),
      ]),
    ]),
});

