import { bindField } from "@echojs-ecosystem/form";
import { button, div, h4, input, label, p, span } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";
import { mockLogin } from "@entities/session/index.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { authSignupForm } from "@pages/auth/signup/auth-signup.model.js";

const fieldError = (errors: readonly string[]): Child =>
  errors.length ? div({ class: "router-form-error" }, errors.join(", ")) : null;

export const AuthSignupView = (): Child => {
  const { name, email, password, confirmPassword, acceptTerms } = authSignupForm.fields;

  return div({ class: "router-auth-form" }, [
    h4(null, () => i18n.t("auth.signupTitle")),
    p({ class: "router-muted" }, () => i18n.t("auth.signupHint")),
    label(null, [
      span({ class: "router-form-label" }, () => i18n.t("auth.nameField")),
      input({ ...bindField(name, { variant: "text", controlledValue: true }) }),
      () => fieldError(name.meta().errors),
      p({ class: "router-form-hint" }, () => i18n.t("auth.nameDraftHint")),
    ]),
    label(null, [
      span({ class: "router-form-label" }, () => i18n.t("auth.email")),
      input({ ...bindField(email, { variant: "email" }) }),
      () => fieldError(email.meta().errors),
    ]),
    label(null, [
      span({ class: "router-form-label" }, () => i18n.t("auth.password")),
      input({ ...bindField(password, { variant: "password" }) }),
      () => fieldError(password.meta().errors),
    ]),
    label(null, [
      span({ class: "router-form-label" }, () => i18n.t("auth.confirmPassword")),
      input({ ...bindField(confirmPassword, { variant: "password" }) }),
      () => fieldError(confirmPassword.meta().errors),
    ]),
    label({ class: "router-form-check" }, [
      input({ ...bindField(acceptTerms, { variant: "checkbox" }) }),
      span(null, () => i18n.t("auth.acceptTerms")),
      () => fieldError(acceptTerms.meta().errors),
    ]),
    div({ class: "router-form-actions" }, [
      button(
        {
          type: "button",
          onClick: async () => {
            const res = await authSignupForm.submit(async (values) => {
              mockLogin({
                email: String(values.email),
                password: String(values.password),
                name: String(values.name),
              });
              authLoginPage.go({});
            });
            if (!res.ok) return;
          },
        },
        () => i18n.t("auth.signupSubmit"),
      ),
      button(
        {
          type: "button",
          class: "router-form-link",
          style: "background:transparent;border:none;cursor:pointer;padding:0;",
          onClick: () => authLoginPage.go({}),
        },
        () => i18n.t("auth.hasAccount"),
      ),
    ]),
  ]);
};
