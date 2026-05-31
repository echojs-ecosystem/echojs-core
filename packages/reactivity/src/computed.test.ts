import { describe, expect, it, vi } from "vitest";

import { computed } from "./computed";
import { signal } from "./signal";

describe("computed()", () => {
  it("бросает TypeError на неправильный getter", () => {
    expect(() => (computed as any)(null)).toThrow(TypeError);
  });

  it("пересчитывается от зависимостей", () => {
    const $count = signal(1);
    const $double = computed(() => $count.value() * 2);

    expect($double.value()).toBe(2);
    $count.set(2);
    expect($double.value()).toBe(4);
  });

  it("peek() читает без подписки на изменения", () => {
    const $count = signal(1);
    const $double = computed(() => $count.value() * 2);

    expect($double.peek()).toBe(2);
    $count.set(3);
    expect($double.peek()).toBe(6);
  });

  it("поддерживает динамические зависимости (переподписка при смене ветки)", () => {
    const $useA = signal(true);
    const $a = signal(1);
    const $b = signal(10);
    const $picked = computed(() => ($useA.value() ? $a.value() : $b.value()));

    const spy = vi.fn();
    const unsub = $picked.subscribe(spy);

    $b.set(11);
    expect(spy).toHaveBeenCalledTimes(0);

    $a.set(2);
    expect(spy).toHaveBeenCalledTimes(1);

    $useA.set(false);
    expect(spy).toHaveBeenCalledTimes(2);

    $a.set(3);
    expect(spy).toHaveBeenCalledTimes(2);

    $b.set(12);
    expect(spy).toHaveBeenCalledTimes(3);

    unsub();
  });
});
