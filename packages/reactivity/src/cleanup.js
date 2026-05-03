import { isFunction } from "./utils";
let currentBucket;
export const __withCleanupBucket = (bucket, fn) => {
    const prev = currentBucket;
    currentBucket = bucket;
    try {
        return fn();
    }
    finally {
        currentBucket = prev;
    }
};
export const __runCleanupBucket = (bucket) => {
    for (let i = bucket.length - 1; i >= 0; i--) {
        try {
            bucket[i]?.();
        }
        catch {
            // best-effort cleanup: userland errors shouldn't break disposal
        }
    }
    bucket.length = 0;
};
export const cleanup = (fn) => {
    if (!isFunction(fn)) {
        throw new TypeError("cleanup(fn) expects a function");
    }
    if (!currentBucket) {
        throw new Error("cleanup(fn) must be called inside scope()");
    }
    currentBucket.push(fn);
};
export const __wrapDisposerWithCleanup = (dispose, bucket) => {
    let disposed = false;
    return () => {
        if (disposed)
            return;
        disposed = true;
        try {
            dispose();
        }
        finally {
            __runCleanupBucket(bucket);
        }
    };
};
//# sourceMappingURL=cleanup.js.map