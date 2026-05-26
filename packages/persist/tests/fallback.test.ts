import { describe, expect, it } from "vitest";
import { createLocalStorageAdapter } from "../src/adapters/local-storage.js";
import { createCookieStorageAdapter } from "../src/adapters/cookie.js";
import { createIndexedDBStorageAdapter } from "../src/adapters/indexed-db.js";

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
