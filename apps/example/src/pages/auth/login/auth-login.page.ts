import { bindField } from "@echojs/form";
import { button, div, h4, input, label, p, span } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { createRouteView } from "@echojs/router";
import { mockLogin } from "@entities/session/index.js";
import { dashboardPage } from "@pages/dashboard/dashboard.page.js";
import { authSignupPage } from "@pages/auth/signup/auth-signup.page.js";
import { authLoginForm, authLoginUi } from "@pages/auth/login/auth-login.model.js";

const fieldError = (errors: readonly string[]): Child =>
  errors.length ? div({ class: "router-form-error" }, errors.join(", ")) : null;

export const authLoginPage = createRouteView({
  name: "auth-login",
  view: () => {
    const ui = authLoginUi;

    return div({ class: "router-auth-form" }, [
      h4(null, "Вход"),
      p({ class: "router-muted" }, "Маршрут /auth/login — mock API, токен в cookie."),
      label(null, [
        span({ class: "router-form-label" }, "Email"),
        input({ ...bindField(ui.email, { variant: "email" }) }),
        () => fieldError(ui.email.meta().errors),
        p({ class: "router-form-hint" }, "Черновик email сохраняется в localStorage."),
      ]),
      label(null, [
        span({ class: "router-form-label" }, "Пароль"),
        input({ ...bindField(ui.password, { variant: "password" }) }),
        () => fieldError(ui.password.meta().errors),
      ]),
      label({ class: "router-form-check" }, [
        input({ ...bindField(ui.remember, { variant: "checkbox" }) }),
        span(null, "Запомнить"),
      ]),
      div({ class: "router-form-actions" }, [
        button(
          {
            type: "button",
            "on:click": async () => {
              const res = await authLoginForm.submit(async (values) => {
                mockLogin({
                  email: String(values.email),
                  password: String(values.password),
                });
                dashboardPage.go({});
              });
              if (!res.ok) return;
            },
          },
          "Войти",
        ),
        button(
          {
            type: "button",
            class: "router-form-link",
            style: "background:transparent;border:none;cursor:pointer;padding:0;",
            "on:click": () => authSignupPage.go({}),
          },
          "Создать аккаунт",
        ),
      ]),
    ]);
  },
});

