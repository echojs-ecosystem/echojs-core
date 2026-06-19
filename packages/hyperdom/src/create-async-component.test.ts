// @vitest-environment jsdom
import { describe, expect, it, vi, afterEach } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";

import { createView } from "./create-view";
import { h } from "./h";
import { createModel } from "./create-model";
import { createAsyncComponent } from "./create-async-component";
import { mount } from "./mount";

afterEach(() => {
  vi.useRealTimers();
});

const createWidgetChunk = (label: string) => {
  const widgetModel = createModel(
    () => {
      const $label = signal(label);
      return { label: () => $label.value() };
    },
    { name: "WidgetModel" },
  );

  const WidgetView = createView(
    (vm: { label: () => string }) => h("span", null, () => vm.label()),
    "WidgetView",
  );

  return { model: widgetModel, view: WidgetView };
};

describe("createAsyncComponent", () => {
  it("binds loaded model + view like createComponent", async () => {
    vi.useFakeTimers();

    let resolveLoad!: (value: ReturnType<typeof createWidgetChunk>) => void;
    const loader = vi.fn(
      () =>
        new Promise<ReturnType<typeof createWidgetChunk>>((resolve) => {
          resolveLoad = resolve;
        }),
    );

    const LazyWidget = createAsyncComponent({
      name: "Widget",
      loader,
      loadingComponent: () => "loading",
      delay: 200,
    });

    const { node, dispose } = mount(h("div", null, LazyWidget()));

    expect(node.textContent).toBe("");

    await vi.advanceTimersByTimeAsync(200);
    expect(node.textContent).toBe("loading");

    resolveLoad(createWidgetChunk("ready"));
    await vi.runAllTimersAsync();

    expect(node.textContent).toBe("ready");

    dispose();
  });

  it("skips loadingComponent when chunk resolves before delay", async () => {
    vi.useFakeTimers();

    const LazyWidget = createAsyncComponent({
      loader: () => Promise.resolve(createWidgetChunk("ready")),
      loadingComponent: () => "loading",
      delay: 200,
    });

    const { node, dispose } = mount(h("div", null, LazyWidget()));

    await vi.waitFor(() => {
      expect(node.textContent).toBe("ready");
    });

    await vi.advanceTimersByTimeAsync(200);
    expect(node.textContent).toBe("ready");

    dispose();
  });

  it("renders errorComponent when import fails", async () => {
    const LazyWidget = createAsyncComponent({
      loader: () => Promise.reject(new Error("chunk failed")),
      errorComponent: ({ error }) => `error: ${(error as Error).message}`,
    });

    const { node, dispose } = mount(h("div", null, LazyWidget()));

    await vi.waitFor(() => {
      expect(node.textContent).toBe("error: chunk failed");
    });

    dispose();
  });

  it("renders errorComponent when timeout is exceeded", async () => {
    vi.useFakeTimers();

    const loader = vi.fn(
      () =>
        new Promise<ReturnType<typeof createWidgetChunk>>(() => {
          /* never resolves */
        }),
    );

    const LazyWidget = createAsyncComponent({
      name: "Slow",
      loader,
      timeout: 3000,
      errorComponent: ({ error }) => (error as Error).message,
    });

    const { node, dispose } = mount(h("div", null, LazyWidget()));

    await vi.advanceTimersByTimeAsync(3000);

    expect(node.textContent).toBe('Async component "Slow" timed out after 3000ms.');

    dispose();
  });

  it("preload resolves before first render", async () => {
    const loader = vi.fn(() => Promise.resolve(createWidgetChunk("loaded")));

    const LazyWidget = createAsyncComponent({
      loader,
    });

    await LazyWidget.preload();

    expect(loader).toHaveBeenCalledTimes(1);

    const { node, dispose } = mount(h("div", null, LazyWidget()));

    expect(node.textContent).toBe("loaded");
    expect(loader).toHaveBeenCalledTimes(1);

    dispose();
  });

  it("reset clears cache and allows reload", async () => {
    let call = 0;
    const loader = vi.fn(() => {
      call += 1;
      return Promise.resolve(createWidgetChunk(call === 1 ? "first" : "second"));
    });

    const LazyWidget = createAsyncComponent({ loader });

    const { node, dispose } = mount(h("div", null, LazyWidget()));

    await vi.waitFor(() => {
      expect(node.textContent).toBe("first");
    });

    LazyWidget.reset();

    await LazyWidget.preload();
    await vi.waitFor(() => {
      expect(node.textContent).toBe("second");
    });

    expect(loader).toHaveBeenCalledTimes(2);

    dispose();
  });

  it("throws when loader does not resolve model and view", async () => {
    const LazyWidget = createAsyncComponent({
      name: "Broken",
      loader: () => Promise.resolve({ model: "nope" as never, view: "nope" as never }),
      errorComponent: ({ error }) => (error as Error).message,
    });

    const { node, dispose } = mount(h("div", null, LazyWidget()));

    await vi.waitFor(() => {
      expect(node.textContent).toContain('Async component "Broken"');
    });

    dispose();
  });
});
