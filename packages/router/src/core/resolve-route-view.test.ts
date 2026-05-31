import { describe, expect, it } from "vitest";

import { createRouteView } from "./create-route-view";
import {
  resolveErrorViewOption,
  resolveLoadingViewOption,
  resolveNotFoundViewOption,
  resolvePageErrorView,
  resolvePageLoadingView,
  resolvePageNotFoundView,
} from "./resolve-route-view";

describe("resolve-route-view", () => {
  it("resolvePageLoadingView prefers loadingView", () => {
    const loadingView = () => "loading";
    const page = createRouteView({
      name: "page",
      view: () => "view",
      loadingView,
    });

    expect(resolvePageLoadingView(page)).toBe(loadingView);
  });

  it("resolvePageLoadingView falls back to view", () => {
    const page = createRouteView({
      name: "page",
      view: () => "view-content",
    });

    const loading = resolvePageLoadingView(page);
    expect(loading({ params: {}, query: {} })).toBe("view-content");
  });

  it("resolvePageErrorView falls back to view with error", () => {
    const page = createRouteView({
      name: "page",
      view: ({ error }) => (error ? "err" : "ok"),
    });

    const errorView = resolvePageErrorView(page);
    expect(errorView({ error: new Error("x"), params: {}, query: {} })).toBe("err");
  });

  it("resolvePageNotFoundView uses page view", () => {
    const page = createRouteView({
      name: "page",
      view: () => "not-found-content",
    });

    const notFound = resolvePageNotFoundView(page);
    expect(notFound({ params: {}, query: {}, outlet: () => null, data: null })).toBe(
      "not-found-content",
    );
  });

  it("resolve*ViewOption accepts function or page", () => {
    const fn = () => "fn";
    const page = createRouteView({ name: "page", view: () => "page" });

    expect(resolveLoadingViewOption(fn)).toBe(fn);
    expect(resolveLoadingViewOption(page)).toBeTypeOf("function");
    expect(resolveErrorViewOption(fn)).toBe(fn);
    expect(resolveNotFoundViewOption(page)).toBeTypeOf("function");
  });
});
