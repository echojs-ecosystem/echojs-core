export type DebounceController = {
  kind: "debounce";
  ms: number;
  schedule(fn: () => void): void;
  cancel(): void;
};

export const debounce = (ms: number): DebounceController => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pending: (() => void) | null = null;

  const flush = (): void => {
    if (!pending) return;
    const fn = pending;
    pending = null;
    fn();
  };

  return {
    kind: "debounce",
    ms,
    schedule(fn) {
      pending = fn;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        flush();
      }, ms);
    },
    cancel() {
      if (timer) clearTimeout(timer);
      timer = null;
      pending = null;
    },
  };
};

