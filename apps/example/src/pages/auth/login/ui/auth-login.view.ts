import { bindField } from "@echojs-ecosystem/form";
import { button, div, h4, input, label, p, span } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";
import { mockLogin } from "@entities/session/index.js";
import { docsHomePage } from "@pages/docs/home/docs-home.page.js";
import { authSignupPage } from "@pages/auth/signup/auth-signup.page.js";
import { authLoginForm } from "@pages/auth/login/auth-login.model.js";

const fieldError = (errors: readonly string[]): Child =>
  errors.length ? div({ class: "router-form-error" }, errors.join(", ")) : null;

export const AuthLoginView = (): Child => {
  const { email, password, remember } = authLoginForm.fields;

  return div({ class: "router-auth-form" }, [
    h4(null, () => i18n.t("auth.loginTitle")),
    p({ class: "router-muted" }, () => i18n.t("auth.loginHint")),
    label(null, [
      span({ class: "router-form-label" }, () => i18n.t("auth.email")),
      input({ ...bindField(email, { variant: "email" }) }),
      () => fieldError(email.meta().errors),
      p({ class: "router-form-hint" }, () => i18n.t("auth.emailDraftHint")),
    ]),
    label(null, [
      span({ class: "router-form-label" }, () => i18n.t("auth.password")),
      input({ ...bindField(password, { variant: "password" }) }),
      () => fieldError(password.meta().errors),
    ]),
    label({ class: "router-form-check" }, [
      input({ ...bindField(remember, { variant: "checkbox" }) }),
      span(null, () => i18n.t("auth.remember")),
    ]),
    div({ class: "router-form-actions" }, [
      button(
        {
          type: "button",
          onClick: async () => {
            const res = await authLoginForm.submit(async (values) => {
              mockLogin({
                email: String(values.email),
                password: String(values.password),
              });
              docsHomePage.go({});
            });
            if (!res.ok) return;
          },
        },
        () => i18n.t("common.login"),
      ),
      button(
        {
          type: "button",
          class: "router-form-link",
          style: "background:transparent;border:none;cursor:pointer;padding:0;",
          onClick: () => authSignupPage.go({}),
        },
        () => i18n.t("auth.createAccount"),
      ),
    ]),
  ]);
};
