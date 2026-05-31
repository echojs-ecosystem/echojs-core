import { describe, expect, it, vi } from "vitest";
import { signal } from "@echojs/reactivity";

import { createView } from "../create-view";
import { h } from "../h";
import { render } from "../render";
import type { Child } from "../types";
import { mount as onMount } from "./on-mount";

describe("mount()", () => {
  it("вызывает callback после render и регистрирует cleanup на dispose", () => {
    const container = document.createElement("div");
    const mounted = vi.fn();
    const cleaned = vi.fn();

    const dispose = render(
      h("div", null, [
        onMount(() => {
          mounted();
          expect(container.textContent).toBe("x");
          return () => cleaned();
        }),
        "x",
      ]),
      container,
    );

    expect(mounted).toHaveBeenCalledTimes(1);
    dispose();
    expect(cleaned).toHaveBeenCalledTimes(1);
  });

  it("вызывает cleanup при замене динамического региона", async () => {
    const container = document.createElement("div");
    const flag = signal(true);
    const cleaned = vi.fn();

    render(
      h("div", null, () =>
        flag.value()
          ? h("div", null, [
              onMount(() => {
                return () => cleaned();
              }),
              "A",
            ])
          : h("div", null, "B"),
      ),
      container,
    );

    expect(container.textContent).toBe("A");
    flag.set(false);
    await Promise.resolve();
    expect(container.textContent).toBe("B");
    expect(cleaned).toHaveBeenCalledTimes(1);
  });

  it("createView может оборачивать mount hook", () => {
    const container = document.createElement("div");
    const mounted = vi.fn();
    const cleaned = vi.fn();

    const View = createView(
      (): Child => [
        onMount(() => {
          mounted();
          return () => cleaned();
        }),
        h("div", null, "x"),
      ],
      "MountHookView",
    );

    const dispose = render(View(undefined as void), container);
    expect(container.textContent).toBe("x");
    expect(mounted).toHaveBeenCalledTimes(1);
    dispose();
    expect(cleaned).toHaveBeenCalledTimes(1);
  });
});
