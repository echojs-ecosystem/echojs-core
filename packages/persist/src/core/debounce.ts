export type DebouncedFn<T extends (...args: never[]) => void> = T & {
  cancel(): void;
  flush(): void;
};

export const debounce = <T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
): DebouncedFn<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = ((...args: Parameters<T>) => {
    if (timer != null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, ms);
  }) as DebouncedFn<T>;

  debounced.cancel = () => {
    if (timer != null) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  debounced.flush = () => {
    if (timer == null) {
      return;
    }
    clearTimeout(timer);
    timer = undefined;
    fn();
  };

  return debounced;
};
