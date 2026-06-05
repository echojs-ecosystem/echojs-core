import { bindField } from "@echojs-ecosystem/form";
import {
  $authUser,
  $isLoggedIn,
  authSessionStore,
  authTokenStore,
  logout,
} from "@entities/session/index.js";
import { getDocsModule } from "@app/config/docs-modules.js";
import { i18n } from "@app/providers/i18n.js";
import { profileForm, saveProfileSnapshot } from "@pages/docs/account/account.model.js";
import type { Child } from "@echojs-ecosystem/hyperdom";
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
} from "@echojs-ecosystem/hyperdom";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";

const meta = getDocsModule("account")!;

const fieldError = (errors: readonly string[]): Child =>
  errors.length ? div({ class: "router-form-error" }, errors.join(", ")) : null;

export const AccountView = (): Child => {
  const { name, email, phones: phonesField } = profileForm.fields;

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
              { type: "button", class: "secondary", onClick: logout },
              () => i18n.t("common.logout"),
            ),
          ]),
          section({ class: "account__profile" }, [
            h4(i18n.t("account.profileTitle")),
            p({ class: "page__hint" }, () => i18n.t("account.profileHint")),
            label(null, [
              span({ class: "router-form-label" }, () => i18n.t("account.nameField")),
              input({ ...bindField(name, { variant: "text", controlledValue: true }) }),
              () => fieldError(name.meta().errors),
            ]),
            label(null, [
              span({ class: "router-form-label" }, () => i18n.t("account.emailField")),
              input({ ...bindField(email, { variant: "email" }) }),
              () => fieldError(email.meta().errors),
            ]),
            div({ class: "demo-persist__phones" }, [
              p({ class: "router-form-label" }, () => i18n.t("account.phones")),
              () =>
                phonesField.$items.value().map((phone, index) =>
                  div({ class: "demo-persist__phone-row" }, [
                    input({
                      class: "control",
                      value: phone,
                      onInput: (e) => {
                        phonesField.updateAt(index, () => e.currentTarget.value);
                      },
                    }),
                    button(
                      {
                        type: "button",
                        class: "secondary",
                        onClick: () => phonesField.removeAt(index),
                      },
                      "×",
                    ),
                  ]),
                ),
              button(
                { type: "button", class: "secondary", onClick: () => phonesField.append("") },
                () => i18n.t("account.addPhone"),
              ),
            ]),
            div({ class: "router-form-actions" }, [
              button(
                {
                  type: "button",
                  onClick: async () => {
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
            { type: "button", onClick: () => authLoginPage.go() },
            () => i18n.t("common.login"),
          ),
        ]),
    ),
  ]);
};
