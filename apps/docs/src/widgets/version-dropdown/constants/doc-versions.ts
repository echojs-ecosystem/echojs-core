import { signal } from "@echojs/reactivity";

export type DocVersionEntry = {
  id: string;
  label: string;
  badge?: string;
  /** When set, selecting navigates (versioned docs host or path prefix). */
  href?: string;
  current?: boolean;
  disabled?: boolean;
};

export const DOC_VERSIONS: DocVersionEntry[] = [
  { id: "0.1", label: "v0.1", badge: "Latest", current: true },
  { id: "0.0", label: "v0.0", disabled: true },
];

const STORAGE_KEY = "echojs-docs-version";

const initialVersion = (): string => {
  if (typeof window === "undefined") return "0.1";
  const stored = localStorage.getItem(STORAGE_KEY);
  const valid = DOC_VERSIONS.find((v) => v.id === stored && !v.disabled);
  return valid?.id ?? DOC_VERSIONS.find((v) => v.current)?.id ?? "0.1";
};

export const $docVersionId = signal(initialVersion());

export const setDocVersionId = (id: string): void => {
  const entry = DOC_VERSIONS.find((v) => v.id === id);
  if (!entry || entry.disabled) return;
  if (entry.href) {
    window.location.assign(entry.href);
    return;
  }
  $docVersionId.set(id);
  localStorage.setItem(STORAGE_KEY, id);
};

export const currentDocVersion = (): DocVersionEntry =>
  DOC_VERSIONS.find((v) => v.id === $docVersionId.value()) ??
  DOC_VERSIONS.find((v) => v.current)!;
