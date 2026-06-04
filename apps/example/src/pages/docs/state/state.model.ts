import { createStore, select, withActions } from "@echojs/store";

export const themeStore = createStore("dark" as "dark" | "light", { name: "theme" }).extend(
  withActions({
    toggle: (store) => () => store.update((t) => (t === "dark" ? "light" : "dark")),
    setDark: (store) => () => store.set("dark"),
    setLight: (store) => () => store.set("light"),
  }),
);

export const counterStore = createStore(0, { name: "counter" }).extend(
  withActions({
    increment: (store) => () => store.update((v) => (v as number) + 1),
    decrement: (store) => () => store.update((v) => (v as number) - 1),
    add: (store) => (amount: number) => store.update((v) => (v as number) + amount),
  }),
);

export const counterLabel = select(counterStore, (n) => `×${n}`, { name: "counter-label" });
