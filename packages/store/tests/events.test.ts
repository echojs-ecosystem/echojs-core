import { describe, expect, it, vi } from "vitest";
import { createStore } from "../src/index.js";

describe("changed / subscribe", () => {
  it("changed emits value and prevValue", () => {
    const counter = createStore(0);
    const payloads: Array<{ value: number; prevValue: number }> = [];

    counter.changed.watch((payload) => {
      payloads.push(payload);
    });

    counter.set(1);
    expect(payloads).toEqual([{ value: 1, prevValue: 0 }]);
  });

  it("changed does not emit when Object.is equal", () => {
    const counter = createStore(0);
    const payloads: unknown[] = [];

    counter.changed.watch((payload) => {
      payloads.push(payload);
    });

    counter.set(0);
    expect(payloads).toEqual([]);
  });

  it("equals false always emits", () => {
    const counter = createStore(0, { equals: false });
    const payloads: unknown[] = [];

    counter.changed.watch((payload) => {
      payloads.push(payload);
    });

    counter.set(0);
    expect(payloads).toHaveLength(1);
  });

  it("custom equals works", () => {
    const counter = createStore({ count: 0 }, { equals: (a, b) => a.count === b.count });
    const payloads: unknown[] = [];

    counter.changed.watch((payload) => {
      payloads.push(payload);
    });

    counter.set({ count: 0 });
    expect(payloads).toEqual([]);
  });

  it("subscribe works", () => {
    const counter = createStore(0);
    const values: Array<[number, number]> = [];

    counter.subscribe((value, prevValue) => {
      values.push([value, prevValue]);
    });

    counter.set(1);
    expect(values).toEqual([[1, 0]]);
  });

  it("unsubscribe works", () => {
    const counter = createStore(0);
    const listener = vi.fn();

    const unsubscribe = counter.subscribe(listener);
    unsubscribe();
    counter.set(1);

    expect(listener).not.toHaveBeenCalled();
  });
});
