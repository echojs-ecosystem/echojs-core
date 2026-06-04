import { describe, expect, it, vi } from "vitest";

import { createEchoApp } from "./create-echo-app";
import { ROUTER_KEY } from "./resolve-app-options";

describe("createEchoApp().use(router)", () => {
  it("mounts router.View and starts router", async () => {
    const start = vi.fn();
    const View = vi.fn(() => document.createTextNode("route"));
    const router = { View, start };

    const container = document.createElement("div");
    document.body.appendChild(container);

    const app = createEchoApp().use(router);
    await app.mount(container);

    expect(start).toHaveBeenCalledOnce();
    expect(View).toHaveBeenCalledOnce();
    expect(app.inject(ROUTER_KEY)).toBe(router);

    document.body.removeChild(container);
  });
});
