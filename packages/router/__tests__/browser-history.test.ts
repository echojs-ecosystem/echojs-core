/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { createBrowserHistory } from "../src/histories/browser-history";

describe("createBrowserHistory", () => {
  it("reads and updates location", () => {
    const history = createBrowserHistory();
    const seen: string[] = [];
    history.listen((path) => seen.push(path));

    history.push("/users/42?tab=profile");
    expect(window.location.pathname).toBe("/users/42");
    expect(window.location.search).toBe("?tab=profile");
    expect(history.getLocation()).toBe("/users/42?tab=profile");
    expect(seen.at(-1)).toBe("/users/42?tab=profile");

    history.replace("/");
    expect(history.getLocation()).toBe("/");
  });
});
