import { bindField } from "@echojs/form";
import { button, div, h4, input, label, p, span } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { createRouteView } from "@echojs/router";
import { mockLogin } from "@entities/session/index.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { authSignupForm, authSignupUi } from "@pages/auth/signup/auth-signup.model.js";

const fieldError = (errors: readonly string[]): Child =>
  errors.length ? div({ class: "router-form-error" }, errors.join(", ")) : null;

export const authSignupPage = createRouteView({
  name: "auth-signup",
  view: () => {
    const ui = authSignupUi;

    return div({ class: "router-auth-form" }, [
      h4(null, "Регистрация"),
      p({ class: "router-muted" }, "Маршрут /auth/signup — после submit mock login и переход на login."),
      label(null, [
        span({ class: "router-form-label" }, "Имя"),
        input({ ...bindField(ui.name, { variant: "text", controlledValue: true }) }),
        () => fieldError(ui.name.meta().errors),
        p({ class: "router-form-hint" }, "Имя и email черновики — localStorage."),
      ]),
      label(null, [
        span({ class: "router-form-label" }, "Email"),
        input({ ...bindField(ui.email, { variant: "email" }) }),
        () => fieldError(ui.email.meta().errors),
      ]),
      label(null, [
        span({ class: "router-form-label" }, "Пароль"),
        input({ ...bindField(ui.password, { variant: "password" }) }),
        () => fieldError(ui.password.meta().errors),
      ]),
      label(null, [
        span({ class: "router-form-label" }, "Повтор пароля"),
        input({ ...bindField(ui.confirmPassword, { variant: "password" }) }),
        () => fieldError(ui.confirmPassword.meta().errors),
      ]),
      label({ class: "router-form-check" }, [
        input({ ...bindField(ui.acceptTerms, { variant: "checkbox" }) }),
        span(null, "Принимаю условия"),
        () => fieldError(ui.acceptTerms.meta().errors),
      ]),
      div({ class: "router-form-actions" }, [
        button(
          {
            type: "button",
            "on:click": async () => {
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
          "Зарегистрироваться",
        ),
        button(
          {
            type: "button",
            class: "router-form-link",
            style: "background:transparent;border:none;cursor:pointer;padding:0;",
            "on:click": () => authLoginPage.go({}),
          },
          "Уже есть аккаунт",
        ),
      ]),
    ]);
  },
});

