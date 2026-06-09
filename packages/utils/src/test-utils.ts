import { vi } from "vitest";

export const mockMatchMedia = (matches = false) => {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mql = {
    matches,
    media: "",
    addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener);
    },
    dispatch(matchesNext: boolean) {
      this.matches = matchesNext;
      for (const listener of listeners) {
        listener({ matches: matchesNext } as MediaQueryListEvent);
      }
    },
  };
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => mql as unknown as MediaQueryList),
  );
  return mql;
};

export const mockResizeObserver = () => {
  const instances: Array<{
    callback: ResizeObserverCallback;
    elements: Element[];
    disconnect: () => void;
    trigger: (entry: Partial<ResizeObserverEntry>) => void;
  }> = [];

  class MockResizeObserver implements ResizeObserver {
    callback: ResizeObserverCallback;
    elements: Element[] = [];

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
      instances.push({
        callback,
        elements: this.elements,
        disconnect: () => this.disconnect(),
        trigger: (entry) => this.trigger(entry),
      });
    }

    observe(element: Element) {
      this.elements.push(element);
    }

    unobserve(element: Element) {
      this.elements = this.elements.filter((el) => el !== element);
    }

    disconnect() {
      this.elements = [];
    }

    trigger(entry: Partial<ResizeObserverEntry>) {
      this.callback(
        [
          {
            target: this.elements[0] ?? document.body,
            contentRect: {
              width: entry.contentRect?.width ?? 100,
              height: entry.contentRect?.height ?? 50,
              x: 0,
              y: 0,
              top: 0,
              left: 0,
              bottom: 50,
              right: 100,
            },
            ...entry,
          } as ResizeObserverEntry,
        ],
        this,
      );
    }
  }

  vi.stubGlobal("ResizeObserver", MockResizeObserver);
  return instances;
};

export const mockIntersectionObserver = () => {
  const instances: Array<{
    callback: IntersectionObserverCallback;
    trigger: (isIntersecting: boolean) => void;
    disconnect: () => void;
  }> = [];

  class MockIntersectionObserver implements IntersectionObserver {
    callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
      instances.push({
        callback,
        trigger: (isIntersecting) => this.trigger(isIntersecting),
        disconnect: () => this.disconnect(),
      });
    }

    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [0];

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }

    trigger(isIntersecting: boolean) {
      this.callback(
        [
          {
            isIntersecting,
            target: document.body,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: isIntersecting ? 1 : 0,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: Date.now(),
          },
        ],
        this,
      );
    }
  }

  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  return instances;
};
