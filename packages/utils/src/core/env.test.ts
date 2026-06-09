import { describe, expect, it } from "vitest";

import { isClient, isServer } from "./env";

describe("env", () => {
  it("reports client in jsdom", () => {
    expect(isClient).toBe(true);
    expect(isServer).toBe(false);
  });
});
