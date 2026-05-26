import { computed } from "@echojs-ecosystem/reactivity";
import { createStore } from "@echojs/store";
import { withCookie, withLocalStorage } from "@echojs/persist";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

/** JWT-подобный токен — в cookie (select/merge). */
export const authTokenStore = createStore<string | null>(null, { name: "auth-token" }).extend(
  withCookie({
    key: "echojs-access-token",
    path: "/",
    sameSite: "lax",
    secure: false,
  }),
);

/** Профиль пользователя — в localStorage. */
export const authUserStore = createStore<AuthUser | null>(null, { name: "auth-user" }).extend(
  withLocalStorage({
    key: "echojs-auth-user",
  }),
);

export const $isLoggedIn = computed(() => authTokenStore.value() != null);

export const $authUser = computed(() => authUserStore.value());

export const authSessionStore = {
  value: () => ({
    token: authTokenStore.value(),
    user: authUserStore.value(),
  }),
  token: authTokenStore,
  user: authUserStore,
};

export const mockLogin = (input: { email: string; password: string; name?: string }): void => {
  const email = input.email.trim();
  const token = `mock.${btoa(email)}.${Date.now()}`;

  authTokenStore.set(token);
  authUserStore.set({
    id: `user-${email}`,
    email,
    name: input.name?.trim() || email.split("@")[0] || "User",
  });
};

export const logout = (): void => {
  authTokenStore.set(null);
  authUserStore.set(null);
  void authTokenStore.persist.clear();
  void authUserStore.persist.clear();
};
