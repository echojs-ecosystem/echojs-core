/**
 * Generated runtime helpers for API URL building.
 *
 * Emitted into `runtime/api-url.ts` with `apiBaseUrl` from generator config.
 */
export const apiBaseUrl = "" as string;

/** Join configured base URL with a relative API path. */
export function withBaseUrl(path: string): string {
  if (!apiBaseUrl) return path;

  const base = apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
  const relative = path.startsWith("/") ? path : `/${path}`;

  return `${base}${relative}`;
}