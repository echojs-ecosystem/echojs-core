export type ThrottleController = {
  kind: "throttle";
  ms: number;
  schedule(fn: () => void): void;
  cancel(): void;
};

export const throttle = (ms: number): ThrottleController => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pending: (() => void) | null = null;

  const flush = (): void => {
    if (!pending) return;
    const fn = pending;
    pending = null;
    fn();
  };

  return {
    kind: "throttle",
    ms,
    schedule(fn) {
      pending = fn;
      if (timer) return;
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

