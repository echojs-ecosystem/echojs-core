import { describe, expect, it } from "vitest";

import { createPermission } from "../src";

describe("createPermission", () => {
  it("creates a permission instance with the public API", () => {
    const permission = createPermission<{
      post: ["read", "create"];
    }>();

    expect(permission.isReady()).toBe(false);
    expect(permission.$ready.peek()).toBe(false);
    expect(permission.$version.peek()).toBe(0);
    expect(typeof permission.setup).toBe("function");
    expect(typeof permission.check).toBe("function");
    expect(typeof permission.checkAsync).toBe("function");
    expect(typeof permission.can).toBe("function");
    expect(typeof permission.cannot).toBe("function");
    expect(typeof permission.subscribe).toBe("function");
    expect(typeof permission.on).toBe("function");
    expect(permission.events.setup).toBeDefined();
    expect(permission.$snapshot.peek()).toBeNull();
  });
});
