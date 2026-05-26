import { describe, expect, it } from "vitest";
import { createRoute } from "../src/core/create-route.js";

describe("createRoute", () => {
  it("exposes open() alias for go()", () => {
    const route = createRoute("demo");
    expect(route.open).toBe(route.go);
  });

  it("close() before registration throws", () => {
    const route = createRoute("demo");
    expect(() => route.close()).toThrow(/not registered/i);
  });
});
