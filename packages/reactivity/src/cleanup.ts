import { isFunction } from "./utils";
import type { Disposer } from "./internals/alien";

type CleanupFn = () => void;

let currentBucket: CleanupFn[] | undefined;

export const __withCleanupBucket = <T>(bucket: CleanupFn[], fn: () => T): T => {
  const prev = currentBucket;
  currentBucket = bucket;
  try {
    return fn();
  } finally {
    currentBucket = prev;
  }
};

export const __runCleanupBucket = (bucket: CleanupFn[]): void => {
  for (let i = bucket.length - 1; i >= 0; i--) {
    try {
      bucket[i]?.();
    } catch {
      // best-effort cleanup: userland errors shouldn't break disposal
    }
  }
  bucket.length = 0;
};

export const cleanup = (fn: CleanupFn): void => {
  if (!isFunction(fn)) {
    throw new TypeError("cleanup(fn) expects a function");
  }
  if (!currentBucket) {
    throw new Error("cleanup(fn) must be called inside scope()");
  }
  currentBucket.push(fn);
};

export const __wrapDisposerWithCleanup = (dispose: Disposer, bucket: CleanupFn[]): Disposer => {
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    try {
      dispose();
    } finally {
      __runCleanupBucket(bucket);
    }
  };
};
