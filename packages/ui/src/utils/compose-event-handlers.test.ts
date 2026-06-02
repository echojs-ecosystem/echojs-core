import { describe, expect, it, vi } from "vitest";
import { composeEventHandlers } from "./compose-event-handlers";

describe("composeEventHandlers", () => {
  it("runs user handler before internal handler", () => {
    const order: string[] = [];
    const handler = composeEventHandlers(
      () => order.push("user"),
      () => order.push("internal"),
    );

    handler?.({} as Event);
    expect(order).toEqual(["user", "internal"]);
  });

  it("skips internal handler when default was prevented", () => {
    const internal = vi.fn();
    const handler = composeEventHandlers(
      (event: Event) => event.preventDefault(),
      internal,
      { checkDefaultPrevented: true },
    );

    const event = {
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      },
    } as Event;

    handler?.(event);
    expect(internal).not.toHaveBeenCalled();
  });
});

