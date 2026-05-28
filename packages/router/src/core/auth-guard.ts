import { matchPath, normalizePathname } from "./path";

const isDevMode = (): boolean => {
  try {
    return (import.meta as { env?: { MODE?: string } }).env?.MODE === "development";
  } catch {
    return false;
  }
};
import type {
  AuthorizationGuardOptions,
  AuthorizationGuardRedirectContext,
  AuthorizationGuardRedirectTarget,
  RouterHistory,
} from "./types";

const resolveRedirectTarget = <Paths extends string>(
  target: AuthorizationGuardRedirectTarget<Paths> | undefined,
  context: AuthorizationGuardRedirectContext,
  fallback: Paths,
): Paths => {
  if (target === undefined) return fallback;
  return typeof target === "function" ? target(context) : target;
};

const isPathAllowed = (pathname: string, allowedPaths: readonly string[]): boolean => {
  const normalized = normalizePathname(pathname);

  for (const pattern of allowedPaths) {
    const normalizedPattern = normalizePathname(pattern);
    if (normalized === normalizedPattern) return true;
    if (matchPath(normalizedPattern, normalized).matched) return true;
  }

  return false;
};

const redirectIfNeeded = (
  pathname: string,
  target: string,
  history: RouterHistory,
  allowedPaths: readonly string[],
  label: string,
): boolean => {
  const normalizedTarget = normalizePathname(target);
  const normalizedCurrent = normalizePathname(pathname);

  if (normalizedTarget === normalizedCurrent) {
    return true;
  }

  if (!isPathAllowed(normalizedTarget, allowedPaths)) {
    const allowed = allowedPaths.join(", ");
    const message =
      `[router] authorizationGuard ${label}: redirect target "${target}" is not allowed (${allowed}).`;
    if (isDevMode()) {
      throw new Error(message);
    }
    console.error(message);
    return false;
  }

  history.replace(target);
  return false;
};

export const runAuthorizationGuard = (
  pathname: string,
  options: AuthorizationGuardOptions,
  history: RouterHistory,
): boolean => {
  const authorized = options.isAuthorized();
  const redirectContext = (authorized: boolean): AuthorizationGuardRedirectContext => ({
    pathname,
    authorized,
  });

  if (!authorized) {
    if (isPathAllowed(pathname, options.allowedUnauthorizedPaths)) {
      return true;
    }
    const target = resolveRedirectTarget(
      options.redirectTo,
      redirectContext(false),
      "/login",
    );
    return redirectIfNeeded(
      pathname,
      target,
      history,
      options.allowedUnauthorizedPaths,
      "redirectTo",
    );
  }

  if (options.allowedAuthorizedPaths?.length) {
    if (!isPathAllowed(pathname, options.allowedAuthorizedPaths)) {
      const target = resolveRedirectTarget(
        options.redirectWhenAuthorized,
        redirectContext(true),
        "/",
      );
      return redirectIfNeeded(
        pathname,
        target,
        history,
        options.allowedAuthorizedPaths,
        "redirectWhenAuthorized",
      );
    }
  }

  if (
    options.redirectWhenAuthorized !== undefined &&
    isPathAllowed(pathname, options.allowedUnauthorizedPaths)
  ) {
    const target = resolveRedirectTarget(
      options.redirectWhenAuthorized,
      redirectContext(true),
      "/",
    );
    const normalizedTarget = normalizePathname(target);
    const normalizedCurrent = normalizePathname(pathname);
    if (normalizedTarget === normalizedCurrent) return true;

    if (
      options.allowedAuthorizedPaths?.length &&
      !isPathAllowed(normalizedTarget, options.allowedAuthorizedPaths)
    ) {
      const message = `[router] authorizationGuard redirectWhenAuthorized: "${target}" is not in allowedAuthorizedPaths.`;
      if (isDevMode()) {
        throw new Error(message);
      }
      console.error(message);
      return false;
    }

    history.replace(target);
    return false;
  }

  return true;
};
