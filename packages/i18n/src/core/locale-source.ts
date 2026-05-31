import type { LocaleImporter, LocaleModuleResult, LocaleSource, Messages } from "../types";

export const isLocaleImporter = <T extends Messages>(
  source: LocaleSource<T>,
): source is LocaleImporter<T> => typeof source === "function";

const hasDefaultExport = <T extends Messages>(
  result: LocaleModuleResult<T>,
): result is { default: T } =>
  typeof result === "object" &&
  result !== null &&
  "default" in result &&
  result.default !== undefined &&
  typeof result.default === "object" &&
  result.default !== null &&
  !Array.isArray(result.default);

export const resolveLocaleModule = async <T extends Messages>(
  source: LocaleSource<T>,
): Promise<T> => {
  if (!isLocaleImporter(source)) {
    return source;
  }

  const result = await source();
  if (hasDefaultExport(result)) {
    return result.default;
  }

  return result;
};

export const resolveLocaleModuleSync = <T extends Messages>(
  source: LocaleSource<T>,
): T | undefined => (isLocaleImporter(source) ? undefined : source);
