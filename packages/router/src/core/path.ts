import type { MatchResult } from "./types.js";

export const normalizePathname = (pathname: string): string => {
  let path = pathname;
  const queryIndex = path.indexOf("?");
  if (queryIndex !== -1) path = path.slice(0, queryIndex);
  const hashIndex = path.indexOf("#");
  if (hashIndex !== -1) path = path.slice(0, hashIndex);

  if (!path || path === "/") return "/";
  path = path.replace(/\/+$/, "");
  return path || "/";
};

export const joinRoutePaths = (parentPath: string, childPath: string): string => {
  const parent = normalizePathname(parentPath || "/");
  const child = childPath.trim();

  if (!child || child === "/") return parent;

  if (child.startsWith("/")) {
    return normalizePathname(child);
  }

  const base = parent === "/" ? "" : parent;
  return normalizePathname(`${base}/${child}`);
};

const splitSegments = (path: string): string[] => {
  const normalized = normalizePathname(path);
  if (normalized === "/") return [];
  return normalized.slice(1).split("/");
};

const decodeParam = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const encodeParam = (value: string): string => encodeURIComponent(value);

export const matchPath = (pattern: string, pathname: string): MatchResult => {
  const patternSegments = splitSegments(pattern);
  const pathSegments = splitSegments(pathname);

  if (patternSegments.length === 0) {
    return { matched: pathSegments.length === 0, params: {} };
  }

  const params: Record<string, string> = {};
  let pi = 0;
  let si = 0;

  while (pi < patternSegments.length) {
    const segment = patternSegments[pi]!;

    if (segment === "*") {
      if (si > pathSegments.length) {
        return { matched: false, params: {} };
      }
      const rest = pathSegments.slice(si).map(decodeParam).join("/");
      params["*"] = rest;
      return { matched: true, params };
    }

    if (si >= pathSegments.length) {
      return { matched: false, params: {} };
    }

    if (segment.startsWith(":")) {
      const key = segment.slice(1);
      params[key] = decodeParam(pathSegments[si]!);
      pi += 1;
      si += 1;
      continue;
    }

    if (segment !== pathSegments[si]) {
      return { matched: false, params: {} };
    }

    pi += 1;
    si += 1;
  }

  if (si !== pathSegments.length) {
    return { matched: false, params: {} };
  }

  return { matched: true, params };
};

export const buildPath = (pattern: string, params: Record<string, string> = {}): string => {
  const segments = splitSegments(pattern);
  if (segments.length === 0) return "/";

  const built = segments.map((segment) => {
    if (segment === "*") {
      const value = params["*"] ?? "";
      return value.split("/").map(encodeParam).join("/");
    }
    if (segment.startsWith(":")) {
      const key = segment.slice(1);
      const value = params[key];
      if (value === undefined) {
        throw new Error(`Missing path param "${key}" for pattern "${pattern}"`);
      }
      return encodeParam(value);
    }
    return segment;
  });

  return `/${built.join("/")}`;
};

export const splitLocation = (location: string): { pathname: string; search: string } => {
  let path = location;
  let search = "";

  const queryIndex = path.indexOf("?");
  if (queryIndex !== -1) {
    search = path.slice(queryIndex);
    path = path.slice(0, queryIndex);
  }

  const hashIndex = path.indexOf("#");
  if (hashIndex !== -1) {
    path = path.slice(0, hashIndex);
  }

  return {
    pathname: normalizePathname(path),
    search,
  };
};

export const joinLocation = (pathname: string, search: string): string => {
  const path = normalizePathname(pathname);
  if (!search) return path;
  return search.startsWith("?") ? `${path}${search}` : `${path}?${search}`;
};
