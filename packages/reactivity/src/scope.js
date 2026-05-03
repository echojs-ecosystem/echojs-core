import { createAlienScope } from "./internals/alien";
import { __withCleanupBucket, __wrapDisposerWithCleanup } from "./cleanup";
import { isFunction } from "./utils";
export const scope = (fn) => {
  if (!isFunction(fn)) {
    throw new TypeError("scope(fn) expects a function");
  }
  const bucket = [];
  const dispose = createAlienScope(() => __withCleanupBucket(bucket, fn));
  return __wrapDisposerWithCleanup(dispose, bucket);
};
//# sourceMappingURL=scope.js.map
