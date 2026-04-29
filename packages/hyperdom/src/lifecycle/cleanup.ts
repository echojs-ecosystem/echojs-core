export type CleanupFn = () => void;

export interface Scope {
  readonly cleanups: CleanupFn[];
  disposed: boolean;
}

let currentScope: Scope | null = null;

export function createScope(): Scope {
  return { cleanups: [], disposed: false };
}

export function getCurrentScope(): Scope | null {
  return currentScope;
}

export function runWithScope<T>(scope: Scope, fn: () => T): T {
  const prev = currentScope;
  currentScope = scope;
  try {
    return fn();
  } finally {
    currentScope = prev;
  }
}

export function onCleanup(fn: CleanupFn): void {
  const scope = currentScope;
  if (!scope || scope.disposed) return;
  scope.cleanups.push(fn);
}

export function disposeScope(scope: Scope): void {
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
}

