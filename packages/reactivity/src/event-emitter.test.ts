import { describe, expect, it, vi } from "vitest";

import { createEventEmitter } from "./event-emitter";

type TestEvents = {
  message: string;
  count: number;
  close: void;
};

describe("createEventEmitter", () => {
  it("notifies listeners on emit", () => {
    const emitter = createEventEmitter<TestEvents>();
    const listener = vi.fn();

    emitter.on("message", listener);
    emitter.emit("message", "hello");

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith("hello");
  });

  it("chains on, once, off, emit, and clear", () => {
    const emitter = createEventEmitter<TestEvents>();
    const messageListener = vi.fn();
    const countListener = vi.fn();
    const closeListener = vi.fn();
    const onceListener = vi.fn();

    const chained = emitter
      .on("message", messageListener)
      .on("count", countListener)
      .once("message", onceListener)
      .on("close", closeListener);

    expect(chained).toBe(emitter);

    emitter
      .emit("message", "hello")
      .emit("count", 2)
      .emit("close");

    expect(messageListener).toHaveBeenCalledOnce();
    expect(onceListener).toHaveBeenCalledOnce();
    expect(countListener).toHaveBeenCalledWith(2);
    expect(closeListener).toHaveBeenCalledOnce();

    emitter.off("count", countListener).emit("count", 3);

    expect(countListener).toHaveBeenCalledOnce();

    emitter.clear("message").emit("message", "again");

    expect(messageListener).toHaveBeenCalledOnce();
  });

  it("unsubscribes via off", () => {
    const emitter = createEventEmitter<TestEvents>();
    const listener = vi.fn();

    emitter.on("message", listener).off("message", listener).emit("message", "hello");

    expect(listener).not.toHaveBeenCalled();
  });

  it("supports subscribe alias", () => {
    const emitter = createEventEmitter<TestEvents>();
    const listener = vi.fn();

    emitter.subscribe("count", listener).emit("count", 3);

    expect(listener).toHaveBeenCalledWith(3);
  });

  it("runs once listeners only one time", () => {
    const emitter = createEventEmitter<TestEvents>();
    const listener = vi.fn();

    emitter.once("message", listener).emit("message", "first").emit("message", "second");

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith("first");
  });

  it("supports void events", () => {
    const emitter = createEventEmitter<TestEvents>();
    const listener = vi.fn();

    emitter.on("close", listener).emit("close");

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith();
  });

  it("clears listeners for a single event or all events", () => {
    const emitter = createEventEmitter<TestEvents>();
    const messageListener = vi.fn();
    const countListener = vi.fn();

    emitter.on("message", messageListener).on("count", countListener);

    emitter.clear("message").emit("message", "hello").emit("count", 1);

    expect(messageListener).not.toHaveBeenCalled();
    expect(countListener).toHaveBeenCalledOnce();

    emitter.clear().emit("count", 2);

    expect(countListener).toHaveBeenCalledOnce();
  });

  it("reports listener counts", () => {
    const emitter = createEventEmitter<TestEvents>();
    const first = vi.fn();
    const second = vi.fn();

    expect(emitter.listenerCount("message")).toBe(0);
    expect(emitter.hasListeners()).toBe(false);

    emitter.on("message", first).on("message", second);

    expect(emitter.listenerCount("message")).toBe(2);
    expect(emitter.hasListeners("message")).toBe(true);
    expect(emitter.hasListeners()).toBe(true);
  });

  it("does not break when a listener unsubscribes during emit", () => {
    const emitter = createEventEmitter<TestEvents>();
    const second = vi.fn();

    const first = vi.fn(() => {
      emitter.off("message", first);
    });

    emitter.on("message", first).on("message", second).emit("message", "hello");

    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });
});
