export type CleanupFn = () => void;

export interface Scope {
  readonly cleanups: CleanupFn[];
  disposed: boolean;
}

let currentScope: Scope | null = null;

/** Creates a fresh cleanup scope (used by render and dynamic regions). */
export const createScope = (): Scope => ({ cleanups: [], disposed: false });

/** Returns the scope currently active on this call stack (if any). */
export const getCurrentScope = (): Scope | null => currentScope;

/**
 * Runs a function with `scope` set as current, restoring the previous scope afterwards.
 */
export const runWithScope = <T>(scope: Scope, fn: () => T): T => {
  const prev = currentScope;
  currentScope = scope;
  try {
    return fn();
  } finally {
    currentScope = prev;
  }
};

/** Registers a cleanup callback on the current scope (no-op if no active scope). */
export const onCleanup = (fn: CleanupFn): void => {
  const scope = currentScope;
  if (!scope || scope.disposed) return;
  scope.cleanups.push(fn);
};

/** Disposes a scope, running cleanups in reverse order (best-effort). */
export const disposeScope = (scope: Scope): void => {
  if (scope.disposed) return;
  scope.disposed = true;

  for (let i = scope.cleanups.length - 1; i >= 0; i--) {
    try {
      scope.cleanups[i]?.();
    } catch {
      // best-effort cleanup
    }
  }
  scope.cleanups.length = 0;
};
