const PLACEHOLDER_PATTERN = /\{([^{}]+)\}/g;

export const interpolate = (
  template: string,
  params: Record<string, unknown> | undefined,
): string => {
  if (!params) {
    return template;
  }

  return template.replace(PLACEHOLDER_PATTERN, (match, rawKey: string) => {
    const key = rawKey.trim();
    if (!(key in params)) {
      return match;
    }

    const value = params[key];
    if (value === null || value === undefined) {
      return match;
    }

    return String(value);
  });
};
