import { describe, expect, it, vi } from "vitest";

import { createPermission } from "../src";

describe("ready state", () => {
  it("is false initially and true after setup", () => {
    const permission = createPermission<{
      post: ["read"];
    }>();

    expect(permission.isReady()).toBe(false);
    expect(permission.$ready.peek()).toBe(false);

    permission.setup({
      post: {
        read: true,
      },
    });

    expect(permission.isReady()).toBe(true);
    expect(permission.$ready.peek()).toBe(true);
  });

  it("can be toggled manually and notifies subscribers", () => {
    const permission = createPermission<{
      post: ["read"];
    }>();

    const listener = vi.fn();
    permission.subscribe(listener);

    permission.setReady(true);
    expect(permission.isReady()).toBe(true);
    expect(listener).toHaveBeenCalled();
  });

  it("reset clears permissions and ready state", () => {
    const permission = createPermission<{
      post: ["read"];
    }>();

    permission.setup({
      post: {
        read: true,
      },
    });

    permission.reset();

    expect(permission.isReady()).toBe(false);
    expect(permission.check("post.read")).toBe(false);
  });
});
