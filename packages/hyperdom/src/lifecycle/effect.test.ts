// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";

import { createModel } from "../model/create-model";
import { h } from "../hyperscript/h";
import { renderModel } from "../model/test-utils";
import { effect } from "./effect";

describe("effect()", () => {
  it("runs immediately and tracks reactive dependencies", async () => {
    const runs = vi.fn();

    const { container, dispose } = renderModel(
      () => {
        const $value = signal("a");
        effect(() => {
          runs($value.value());
        });
        return { bump: () => $value.set("b") };
      },
      (vm) => h("button", { type: "button", onClick: vm.bump }, "bump"),
    );

    expect(runs).toHaveBeenCalledTimes(1);
    expect(runs).toHaveBeenLastCalledWith("a");

    container.querySelector("button")!.click();
    await Promise.resolve();

    expect(runs).toHaveBeenCalledTimes(2);
    expect(runs).toHaveBeenLastCalledWith("b");

    runs.mockClear();
    const bump = container.querySelector("button") as HTMLButtonElement;
    dispose();

    bump.click();
    await Promise.resolve();
    expect(runs).not.toHaveBeenCalled();
  });

  it("calls cleanup returned from the effect before rerunning", async () => {
    const invalidate = vi.fn();

    const { container } = renderModel(
      () => {
        const $value = signal(0);
        effect(() => {
          $value.value();
          return invalidate;
        });
        return { bump: () => $value.update((n) => n + 1) };
      },
      (vm) => h("button", { type: "button", onClick: vm.bump }, "bump"),
    );

    expect(invalidate).not.toHaveBeenCalled();

    container.querySelector("button")!.click();
    await Promise.resolve();

    expect(invalidate).toHaveBeenCalledTimes(1);
  });

  it("calls cleanup when the model disposes", () => {
    const invalidate = vi.fn();

    const { dispose } = renderModel(() => {
      effect(() => invalidate);
      return {};
    });

    dispose();
    expect(invalidate).toHaveBeenCalledTimes(1);
  });

  it("tracks multiple signals in one effect", async () => {
    const runs = vi.fn();

    const { container } = renderModel(
      () => {
        const $a = signal(1);
        const $b = signal(10);
        effect(() => {
          runs($a.value() + $b.value());
        });
        return { bumpA: () => $a.update((n) => n + 1) };
      },
      (vm) => h("button", { type: "button", onClick: vm.bumpA }, "bump"),
    );

    expect(runs).toHaveBeenLastCalledWith(11);

    container.querySelector("button")!.click();
    await Promise.resolve();

    expect(runs).toHaveBeenLastCalledWith(12);
  });

  it("throws outside createComponent model scope", () => {
    expect(() =>
      createModel(() => {
        effect(() => {});
        return {};
      }, "BadModel")(),
    ).toThrow(/createComponent/);
  });
});

describe("effect.mount()", () => {
  it("runs setup once when the model mounts", () => {
    const setup = vi.fn();

    const { dispose } = renderModel(() => {
      effect.mount(() => {
        setup();
      });
      return {};
    });

    expect(setup).toHaveBeenCalledTimes(1);
    dispose();
  });

  it("calls returned cleanup on model dispose", () => {
    const setup = vi.fn();
    const teardown = vi.fn();

    const { dispose } = renderModel(() => {
      effect.mount(() => {
        setup();
        return teardown;
      });
      return {};
    });

    expect(setup).toHaveBeenCalledTimes(1);
    expect(teardown).not.toHaveBeenCalled();

    dispose();
    expect(teardown).toHaveBeenCalledTimes(1);
  });

  it("does not rerun setup on reactive view updates", () => {
    const setup = vi.fn();

    const { container, dispose } = renderModel(
      () => {
        effect.mount(() => {
          setup();
        });
        return { label: "x" };
      },
      (vm) => h("span", null, vm.label),
    );

    expect(setup).toHaveBeenCalledTimes(1);
    expect(container.textContent).toBe("x");

    dispose();
    expect(setup).toHaveBeenCalledTimes(1);
  });

  it("supports multiple mount hooks in one model", () => {
    const first = vi.fn();
    const second = vi.fn();
    const cleanupFirst = vi.fn();
    const cleanupSecond = vi.fn();

    const { dispose } = renderModel(() => {
      effect.mount(() => {
        first();
        return cleanupFirst;
      });
      effect.mount(() => {
        second();
        return cleanupSecond;
      });
      return {};
    });

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    dispose();

    expect(cleanupFirst).toHaveBeenCalledTimes(1);
    expect(cleanupSecond).toHaveBeenCalledTimes(1);
  });

  it("throws outside createComponent model scope", () => {
    expect(() =>
      createModel(() => {
        effect.mount(() => {});
        return {};
      }, "BadModel")(),
    ).toThrow(/createComponent/);
  });
});

describe("effect.unmount()", () => {
  it("does not run before model dispose", () => {
    const teardown = vi.fn();

    const { dispose } = renderModel(() => {
      effect.unmount(teardown);
      return {};
    });

    expect(teardown).not.toHaveBeenCalled();
    dispose();
    expect(teardown).toHaveBeenCalledTimes(1);
  });

  it("runs all registered unmount callbacks", () => {
    const first = vi.fn();
    const second = vi.fn();

    const { dispose } = renderModel(() => {
      effect.unmount(first);
      effect.unmount(second);
      return {};
    });

    dispose();

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("does not run after remounting a new component instance", () => {
    const teardown = vi.fn();

    const first = renderModel(() => {
      effect.unmount(teardown);
      return {};
    });

    first.dispose();
    expect(teardown).toHaveBeenCalledTimes(1);

    teardown.mockClear();
    const second = renderModel(() => {
      effect.unmount(teardown);
      return {};
    });

    second.dispose();
    expect(teardown).toHaveBeenCalledTimes(1);
  });

  it("throws outside createComponent model scope", () => {
    expect(() =>
      createModel(() => {
        effect.unmount(() => {});
        return {};
      }, "BadModel")(),
    ).toThrow(/createComponent/);
  });
});

describe("effect.watch()", () => {
  it("runs callback when source changes with previous value", async () => {
    const spy = vi.fn();

    const { container } = renderModel(
      () => {
        const $value = signal(0);
        effect.watch(
          () => $value.value(),
          (value, previous) => {
            spy(value, previous);
          },
          { immediate: true },
        );
        return { bump: () => $value.update((n) => n + 1) };
      },
      (vm) => h("button", { type: "button", onClick: vm.bump }, "bump"),
    );

    expect(spy).toHaveBeenCalledWith(0, undefined);

    container.querySelector("button")!.click();
    await Promise.resolve();

    expect(spy).toHaveBeenCalledWith(1, 0);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("skips duplicate values with Object.is", async () => {
    const spy = vi.fn();

    const { container } = renderModel(
      () => {
        const $value = signal("same");
        effect.watch(
          () => $value.value(),
          (value) => {
            spy(value);
          },
          { immediate: true },
        );
        return {
          setSame: () => $value.set("same"),
          setNext: () => $value.set("next"),
        };
      },
      (vm) =>
        h("div", null, [
          h("button", { type: "button", "data-action": "same", onClick: vm.setSame }, "same"),
          h("button", { type: "button", "data-action": "next", onClick: vm.setNext }, "next"),
        ]),
    );

    expect(spy).toHaveBeenCalledTimes(1);

    (container.querySelector('[data-action="same"]') as HTMLButtonElement)!.click();
    await Promise.resolve();
    expect(spy).toHaveBeenCalledTimes(1);

    (container.querySelector('[data-action="next"]') as HTMLButtonElement)!.click();
    await Promise.resolve();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith("next");
  });

  it("does not run before first change without immediate", async () => {
    const spy = vi.fn();

    renderModel(() => {
      const $value = signal(0);
      effect.watch(() => $value.value(), spy);
      return {};
    });

    await Promise.resolve();
    expect(spy).not.toHaveBeenCalled();
  });

  it("calls callback cleanup before the next invocation", async () => {
    const cleanupFn = vi.fn();

    const { container } = renderModel(
      () => {
        const $value = signal(0);
        effect.watch(
          () => $value.value(),
          () => cleanupFn,
          { immediate: true },
        );
        return { bump: () => $value.update((n) => n + 1) };
      },
      (vm) => h("button", { type: "button", onClick: vm.bump }, "bump"),
    );

    container.querySelector("button")!.click();
    await Promise.resolve();

    expect(cleanupFn).toHaveBeenCalledTimes(1);
  });

  it("stops tracking after model dispose", async () => {
    const spy = vi.fn();
    let bump: (() => void) | undefined;

    const { dispose } = renderModel(
      () => {
        const $value = signal(0);
        effect.watch(
          () => $value.value(),
          (value) => spy(value),
          { immediate: true },
        );
        return { bump: () => $value.update((n) => n + 1) };
      },
      (vm) => {
        bump = vm.bump;
        return h("button", { type: "button", onClick: vm.bump }, "bump");
      },
    );

    spy.mockClear();
    dispose();

    bump?.();
    await Promise.resolve();
    expect(spy).not.toHaveBeenCalled();
  });

  it("throws outside createComponent model scope", () => {
    expect(() =>
      createModel(() => {
        effect.watch(() => 1, () => {});
        return {};
      }, "BadModel")(),
    ).toThrow(/createComponent/);
  });
});

describe("effect.source()", () => {
  it("is an alias for effect.watch", async () => {
    const spy = vi.fn();

    renderModel(() => {
      const $value = signal("a");
      effect.source(() => $value.value(), spy, { immediate: true });
      return {};
    });

    await Promise.resolve();
    expect(spy).toHaveBeenCalledWith("a", undefined);
  });
});
