import { createRouteView } from "@echojs/router";
import { createStore, select, withActions } from "@echojs/store";
import { button, code, div, h4, p, section, span } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
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
      p({ class: "page__hint" }, "Локальное UI-состояние лаборатории. Для сессии приложения см. раздел «Аккаунт»."),
      div({ class: "demo-store__grid" }, [
        section({ class: "demo-store__card" }, [
          h4(null, "Тема интерфейса"),
          p(null, ["Значение: ", span({ class: "demo-store__badge" }, () => themeStore.value())]),
          div({ class: "demo-store__actions" }, [
            button({ type: "button", "on:click": () => themeStore.toggle() }, "toggle"),
            button({ type: "button", class: "secondary", "on:click": () => themeStore.setDark() }, "dark"),
            button({ type: "button", class: "secondary", "on:click": () => themeStore.setLight() }, "light"),
          ]),
        ]),
        section({ class: "demo-store__card" }, [
          h4(null, "Счётчик"),
          p(null, [
            code(null, () => String(counterStore.value())),
            " → select → ",
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

