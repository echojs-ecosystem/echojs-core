import { describe, expect, it, vi } from "vitest";

import { createPermission } from "../src";

describe("events", () => {
  it("emits setup, change, reset, hydrate and check events", () => {
    const permission = createPermission<{
      post: ["read", "publish"];
    }>();

    const onSetup = vi.fn();
    const onChange = vi.fn();
    const onReset = vi.fn();
    const onHydrate = vi.fn();
    const onCheck = vi.fn();

    permission.events.setup.watch(onSetup);
    permission.events.change.watch(onChange);
    permission.events.reset.watch(onReset);
    permission.events.hydrate.watch(onHydrate);
    permission.events.check.watch(onCheck);

    permission.setup({
      post: {
        read: true,
        publish: async () => true,
      },
    });

    expect(onSetup).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);

    permission.check("post.read");
    expect(onCheck).toHaveBeenCalledWith({
      key: "post.read",
      result: true,
      payload: undefined,
    });

    const snapshot = permission.dehydrate();
    permission.reset();
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(2);

    permission.hydrate(snapshot);
    expect(onHydrate).toHaveBeenCalledWith({ snapshot });
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("supports permission.on shorthand", () => {
    const permission = createPermission<{
      post: ["read"];
    }>();

    const listener = vi.fn();
    const unsubscribe = permission.on("setup", listener);

    permission.setup({
      post: {
        read: true,
      },
    });

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    permission.reset();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
