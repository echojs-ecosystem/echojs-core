import { createPermissionInstance } from "./permission-instance";
import type { PermissionInstance, PermissionSchema } from "./types";

export const createPermission = <Schema extends PermissionSchema>(): PermissionInstance<Schema> => {
  return createPermissionInstance<Schema>();
};
