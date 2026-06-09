export type CleanupFn = () => void;

export interface CleanupScope {
  add(fn: CleanupFn): void;
  dispose(): void;
}

/** Creates a scope that collects cleanup callbacks and runs them on dispose. */
export const createCleanupScope = (): CleanupScope => {
  const cleanups: CleanupFn[] = [];
  let disposed = false;

  return {
    add(fn: CleanupFn) {
      if (disposed) return;
      cleanups.push(fn);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (let i = cleanups.length - 1; i >= 0; i--) {
        try {
          cleanups[i]?.();
        } catch {
          // best-effort cleanup
        }
      }
      cleanups.length = 0;
    },
  };
};

/** Alias for createCleanupScope — matches VueUse-style naming. */
export const tryOnCleanup = createCleanupScope;
