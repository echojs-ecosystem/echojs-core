import { describe, expect, it, vi } from "vitest";

import { permission as createPermission } from "./permission";

describe("permission", () => {
  it("starts with prompt and unsupported when permissions API is missing", () => {
    const original = navigator.permissions;
    Object.defineProperty(navigator, "permissions", {
      configurable: true,
      value: undefined,
    });

    const perm = createPermission("notifications");
    expect(perm.state()).toBe("prompt");
    expect(perm.supported()).toBe(false);
    perm.dispose();

    Object.defineProperty(navigator, "permissions", {
      configurable: true,
      value: original,
    });
  });

  it("queries permission and reacts to status changes", async () => {
    const changeListeners = new Set<() => void>();
    const status = {
      state: "granted" as PermissionState,
      addEventListener: vi.fn((_type: string, listener: () => void) => {
        changeListeners.add(listener);
      }),
      removeEventListener: vi.fn((_type: string, listener: () => void) => {
        changeListeners.delete(listener);
      }),
    };

    Object.defineProperty(navigator, "permissions", {
      configurable: true,
      value: {
        query: vi.fn().mockResolvedValue(status),
      },
    });

    const perm = createPermission("notifications");
    await vi.waitFor(() => expect(perm.supported()).toBe(true));
    expect(perm.state()).toBe("granted");

    status.state = "denied";
    for (const listener of changeListeners) listener();
    expect(perm.state()).toBe("denied");

    perm.dispose();
    expect(status.removeEventListener).toHaveBeenCalled();
  });

  it("marks permission as unsupported when query fails", async () => {
    Object.defineProperty(navigator, "permissions", {
      configurable: true,
      value: {
        query: vi.fn().mockRejectedValue(new Error("unsupported")),
      },
    });

    const perm = createPermission("notifications");
    await vi.waitFor(() => expect(perm.state()).toBe("unsupported"));
    expect(perm.supported()).toBe(false);
    perm.dispose();
  });
});
