import { createRouteView } from "@echojs/router";
import { button, div, h4, p, Show, span, strong } from "@echojs/hyperdom";
import { loadUserProfile, type UserProfile } from "@entities/user/index.js";

const tabBtn = (active: boolean): Record<string, string> => ({
  padding: "6px 12px",
  border: "1px solid var(--gray-300)",
  "border-radius": "6px",
  background: active ? "var(--primary)" : "white",
  color: active ? "white" : "var(--gray-900)",
  cursor: "pointer",
});

export const userPage = createRouteView<
  { id: string },
  { tab?: "profile" | "settings" | "activity" },
  UserProfile
>({
  name: "user",
  beforeLoad: ({ params }) => loadUserProfile(params.id),
  view: ({ params, query, data }) => {
    const tab = query.tab ?? "profile";
    const setTab = (next: "profile" | "settings" | "activity"): void => {
      userPage.go({ id: params.id }, { query: { tab: next }, replace: true });
    };

    return div({ class: "router-page" }, [
      h4(null, [`Профиль #`, params.id]),
      Show(
        () => Boolean(data),
        () =>
          data
            ? div(null, [
                p(null, [strong(null, data.name), " — ", span(null, data.role)]),
                div(
                  {
                    class: "router-tabs",
                    style: { display: "flex", gap: "8px", margin: "12px 0" },
                  },
                  [
                    button(
                      { style: tabBtn(tab === "profile"), "on:click": () => setTab("profile") },
                      "Профиль",
                    ),
                    button(
                      { style: tabBtn(tab === "settings"), "on:click": () => setTab("settings") },
                      "Настройки",
                    ),
                    button(
                      { style: tabBtn(tab === "activity"), "on:click": () => setTab("activity") },
                      "Активность",
                    ),
                  ],
                ),
                p(null, () => `Вкладка: ${tab}`),
              ])
            : null,
      ),
    ]);
  },
});
