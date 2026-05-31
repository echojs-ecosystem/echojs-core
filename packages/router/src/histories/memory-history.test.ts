import { describe, expect, it } from "vitest";
import { createMemoryHistory } from "./memory-history";

describe("createMemoryHistory", () => {
  it("push/replace/back/forward", () => {
    const history = createMemoryHistory("/");
    expect(history.getLocation()).toBe("/");

    history.push("/users");
    expect(history.getLocation()).toBe("/users");

    history.push("/settings");
    history.replace("/profile");
    expect(history.getLocation()).toBe("/profile");

    history.back();
    expect(history.getLocation()).toBe("/users");

    history.forward();
    expect(history.getLocation()).toBe("/profile");
  });

  it("notifies listeners", () => {
    const history = createMemoryHistory("/");
    const seen: string[] = [];
    history.listen((path) => seen.push(path));
    history.push("/a");
    expect(seen).toEqual(["/a"]);
  });
});
