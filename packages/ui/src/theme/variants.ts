/**
 * Stage 1 note:
 * We keep a small abstraction layer around variant class resolution so we can
 * plug `tailwind-variants` later without changing component code.
 */

export type TVVariantsShape = Record<string, Record<string, string>>;
export type TVBooleanVariantShape = Record<string, { true?: string; false?: string }>;

export type TVConfig = {
  base?: string;
  variants?: TVVariantsShape & TVBooleanVariantShape;
  defaultVariants?: Record<string, string | boolean>;
  slots?: Record<string, string>;
};

export type TVResult<T extends TVConfig> =
  T extends { slots: Record<string, any> }
    ? {
        (options?: Record<string, unknown>): Record<keyof T["slots"], (slotOptions?: Record<string, unknown>) => string>;
        /** base for debugging/inspection */
        _config: T;
      }
    : {
        (options?: Record<string, unknown>): string;
        _config: T;
      };

/** Roughly compatible `tv()` subset (Stage 2). */
export const tv = <T extends TVConfig>(config: T): TVResult<T> => {
  const resolve = (options?: Record<string, unknown>): string => {
    const parts: string[] = [];
    if (config.base) parts.push(config.base);

    const resolved = { ...(config.defaultVariants ?? {}), ...(options ?? {}) } as Record<
      string,
      string | boolean | undefined
    >;

    const variants = config.variants ?? {};
    for (const [variantName, map] of Object.entries(variants)) {
      const value = resolved[variantName];
      if (value === undefined) continue;

      const key = typeof value === "boolean" ? (value ? "true" : "false") : String(value);
      const cls = (map as any)[key] as string | undefined;
      if (cls) parts.push(cls);
    }

    return parts.filter(Boolean).join(" ");
  };

  if (config.slots) {
    const slotFns: any = {};
    for (const [slot, slotBase] of Object.entries(config.slots)) {
      slotFns[slot] = (slotOptions?: Record<string, unknown>) => {
        const composed = [slotBase, resolve(slotOptions)].filter(Boolean).join(" ");
        return composed.trim();
      };
    }
    slotFns._config = config;
    return slotFns as TVResult<T>;
  }

  const fn: any = (options?: Record<string, unknown>) => resolve(options);
  fn._config = config;
  return fn as TVResult<T>;
};

export type VariantProps<T> = T extends { _config: infer C }
  ? C extends { variants: infer V }
    ? {
        [K in keyof V]?: V[K] extends Record<infer Key, any>
          ? Key extends "true" | "false"
            ? boolean
            : Key
          : never;
      }
    : Record<string, never>
  : Record<string, never>;

/** Compatibility export (mirrors tailwind-variants). */
export const createComponentVariants = tv;

/**
 * Resolves variant classes when styling is enabled.
 */
export const resolveVariantClasses = (
  variantFn: ((options?: Record<string, unknown>) => string) | undefined,
  options: Record<string, unknown> | undefined,
  headless: boolean,
): string | undefined => {
  if (headless || !variantFn) return undefined;
  return variantFn(options);
};
