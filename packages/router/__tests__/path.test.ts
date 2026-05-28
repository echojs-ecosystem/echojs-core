import { describe, expect, it } from "vitest";
import { buildPath, matchPath, normalizePathname } from "../src/core/path";

describe("path", () => {
  it("matchPath handles root", () => {
    expect(matchPath("/", "/")).toEqual({ matched: true, params: {} });
    expect(matchPath("/", "/users")).toEqual({ matched: false, params: {} });
  });

  it("matchPath handles params", () => {
    expect(matchPath("/users/:id", "/users/42")).toEqual({
      matched: true,
      params: { id: "42" },
    });
  });

  it("matchPath handles nested params", () => {
    expect(matchPath("/posts/:postId/comments/:commentId", "/posts/1/comments/9")).toEqual({
      matched: true,
      params: { postId: "1", commentId: "9" },
    });
  });

  it("matchPath handles wildcard", () => {
    expect(matchPath("/files/*", "/files/docs/readme.md")).toEqual({
      matched: true,
      params: { "*": "docs/readme.md" },
    });
  });

  it("ignores query in pathname matching via normalize", () => {
    expect(matchPath("/users/:id", "/users/42?tab=profile")).toEqual({
      matched: true,
      params: { id: "42" },
    });
  });

  it("normalizes trailing slashes", () => {
    expect(normalizePathname("/users/")).toBe("/users");
    expect(matchPath("/users", "/users/")).toEqual({ matched: true, params: {} });
  });

  it("buildPath encodes params", () => {
    expect(buildPath("/users/:id", { id: "42" })).toBe("/users/42");
    expect(buildPath("/users/:id", { id: "a/b" })).toBe("/users/a%2Fb");
  });

  it("decodes params when matching", () => {
    expect(matchPath("/users/:id", "/users/a%2Fb")).toEqual({
      matched: true,
      params: { id: "a/b" },
    });
  });
});
