import { createRouteView } from "@echojs/router";
import { createStore, select, withActions } from "@echojs/store";
import { button, code, div, h4, p, section, span } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
import { i18n } from "@app/i18n/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getModule("state")!;

const themeStore = createStore("dark" as "dark" | "light", { name: "theme" }).extend(
  withActions({
    toggle: (store) => () => store.update((t) => (t === "dark" ? "light" : "dark")),
    setDark: (store) => () => store.set("dark"),
    setLight: (store) => () => store.set("light"),
  }),
);

const counterStore = createStore(0, { name: "counter" }).extend(
  withActions({
    increment: (store) => () => store.update((v) => (v as number) + 1),
    decrement: (store) => () => store.update((v) => (v as number) - 1),
    add: (store) => (amount: number) => store.update((v) => (v as number) + amount),
  }),
);

const counterLabel = select(counterStore, (n) => `×${n}`, { name: "counter-label" });

export const statePage = createRouteView({
  name: "state",
  view: () =>
    section({ class: "page page--feature" }, [
      ModuleHeader(meta),
      p({ class: "page__hint" }, () => i18n.t("state.hint")),
      div({ class: "demo-store__grid" }, [
        section({ class: "demo-store__card" }, [
          h4(null, () => i18n.t("state.themeTitle")),
          p(null, [
            () => i18n.t("state.themeValue"),
            " ",
            span({ class: "demo-store__badge" }, () => themeStore.value()),
          ]),
          div({ class: "demo-store__actions" }, [
            button({ type: "button", "on:click": () => themeStore.toggle() }, () => i18n.t("state.toggle")),
            button(
              { type: "button", class: "secondary", "on:click": () => themeStore.setDark() },
              () => i18n.t("state.dark"),
            ),
            button(
              { type: "button", class: "secondary", "on:click": () => themeStore.setLight() },
              () => i18n.t("state.light"),
            ),
          ]),
        ]),
        section({ class: "demo-store__card" }, [
          h4(null, () => i18n.t("state.counterTitle")),
          p(null, [
            code(null, () => String(counterStore.value())),
            () => i18n.t("state.selectArrow"),
            code(null, () => counterLabel.value()),
          ]),
          div({ class: "demo-store__actions" }, [
            button({ type: "button", "on:click": () => counterStore.decrement() }, "−"),
            button({ type: "button", "on:click": () => counterStore.increment() }, "+"),
            button({ type: "button", class: "secondary", "on:click": () => counterStore.add(5) }, "+5"),
          ]),
        ]),
      ]),
    ]),
});
