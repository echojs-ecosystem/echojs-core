import { describe, expect, it, vi } from "vitest";
import { mergeProps } from "../src/utils/merge-props";

describe("mergeProps", () => {
  it("gives component props highest priority for plain fields", () => {
    const result = mergeProps({ id: "default" }, { id: "provider" }, { id: "component" });
    expect(result.id).toBe("component");
  });

  it("merges class and className instead of overwriting", () => {
    const result = mergeProps(
      { className: "a" },
      { class: "b" },
      { className: "c", class: "d" },
    );
    expect(result.className).toBe("a b c d");
  });

  it("composes event handlers with component first", () => {
    const order: string[] = [];
    const result = mergeProps(
      { onClick: () => order.push("default") },
      { onClick: () => order.push("provider") },
      { onClick: () => order.push("component") },
    );

    (result.onClick as () => void)();
    expect(order).toEqual(["component", "provider", "default"]);
  });

  it("respects preventDefault when composing handlers", () => {
    const internal = vi.fn();
    const composed = mergeProps(
      { onClick: internal },
      undefined,
      {
        onClick: (event: Event) => {
          event.preventDefault();
        },
      },
    );

    const event = {
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      },
    } as Event;

    (composed.onClick as (e: Event) => void)(event);
    expect(internal).not.toHaveBeenCalled();
  });
});

