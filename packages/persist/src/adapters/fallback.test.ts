import { describe, expect, it } from "vitest";

import { createCookieStorageAdapter } from "./cookie";
import { createIndexedDBStorageAdapter } from "./indexed-db";
import { createLocalStorageAdapter } from "./local-storage";

describe("fallback when browser APIs are unavailable", () => {
  it("localStorage adapter does not throw", () => {
    expect(() => createLocalStorageAdapter().getItem("x")).not.toThrow();
  });

  it("cookie adapter does not throw", () => {
    expect(() => createCookieStorageAdapter().getItem("x")).not.toThrow();
  });

  it("indexedDB adapter does not throw", () => {
    expect(() => createIndexedDBStorageAdapter().getItem("x")).not.toThrow();
  });
});
