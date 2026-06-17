import { Show } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";

import type {
  CheckPayload,
  PermissionCheckKey,
  PermissionInstance,
  PermissionSchema,
} from "../core/types";

export type PermissionCheckFn<Schema extends PermissionSchema> = {
  <Key extends PermissionCheckKey<Schema>>(
    check: CheckPayload<Schema, Key> extends void ? Key : never,
    children: () => Child,
    fallback?: () => Child,
  ): () => Child;
  <Key extends PermissionCheckKey<Schema>>(
    check: CheckPayload<Schema, Key> extends void ? never : Key,
    subject: CheckPayload<Schema, Key>,
    children: () => Child,
    fallback?: () => Child,
  ): () => Child;
};

/**
 * HyperDOM conditional region bound to a permission instance.
 *
 * Re-evaluates when `$ready` / `$version` change (role switch, hydrate, setup).
 *
 * @example
 * PermissionCheck("dashboard.view", () => content)
 * PermissionCheck("order.delete", order, () => button(...))
 */
export const createPermissionCheck = <Schema extends PermissionSchema>(
  permission: PermissionInstance<Schema>,
): PermissionCheckFn<Schema> => {
  const PermissionCheck = (
    check: PermissionCheckKey<Schema>,
    arg2: unknown,
    arg3?: unknown,
    arg4?: unknown,
  ): (() => Child) => {
    let subject: unknown;
    let children: () => Child;
    let fallback: (() => Child) | undefined;

    if (typeof arg2 === "function") {
      children = arg2 as () => Child;
      fallback = arg3 as (() => Child) | undefined;
    } else {
      subject = arg2;
      children = arg3 as () => Child;
      fallback = arg4 as (() => Child) | undefined;
    }

    return Show(
      () => {
        permission.$ready.value();
        permission.$version.value();

        return (permission.check as (key: string, payload?: unknown) => boolean)(
          check,
          subject,
        );
      },
      children,
      fallback,
    );
  };

  return PermissionCheck as PermissionCheckFn<Schema>;
};
