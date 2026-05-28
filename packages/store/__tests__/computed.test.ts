import { describe, expect, it } from "vitest";
import { batch, combine, createStore } from "../src/index";

describe("combine()", () => {
  it("returns combined value", () => {
    const firstName = createStore("Vova");
    const lastName = createStore("Ivanov");

    const fullName = combine({ firstName, lastName }, ({ firstName, lastName }) => {
      return `${firstName} ${lastName}`;
    });

    expect(fullName.value()).toBe("Vova Ivanov");
    expect(fullName.kind).toBe("readonly-store");
  });

  it("updates when any source updates", () => {
    const firstName = createStore("Vova");
    const lastName = createStore("Ivanov");

    const fullName = combine({ firstName, lastName }, ({ firstName, lastName }) => {
      return `${firstName} ${lastName}`;
    });

    firstName.set("Petr");
    expect(fullName.value()).toBe("Petr Ivanov");
  });
});

describe("batch()", () => {
  it("executes callback", () => {
    const counter = createStore(0);
    const payloads: unknown[] = [];

    counter.changed.watch((payload) => {
      payloads.push(payload);
    });

    batch(() => {
      counter.set(1);
      counter.set(2);
    });

    expect(counter.value()).toBe(2);
    expect(payloads.length).toBeGreaterThan(0);
  });
});
