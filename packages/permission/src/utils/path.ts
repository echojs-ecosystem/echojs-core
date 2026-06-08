export type ParsedPermissionKey = {
  resource: string;
  action: string;
};

export const parsePermissionKey = (key: string): ParsedPermissionKey | null => {
  const dot = key.indexOf(".");

  if (dot <= 0 || dot === key.length - 1) {
    return null;
  }

  return {
    resource: key.slice(0, dot),
    action: key.slice(dot + 1),
  };
};

export const formatPermissionKey = (resource: string, action: string): string => {
  return `${resource}.${action}`;
};
