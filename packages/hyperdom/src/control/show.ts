import type { Child } from "../types";

export function Show(condition: () => boolean, children: () => Child, fallback?: () => Child): () => Child {
  return () => (condition() ? children() : fallback?.() ?? null);
}

