import { createAlienScope } from "@internals/alien";
import { __withCleanupBucket, __wrapDisposerWithCleanup } from "./cleanup";
import { isFunction } from "./utils";

export const scope = (fn: () => void): (() => void) => {
  if (!isFunction(fn)) {
    throw new TypeError("scope(fn) expects a function");
  }

  const bucket: Array<() => void> = [];
  const dispose = createAlienScope(() => __withCleanupBucket(bucket, fn));
  return __wrapDisposerWithCleanup(dispose, bucket);
};
