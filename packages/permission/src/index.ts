export { createPermission } from "./core/create-permission";
export { createPermissionTemplate } from "./core/template";
export { createPermissionCheck } from "./hyperdom/create-permission-check";

export type {
  CheckPayload,
  PermissionActionEntry,
  PermissionCheckKey,
  PermissionEvent,
  PermissionEventMap,
  PermissionEvents,
  PermissionInstance,
  PermissionRule,
  PermissionSchema,
  PermissionSetupConfig,
  PermissionSnapshot,
} from "./core/types";

export type { PermissionCheckFn } from "./hyperdom/create-permission-check";
