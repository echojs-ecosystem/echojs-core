import { defaultTheme } from "./default-theme";
import type { ComponentThemeConfig, UITheme } from "./types";

const mergeComponentConfig = (
  base: ComponentThemeConfig | undefined,
  next: ComponentThemeConfig | undefined,
): ComponentThemeConfig | undefined => {
  if (!base && !next) return undefined;
  if (!base) return next ? { ...next } : undefined;
  if (!next) return { ...base };

  return {
    baseClass: next.baseClass ?? base.baseClass,
    className: next.className ?? base.className,
    defaultProps: { ...base.defaultProps, ...next.defaultProps },
    defaultVariants: { ...base.defaultVariants, ...next.defaultVariants },
    variants: { ...base.variants, ...next.variants },
  };
};

const mergeComponents = (
  base: UITheme["components"],
  next: UITheme["components"],
): UITheme["components"] => {
  const keys = new Set([...Object.keys(base ?? {}), ...Object.keys(next ?? {})]);
  const merged: Record<string, ComponentThemeConfig> = {};

  for (const key of keys) {
    const slice = mergeComponentConfig(base?.[key], next?.[key]);
    if (slice) merged[key] = slice;
  }

  return merged;
};

/**
 * Merges partial theme config into a base theme (defaults to {@link defaultTheme}).
 */
export const createTheme = (input: Partial<UITheme>, base: UITheme = defaultTheme): UITheme => ({
  prefix: input.prefix ?? base.prefix,
  headless: input.headless ?? base.headless,
  components: mergeComponents(base.components, input.components),
});
