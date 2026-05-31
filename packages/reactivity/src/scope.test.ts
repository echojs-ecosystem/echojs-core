import { describe, expect, it } from "vitest";

import { effect } from "./effect";
import { scope } from "./scope";
import { signal } from "./signal";

describe("scope()", () => {
  it("бросает TypeError на неправильный fn", () => {
    expect(() => (scope as any)("x")).toThrow(TypeError);
  });

  it("очищает вложенные эффекты", () => {
    const $count = signal(0);
    let runs = 0;

    const stopScope = scope(() => {
      effect(() => {
        $count.value();
        runs++;
      });
    });

    expect(runs).toBe(1);
    $count.set(1);
    expect(runs).toBe(2);

    stopScope();
    $count.set(2);
    expect(runs).toBe(2);
  });

  it("stopScope() идемпотентен (можно вызвать дважды)", () => {
    const stopScope = scope(() => {
      effect(() => {});
    });
    stopScope();
    stopScope();
  });
});
