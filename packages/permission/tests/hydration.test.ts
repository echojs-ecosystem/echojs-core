import { describe, expect, it } from "vitest";

import { createPermission } from "../src";

describe("hydration", () => {
  it("dehydrates boolean rules only", () => {
    const permission = createPermission<{
      post: ["read", "edit"];
    }>();

    permission.setup({
      post: {
        read: true,
        edit: (post: { id: string }) => post.id === "1",
      },
    });

    const snapshot = permission.dehydrate();

    expect(snapshot.ready).toBe(true);
    expect(snapshot.version).toBeGreaterThan(0);
    expect(snapshot.rules).toEqual({
      post: {
        read: true,
      },
    });
  });

  it("hydrates boolean rules and ready state", () => {
    const permission = createPermission<{
      post: ["read", "create"];
      user: ["delete"];
    }>();

    permission.hydrate({
      version: 3,
      ready: true,
      rules: {
        post: {
          read: true,
          create: false,
        },
        user: {
          delete: true,
        },
      },
    });

    expect(permission.isReady()).toBe(true);
    expect(permission.check("post.read")).toBe(true);
    expect(permission.check("post.create")).toBe(false);
    expect(permission.check("user.delete")).toBe(true);
    expect(permission.$version.peek()).toBe(4);
  });
});
