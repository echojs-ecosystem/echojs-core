/** @vitest-environment jsdom */
import { h, render } from "@echojs-ecosystem/hyperdom";
import { describe, expect, it } from "vitest";

import { createPermission } from "../core/create-permission";
import { createPermissionCheck } from "./create-permission-check";

describe("createPermissionCheck", () => {
  it("renders children when check passes", async () => {
    const permission = createPermission<{ item: ["read", "delete"] }>();
    permission.setup({ item: { read: true, delete: false } });

    const PermissionCheck = createPermissionCheck(permission);
    const container = document.createElement("div");

    render(
      PermissionCheck("item.read", () => h("span", null, "visible")),
      container,
    );

    expect(container.textContent).toBe("visible");
  });

  it("hides children when check fails", () => {
    const permission = createPermission<{ item: ["delete"] }>();
    permission.setup({ item: { delete: false } });

    const PermissionCheck = createPermissionCheck(permission);
    const container = document.createElement("div");

    render(
      PermissionCheck(
        "item.delete",
        () => h("span", null, "hidden"),
        () => h("span", null, "fallback"),
      ),
      container,
    );

    expect(container.textContent).toBe("fallback");
  });

  it("re-renders when permission version changes", async () => {
    const permission = createPermission<{ item: ["delete"] }>();
    permission.setup({ item: { delete: false } });

    const PermissionCheck = createPermissionCheck(permission);
    const container = document.createElement("div");

    render(PermissionCheck("item.delete", () => h("span", null, "allowed")), container);

    expect(container.textContent).toBe("");

    permission.setup({ item: { delete: true } });
    await Promise.resolve();

    expect(container.textContent).toBe("allowed");
  });
});
