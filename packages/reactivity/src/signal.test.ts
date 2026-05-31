import { describe, expect, it } from "vitest";

import { __isDevModeForTests } from "./freeze";
import { readonly } from "./readonly";
import { signal } from "./signal";

describe("signal()", () => {
  it("бросает TypeError если initial не передан", () => {
    expect(() => (signal as any)()).toThrow(TypeError);
  });

  it("создаёт writable signal", () => {
    const $count = signal(0);
    expect(typeof $count.set).toBe("function");
    expect(typeof $count.update).toBe("function");
    expect(typeof $count.readonly).toBe("function");
  });

  it("value() читает текущее значение", () => {
    const $count = signal(1);
    expect($count.value()).toBe(1);
  });

  it("set() обновляет значение", () => {
    const $count = signal(1);
    $count.set(2);
    expect($count.value()).toBe(2);
  });

  it("update() обновляет от предыдущего значения", () => {
    const $count = signal(1);
    $count.update((v) => v + 1);
    expect($count.value()).toBe(2);
  });

  it("readonly() не даёт set()", () => {
    const $count = signal(1);
    const $ro = $count.readonly();
    expect((($ro as any).set as any) ?? undefined).toBeUndefined();
  });

  it("readonly(signal) создаёт readonly facade", () => {
    const $count = signal(1);
    const $ro = readonly($count);
    expect(typeof $ro.value).toBe("function");
    expect((($ro as any).set as any) ?? undefined).toBeUndefined();
  });

  it("в dev-режиме direct mutation ломается предсказуемо из-за freeze", () => {
    if (!__isDevModeForTests()) return;

    const $state = signal({ user: { name: "Vova" }, tags: ["a"] });
    const state = $state.value() as any;

    expect(() => {
      state.user.name = "X";
    }).toThrow();

    expect(() => {
      state.tags.push("b");
    }).toThrow();
  });
});
