import { describe, expect, it, vi } from "vitest";
import { computed, signal } from "../src/index.js";

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

  it("поддерживает динамические зависимости (переподписка при смене ветки)", () => {
    const $useA = signal(true);
    const $a = signal(1);
    const $b = signal(10);
    const $picked = computed(() => ($useA.value() ? $a.value() : $b.value()));

    const spy = vi.fn();
    const unsub = $picked.subscribe(spy);

    // пока useA=true, меняется только от a
    $b.set(11);
    expect(spy).toHaveBeenCalledTimes(0);

    $a.set(2);
    expect(spy).toHaveBeenCalledTimes(1);

    // переключаем ветку: теперь зависит от b
    $useA.set(false);
    expect(spy).toHaveBeenCalledTimes(2);

    $a.set(3);
    expect(spy).toHaveBeenCalledTimes(2);

    $b.set(12);
    expect(spy).toHaveBeenCalledTimes(3);

    unsub();
  });
});
