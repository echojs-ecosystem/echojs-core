let permissionInstanceCounter = 0;

export const createPermissionInstanceId = (): string => {
  permissionInstanceCounter += 1;
  return `permission-${permissionInstanceCounter}`;
};
