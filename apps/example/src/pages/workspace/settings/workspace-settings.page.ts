import { createRouteView } from "@echojs-ecosystem/router";
import { code, div, h4, p, Show } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";
import { $authUser, $isLoggedIn, authTokenStore } from "@entities/session/index.js";

export const settingsPage = createRouteView({
  name: "settings",
  view: () =>
    div({ class: "router-page" }, [
      h4(null, () => i18n.t("workspace.settings.title")),
      p(null, () => i18n.t("workspace.settings.guardHint")),
      Show(
        () => $isLoggedIn.value(),
        () =>
          div(null, [
            p(null, () =>
              i18n.t("workspace.settings.hello", {
                name: $authUser.value()?.name ?? i18n.t("workspace.settings.guestName"),
              }),
            ),
            p(null, ["Email: ", () => $authUser.value()?.email ?? "—"]),
            p({ class: "router-muted" }, [
              "Token (cookie ",
              code(null, "echojs-access-token"),
              "): ",
              () =>
                authTokenStore.value()
                  ? i18n.t("workspace.settings.tokenYes")
                  : i18n.t("workspace.settings.tokenNo"),
            ]),
          ]),
        () => p(null, () => i18n.t("workspace.settings.redirectHint")),
      ),
    ]),
});
