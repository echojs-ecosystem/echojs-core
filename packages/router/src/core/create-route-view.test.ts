import { describe, expect, it } from "vitest";
import { createRouteView } from "./create-route-view";
import { isPage, assertPage, runPageBeforeLoad } from "./page";
import { createRoute } from "./create-route";

describe("createRouteView", () => {
  it("creates branded page with view", () => {
    const page = createRouteView({ name: "home", view: () => "ok" });
    expect(isPage(page)).toBe(true);
    expect(() => assertPage(createRoute("x"))).toThrow(/createRouteView/i);
  });

  it("go before registration throws", () => {
    const page = createRouteView({ name: "home", view: () => null });
    expect(() => page.go()).toThrow(/not registered/i);
  });

  it("runs beforeLoad on opened", async () => {
    const page = createRouteView({
      name: "user",
      view: () => null,
      beforeLoad: async ({ params }) => ({ ok: (params as { id: string }).id === "1" }),
    });

    await runPageBeforeLoad(
      page,
      { params: { id: "1" }, query: {}, navigationId: 1 },
      1,
    );

    expect(page.$pending.peek()).toBe(false);
    expect(page.$data.peek()).toEqual({ ok: true });
  });

  it("loader alias works", async () => {
    const page = createRouteView({
      name: "user",
      view: () => null,
      loader: async () => ({ legacy: true }),
    });

    await runPageBeforeLoad(page, { params: {}, query: {}, navigationId: 1 }, 1);

    await Promise.resolve();
    expect(page.$data.peek()).toEqual({ legacy: true });
  });
});
