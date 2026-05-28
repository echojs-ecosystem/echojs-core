import { describe, expect, it, afterEach } from "vitest";
import { ariaBool, dataDisabled, dataInvalid, dataState } from "../src/core/aria";
import { createId, resetIdCounter } from "../src/core/ids";
import { resetUIContextStack, runWithUIContext, createUIContextValue } from "../src/theme/theme-context";

afterEach(() => {
  resetIdCounter();
  resetUIContextStack();
});

describe("aria helpers", () => {
  it("ariaBool returns string booleans", () => {
    expect(ariaBool(true)).toBe("true");
    expect(ariaBool(false)).toBe("false");
  });

  it("dataState sets data-state", () => {
    expect(dataState("open")).toEqual({ "data-state": "open" });
  });

  it("dataDisabled sets empty data-disabled when true", () => {
    expect(dataDisabled(true)).toEqual({ "data-disabled": "" });
    expect(dataDisabled(false)).toEqual({});
  });

  it("dataInvalid sets empty data-invalid when true", () => {
    expect(dataInvalid(true)).toEqual({ "data-invalid": "" });
    expect(dataInvalid(false)).toEqual({});
  });

  it("createId uses theme prefix from context", () => {
    runWithUIContext(createUIContextValue({ theme: { prefix: "app" } }), () => {
      expect(createId()).toBe("app-1");
      expect(createId("custom")).toBe("custom-2");
    });
  });
});

