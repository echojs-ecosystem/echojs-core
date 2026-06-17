import { describe, it } from "vitest";

import { createPermission } from "../core/create-permission";
import { createPermissionCheck } from "./create-permission-check";

interface Post {
  id: string;
  authorId: string;
  published: boolean;
}

describe("PermissionCheck types", () => {
  it("requires subject for payload actions", () => {
    const permission = createPermission<{
      post: ["create", { name: "edit"; type: Post }, "read"];
      user: ["read", "update", "delete"];
    }>();

    const PermissionCheck = createPermissionCheck(permission);

    PermissionCheck("post.create", () => null);

    PermissionCheck(
      "post.edit",
      { id: "1", authorId: "u1", published: false },
      () => null,
    );

    // @ts-expect-error subject is required for post.edit
    PermissionCheck("post.edit", () => null);
  });
});
