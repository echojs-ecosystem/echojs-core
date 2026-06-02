import type { TVConfig } from "../theme/variants";

type VariantFn = ((options?: Record<string, unknown>) => unknown) & {
  _config?: TVConfig;
};

/** Collects variant prop names from a `tv()` config attached to the variants function. */
export const getVariantKeysFromFn = (variantsFn?: VariantFn): string[] => {
  const variants = variantsFn?._config?.variants;
  if (!variants) return [];
  return Object.keys(variants);
};

export const resolveVariantOptions = (
  variantsFn: VariantFn | undefined,
  themeDefaults: Record<string, unknown> | undefined,
  props: Record<string, unknown>,
): Record<string, unknown> => {
  const keys = [
    ...new Set([
      ...getVariantKeysFromFn(variantsFn),
      ...Object.keys(variantsFn?._config?.defaultVariants ?? {}),
      ...Object.keys(themeDefaults ?? {}),
    ]),
  ];

  const picked: Record<string, unknown> = {};
  for (const key of keys) {
    if (props[key] !== undefined) picked[key] = props[key];
  }

  return {
    ...variantsFn?._config?.defaultVariants,
    ...themeDefaults,
    ...picked,
  };
};
