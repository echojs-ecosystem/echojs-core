import { describe, expect, it } from "vitest";

import { batch } from "./batch";
import { effect } from "./effect";
import { signal } from "./signal";

describe("effect()", () => {
  it("бросает TypeError на неправильный fn", () => {
    expect(() => (effect as any)(undefined)).toThrow(TypeError);
  });

  it("реагирует на изменения", () => {
    const $count = signal(0);
    let runs = 0;

    const stop = effect(() => {
      $count.value();
      runs++;
    });

    expect(runs).toBe(1);
    $count.set(1);
    expect(runs).toBe(2);

    stop();
    $count.set(2);
    expect(runs).toBe(2);
  });

  it("peek() читает без трекинга", () => {
    const $count = signal(0);
    let runs = 0;

    const stop = effect(() => {
      $count.peek();
      runs++;
    });

    expect(runs).toBe(1);
    $count.set(1);
    expect(runs).toBe(1);

    stop();
  });

  it("поддерживает динамические зависимости (переподписка при смене ветки)", () => {
    const $useA = signal(true);
    const $a = signal(0);
    const $b = signal(0);
    let runs = 0;

    const stop = effect(() => {
      runs++;
      if ($useA.value()) {
        $a.value();
      } else {
        $b.value();
      }
    });

    expect(runs).toBe(1);

    $b.set(1);
    expect(runs).toBe(1);

    $a.set(1);
    expect(runs).toBe(2);

    $useA.set(false);
    expect(runs).toBe(3);

    $a.set(2);
    expect(runs).toBe(3);

    $b.set(2);
    expect(runs).toBe(4);

    stop();
  });

  it("реэнтрантность: может обновить сигнал внутри эффекта без бесконечного цикла", async () => {
    const $count = signal(0);
    let runs = 0;

    const stop = effect(() => {
      runs++;
      const v = $count.value();
      if (v === 0) $count.set(1);
    });

    expect($count.value()).toBe(1);
    await new Promise((r) => setTimeout(r, 0));
    expect(runs).toBe(1);

    $count.set(2);
    expect(runs).toBe(2);

    stop();
  });

  it("вложенный batch() всё ещё группирует в один прогон эффекта", () => {
    const $a = signal(0);
    const $b = signal(0);
    let runs = 0;

    const stop = effect(() => {
      $a.value();
      $b.value();
      runs++;
    });

    expect(runs).toBe(1);

    batch(() => {
      $a.set(1);
      batch(() => {
        $b.set(2);
      });
    });

    expect(runs).toBe(2);

    stop();
  });
});
