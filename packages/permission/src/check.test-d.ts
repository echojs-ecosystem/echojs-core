import { describe, expectTypeOf, it } from "vitest";

import { createPermission } from "./index";

interface Post {
  id: string;
  authorId: string;
  published: boolean;
}

describe("check types", () => {
  it("requires payload for typed actions", () => {
    const permission = createPermission<{
      post: ["create", { name: "edit"; type: Post }, "read"];
      user: ["read", "update", "delete"];
    }>();

    permission.setup({
      post: {
        create: true,
        read: true,
        edit: (post) => post.authorId === "u1",
      },
      user: {
        read: true,
        update: true,
        delete: false,
      },
    });

    expectTypeOf(permission.check("post.create")).toEqualTypeOf<boolean>();
    expectTypeOf(permission.check("post.edit", { id: "1", authorId: "u1", published: false })).toEqualTypeOf<boolean>();
    expectTypeOf(permission.check("user.delete")).toEqualTypeOf<boolean>();

    // @ts-expect-error payload is required for post.edit
    permission.check("post.edit");

    // @ts-expect-error unknown action key
    permission.check("post.unknown");

    // @ts-expect-error unknown resource key
    permission.check("missing.read");
  });
});
