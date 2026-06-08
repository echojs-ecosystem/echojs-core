import { describe, expect, it } from "vitest";

import { createPermission } from "../src";

describe("check", () => {
  it("returns false for unknown permissions", () => {
    const permission = createPermission<{
      post: ["read"];
    }>();

    permission.setup({
      post: {
        read: true,
      },
    });

    expect(permission.check("post.unknown" as "post.read")).toBe(false);
    expect(permission.check("missing.read" as "post.read")).toBe(false);
  });

  it("returns false before setup", () => {
    const permission = createPermission<{
      post: ["read"];
    }>();

    expect(permission.check("post.read")).toBe(false);
  });

  it("throws for async rules in sync check", () => {
    const permission = createPermission<{
      post: ["publish"];
    }>();

    permission.setup({
      post: {
        publish: async () => true,
      },
    });

    expect(() => permission.check("post.publish")).toThrow(/checkAsync/i);
  });

  it("supports async rules via checkAsync", async () => {
    const permission = createPermission<{
      post: ["publish"];
    }>();

    permission.setup({
      post: {
        publish: async () => true,
      },
    });

    await expect(permission.checkAsync("post.publish")).resolves.toBe(true);
  });

  it("supports sync function rules that return promises via checkAsync", async () => {
    const permission = createPermission<{
      post: ["publish"];
    }>();

    permission.setup({
      post: {
        publish: () => Promise.resolve(false),
      },
    });

    await expect(permission.checkAsync("post.publish")).resolves.toBe(false);
    expect(() => permission.check("post.publish")).toThrow(/checkAsync/i);
  });

  it("exposes can and cannot aliases", () => {
    const permission = createPermission<{
      post: ["read"];
    }>();

    permission.setup({
      post: {
        read: true,
      },
    });

    expect(permission.can("post.read")).toBe(true);
    expect(permission.cannot("post.read")).toBe(false);
  });
});
