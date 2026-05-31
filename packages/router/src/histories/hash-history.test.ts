/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { createHashHistory } from "./hash-history";

describe("createHashHistory", () => {
  it("uses hash as location", () => {
    const history = createHashHistory();
    history.push("/users/42");
    expect(history.getLocation()).toBe("/users/42");
    expect(window.location.hash).toBe("#/users/42");
  });

  it("replace updates hash without extra history entry side effects", () => {
    const history = createHashHistory();
    history.push("/a");
    history.replace("/b");
    expect(history.getLocation()).toBe("/b");
    expect(window.location.hash).toBe("#/b");
  });

  it("notifies listeners on push", () => {
    const history = createHashHistory();
    const seen: string[] = [];
    history.listen((path) => seen.push(path));

    history.push("/settings");
    expect(seen.at(-1)).toBe("/settings");
  });

  it("unsubscribes listener", () => {
    const history = createHashHistory();
    const seen: string[] = [];
    const unsubscribe = history.listen((path) => seen.push(path));

    unsubscribe();
    history.push("/after-unsub");
    expect(seen).toEqual([]);
  });
});
