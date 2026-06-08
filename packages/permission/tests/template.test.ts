import { describe, expect, it } from "vitest";

import { createPermission, createPermissionTemplate } from "../src";

describe("createPermissionTemplate", () => {
  it("can be used directly in setup", () => {
    const adminTemplate = createPermissionTemplate({
      post: {
        create: true,
        read: true,
        edit: true,
        delete: true,
      },
    });

    const permission = createPermission<{
      post: ["create", "read", "edit", "delete"];
    }>();

    permission.setup(adminTemplate);

    expect(permission.check("post.delete")).toBe(true);
  });

  it("can be merged with overrides", () => {
    const adminTemplate = createPermissionTemplate({
      post: {
        create: true,
        read: true,
        edit: true,
        delete: true,
      },
    });

    const permission = createPermission<{
      post: ["create", "read", "edit", "delete"];
    }>();

    permission.setup({
      ...adminTemplate,
      post: {
        ...adminTemplate.post,
        delete: false,
      },
    });

    expect(permission.check("post.create")).toBe(true);
    expect(permission.check("post.delete")).toBe(false);
  });
});
