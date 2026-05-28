import { describe, expect, it } from "vitest";
import { signal } from "@echojs/reactivity";
import { createRouterUrlStateAdapter } from "@echojs/url-state";

describe("router adapter", () => {
  it("reads search from router.$fullPath", () => {
    const $fullPath = signal("/products?page=2");
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path);
      },
      replace(path: string) {
        $fullPath.set(path);
      },
    };
    const adapter = createRouterUrlStateAdapter(router);
    expect(adapter.getSearch()).toBe("?page=2");
  });

  it("setSearch updates only search and keeps pathname", () => {
    const $fullPath = signal("/products?page=1");
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path);
      },
      replace(path: string) {
        $fullPath.set(path);
      },
    };
    const adapter = createRouterUrlStateAdapter(router);
    adapter.setSearch("?page=2");
    expect($fullPath.value()).toBe("/products?page=2");
  });

  it("subscribe reacts to router changes", () => {
    const $fullPath = signal("/?a=1");
    const router = {
      $fullPath,
      go(path: string) {
        $fullPath.set(path);
      },
      replace(path: string) {
        $fullPath.set(path);
      },
    };
    const adapter = createRouterUrlStateAdapter(router);
    let called = 0;
    const unsub = adapter.subscribe(() => {
      called += 1;
    });
    router.go("/?a=2");
    expect(called).toBe(1);
    unsub();
  });
});

