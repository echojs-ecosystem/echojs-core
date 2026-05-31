import { describe, expect, it } from "vitest";

import { computed } from "./computed";
import { isReadonlySignal } from "./public-guards";
import { readonly } from "./readonly";
import { signal } from "./signal";

describe("readonly()", () => {
  it("оборачивает writable signal в readonly facade", () => {
    const $count = signal(1);
    const $ro = readonly($count);

    expect($ro.value()).toBe(1);
    expect(isReadonlySignal($ro)).toBe(true);
    expect((($ro as { set?: unknown }).set as unknown) ?? undefined).toBeUndefined();
  });

  it("возвращает тот же объект, если сигнал уже readonly", () => {
    const $count = signal(1);
    const $ro1 = $count.readonly();
    const $ro2 = readonly($ro1);
    expect($ro2).toBe($ro1);
  });

  it("не меняет computed (и не добавляет set)", () => {
    const $count = signal(1);
    const $double = computed(() => $count.value() * 2);
    const $ro = readonly($double);

    expect($ro.value()).toBe(2);
    expect((($ro as { set?: unknown }).set as unknown) ?? undefined).toBeUndefined();
  });
});
