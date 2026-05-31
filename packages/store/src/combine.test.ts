import { describe, expect, it } from "vitest";

import { combine } from "./combine";
import { createStore } from "./create-store";

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
