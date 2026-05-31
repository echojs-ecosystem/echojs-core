import { describe, expect, it } from "vitest";

import { createStore } from "./create-store";
import { select } from "./select";

describe("select()", () => {
  it("returns selected value", () => {
    const userStore = createStore({
      id: "1",
      name: "Vova",
      age: 30,
    });

    const userName = select(userStore, (user) => user.name);
    expect(userName.value()).toBe("Vova");
    expect(userName.kind).toBe("readonly-store");
  });

  it("updates when source updates", () => {
    const userStore = createStore({
      id: "1",
      name: "Vova",
      age: 30,
    });

    const userName = select(userStore, (user) => user.name);
    userStore.set({ id: "1", name: "Petr", age: 30 });
    expect(userName.value()).toBe("Petr");
  });

  it("respects equals", () => {
    const userStore = createStore({
      id: "1",
      name: "Vova",
      age: 30,
    });

    const userName = select(userStore, (user) => user.name, {
      equals: (a, b) => a === b,
    });

    const payloads: unknown[] = [];
    userName.changed.watch((payload) => {
      payloads.push(payload);
    });

    userStore.set({ id: "2", name: "Vova", age: 31 });
    expect(payloads).toEqual([]);
  });
});
