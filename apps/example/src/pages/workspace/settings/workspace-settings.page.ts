import { createRouteView } from "@echojs/router";
import { code, div, h4, p, Show } from "@echojs/hyperdom";
import { $authUser, $isLoggedIn, authTokenStore } from "@entities/session/index.js";

export const settingsPage = createRouteView({
  name: "settings",
  view: () =>
    div({ class: "router-page" }, [
      h4(null, "Настройки"),
      p(null, "Доступ через guardRoute — только для авторизованных."),
      Show(
        () => $isLoggedIn.value(),
        () =>
          div(null, [
            p(null, ["Привет, ", () => $authUser.value()?.name ?? "пользователь", "!"]),
            p(null, ["Email: ", () => $authUser.value()?.email ?? "—"]),
            p({ class: "router-muted" }, [
              "Токен (cookie ",
              code(null, "echojs-access-token"),
              "): ",
              () => (authTokenStore.value() ? "есть" : "нет"),
            ]),
          ]),
        () => p(null, "Без входа — редирект на /auth/login."),
      ),
    ]),
});

