/**
 * Substitutes `{param}` placeholders in an OpenAPI path template.
 *
 * Generated into `runtime/build-path.ts` for use by endpoint functions.
 */
export function buildPath(
  template: string,
  parts?: {
    params?: Record<string, string | number | boolean>;
  },
): string {
  if (!parts?.params) {
    return template;
  }

  return Object.entries(parts.params).reduce((path, [key, value]) => {
    return path.replaceAll(`{${key}}`, encodeURIComponent(String(value)));
  }, template);
}