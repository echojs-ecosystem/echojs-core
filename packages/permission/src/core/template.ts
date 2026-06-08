import type { PermissionSchema, PermissionSetupConfig } from "./types";

export const createPermissionTemplate = <Schema extends PermissionSchema>(
  config: PermissionSetupConfig<Schema>,
): PermissionSetupConfig<Schema> => {
  return config;
};
