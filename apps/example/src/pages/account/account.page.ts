import { bindField } from "@echojs/form";
import { createRouteView } from "@echojs/router";
import {
  $authUser,
  $isLoggedIn,
  authSessionStore,
  authTokenStore,
  logout,
} from "@entities/session/index.js";
import { getModule } from "@app/config/lab-modules.js";
import { i18n } from "@app/i18n/index.js";
import { profileForm, profileUi, saveProfileSnapshot } from "@pages/account/account.model.js";
import type { Child } from "@echojs/hyperdom";
import {
  button,
  code,
  div,
  h4,
  input,
  label,
  p,
  pre,
  section,
  Show,
  span,
} from "@echojs/hyperdom";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";

const meta = getModule("account")!;

const fieldError = (errors: readonly string[]): Child =>
  errors.length ? div({ class: "router-form-error" }, errors.join(", ")) : null;

export const accountPage = createRouteView({
  name: "account",
  view: () => {
    const ui = profileUi;
    const phonesField = profileForm.fields.phones;

    return section({ class: "page page--feature" }, [
      ModuleHeader(meta),
      Show(
        () => $isLoggedIn.value(),
        () =>
          div({ class: "account" }, [
            section({ class: "account__session" }, [
              h4(null, () => i18n.t("account.sessionTitle")),
              p(null, [
                () => i18n.t("account.nameLabel"),
                " ",
                span({ class: "account__strong" }, () => $authUser.value()?.name ?? "—"),
              ]),
              p(null, [() => i18n.t("account.emailLabel"), " ", () => $authUser.value()?.email ?? "—"]),
              p(null, [
                () => i18n.t("account.tokenLabel"),
                " ",
                code(null, () => {
                  const t = authTokenStore.value();
                  return t ? `${t.slice(0, 28)}…` : "—";
                }),
              ]),
              pre({ class: "account__json" }, () =>
                JSON.stringify(
                  {
                    token: authSessionStore.token.value(),
                    user: authSessionStore.user.value(),
                  },
                  null,
                  2,
                ),
              ),
              button(
                { type: "button", class: "secondary", "on:click": logout },
                () => i18n.t("common.logout"),
              ),
            ]),
            section({ class: "account__profile" }, [
              h4(null, () => i18n.t("account.profileTitle")),
              p({ class: "page__hint" }, () => i18n.t("account.profileHint")),
              label(null, [
                span({ class: "router-form-label" }, () => i18n.t("account.nameField")),
                input({ ...bindField(ui.name, { variant: "text", controlledValue: true }) }),
                () => fieldError(ui.name.meta().errors),
              ]),
              label(null, [
                span({ class: "router-form-label" }, () => i18n.t("account.emailField")),
                input({ ...bindField(ui.email, { variant: "email" }) }),
                () => fieldError(ui.email.meta().errors),
              ]),
              div({ class: "demo-persist__phones" }, [
                p({ class: "router-form-label" }, () => i18n.t("account.phones")),
                () =>
                  phonesField.$items.value().map((phone, index) =>
                    div({ class: "demo-persist__phone-row" }, [
                      input({
                        class: "control",
                        value: phone,
                        "on:input": (e: { currentTarget: HTMLInputElement }) => {
                          phonesField.updateAt(index, () => e.currentTarget.value);
                        },
                      }),
                      button(
                        {
                          type: "button",
                          class: "secondary",
                          "on:click": () => phonesField.removeAt(index),
                        },
                        "×",
                      ),
                    ]),
                  ),
                button(
                  { type: "button", class: "secondary", "on:click": () => phonesField.append("") },
                  () => i18n.t("account.addPhone"),
                ),
              ]),
              div({ class: "router-form-actions" }, [
                button(
                  {
                    type: "button",
                    "on:click": async () => {
                      await profileForm.submit(async () => saveProfileSnapshot());
                    },
                  },
                  () => i18n.t("account.saveSnapshot"),
                ),
              ]),
            ]),
          ]),
        () =>
          div({ class: "account__guest" }, [
            p(null, () => i18n.t("account.guestHint")),
            button(
              { type: "button", "on:click": () => authLoginPage.go({}) },
              () => i18n.t("common.login"),
            ),
          ]),
      ),
    ]);
  },
});
