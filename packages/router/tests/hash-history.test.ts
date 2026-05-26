/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { createHashHistory } from "../src/histories/hash-history.js";

describe("createHashHistory", () => {
  it("uses hash as location", () => {
    const history = createHashHistory();
    history.push("/users/42");
    expect(history.getLocation()).toBe("/users/42");
    expect(window.location.hash).toBe("#/users/42");
  });
});
