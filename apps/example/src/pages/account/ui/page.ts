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
import { profileForm, profileFormSnapshotStore, profileUi, saveProfileSnapshot } from "@pages/account/model.js";
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
import { authLoginPage } from "@pages/auth/login/ui/page.js";

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
              h4(null, "Сессия"),
              p(null, ["Имя: ", span({ class: "account__strong" }, () => $authUser.value()?.name ?? "—")]),
              p(null, ["Email: ", () => $authUser.value()?.email ?? "—"]),
              p(null, [
                "Token: ",
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
              button({ type: "button", class: "secondary", "on:click": logout }, "Выйти"),
            ]),
            section({ class: "account__profile" }, [
              h4(null, "Профиль (форма + persist)"),
              p({ class: "page__hint" }, "Поля и массив телефонов сохраняются в localStorage автоматически."),
              label(null, [
                span({ class: "router-form-label" }, "Имя"),
                input({ ...bindField(ui.name, { variant: "text", controlledValue: true }) }),
                () => fieldError(ui.name.meta().errors),
              ]),
              label(null, [
                span({ class: "router-form-label" }, "Email"),
                input({ ...bindField(ui.email, { variant: "email" }) }),
                () => fieldError(ui.email.meta().errors),
              ]),
              div({ class: "demo-persist__phones" }, [
                p({ class: "router-form-label" }, "Телефоны"),
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
                  "+ телефон",
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
                  "Сохранить снимок формы",
                ),
              ]),
            ]),
          ]),
        () =>
          div({ class: "account__guest" }, [
            p(null, "Раздел доступен после входа — используется mock-авторизация с persist."),
            button({ type: "button", "on:click": () => authLoginPage.go({}) }, "Войти"),
          ]),
      ),
    ]);
  },
});
