import { describe, expect, it, vi } from "vitest";

import { computed } from "./computed";
import { scope } from "./scope";
import { signal } from "./signal";

describe("subscribe()", () => {
  it("вызывается только на реальные изменения и умеет unsubscribe", () => {
    const $count = signal(0);
    const spy = vi.fn();

    const unsubscribe = $count.subscribe(spy);
    expect(spy).toHaveBeenCalledTimes(0);

    $count.set(1);
    expect(spy).toHaveBeenCalledTimes(1);

    $count.set(1);
    expect(spy).toHaveBeenCalledTimes(1);

    unsubscribe();
    $count.set(2);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("работает и на computed()", () => {
    const $count = signal(0);
    const $double = computed(() => $count.value() * 2);
    const spy = vi.fn();

    const unsubscribe = $double.subscribe(spy);
    $count.set(1);
    expect(spy).toHaveBeenCalledTimes(1);

    unsubscribe();
    $count.set(2);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("не вызывает callback, если computed-значение не изменилось", () => {
    const $count = signal(0);
    const $parity = computed(() => $count.value() % 2);
    const spy = vi.fn();

    const unsubscribe = $parity.subscribe(spy);
    $count.set(2);
    expect(spy).toHaveBeenCalledTimes(0);

    $count.set(3);
    expect(spy).toHaveBeenCalledTimes(1);

    unsubscribe();
  });

  it("бросает TypeError на неправильный аргумент", () => {
    const $count = signal(0);
    expect(() => ($count as any).subscribe(null)).toThrow(TypeError);
  });

  it("unsubscribe() идемпотентен (можно вызвать дважды)", () => {
    const $count = signal(0);
    const unsubscribe = $count.subscribe(() => {});
    unsubscribe();
    unsubscribe();
  });

  it("использует Object.is (NaN не считается изменением на NaN)", () => {
    const $v = signal(0);
    const spy = vi.fn();
    const unsubscribe = $v.subscribe(spy);

    $v.set(NaN);
    expect(spy).toHaveBeenCalledTimes(1);

    $v.set(NaN);
    expect(spy).toHaveBeenCalledTimes(1);

    unsubscribe();
  });

  it("снимается при stopScope(), если создан внутри scope()", () => {
    const $count = signal(0);
    const spy = vi.fn();

    const stopScope = scope(() => {
      $count.subscribe(spy);
    });

    $count.set(1);
    expect(spy).toHaveBeenCalledTimes(1);

    stopScope();
    $count.set(2);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
