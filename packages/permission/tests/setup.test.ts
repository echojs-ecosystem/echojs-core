import { describe, expect, it } from "vitest";

import { createPermission } from "../src";

describe("setup", () => {
  it("applies boolean rules", () => {
    const permission = createPermission<{
      post: ["create", "read"];
      user: ["delete"];
    }>();

    permission.setup({
      post: {
        create: true,
        read: false,
      },
      user: {
        delete: true,
      },
    });

    expect(permission.check("post.create")).toBe(true);
    expect(permission.check("post.read")).toBe(false);
    expect(permission.check("user.delete")).toBe(true);
  });

  it("applies function rules with payload", () => {
    type Post = { authorId: string };

    const currentUser = { id: "u1", role: "user" as const };

    const permission = createPermission<{
      post: [{ name: "edit"; type: Post }];
    }>();

    permission.setup({
      post: {
        edit: (post) => post.authorId === currentUser.id || currentUser.role === "admin",
      },
    });

    expect(permission.check("post.edit", { authorId: "u1" })).toBe(true);
    expect(permission.check("post.edit", { authorId: "u2" })).toBe(false);
  });
});
