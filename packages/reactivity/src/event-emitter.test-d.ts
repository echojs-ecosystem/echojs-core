import { expectTypeOf, test } from "vitest";

import { createEventEmitter, type EventEmitter } from "./event-emitter";

type AppEvents = {
  ready: void;
  error: Error;
  update: { id: string };
};

test("event emitter types", () => {
  const emitter = createEventEmitter<AppEvents>();

  expectTypeOf(emitter).toEqualTypeOf<EventEmitter<AppEvents>>();
  expectTypeOf(emitter.on).toBeFunction();
  expectTypeOf(emitter.emit).toBeFunction();

  emitter.on("ready", () => {});
  emitter.on("error", (error) => {
    expectTypeOf(error).toEqualTypeOf<Error>();
  });
  emitter.on("update", (payload) => {
    expectTypeOf(payload).toEqualTypeOf<{ id: string }>();
  });

  expectTypeOf(
    emitter.on("ready", () => {}).on("error", () => {}).emit("ready"),
  ).toEqualTypeOf<EventEmitter<AppEvents>>();

  emitter.emit("ready");
  emitter.emit("error", new Error("boom"));
  emitter.emit("update", { id: "1" });
});
