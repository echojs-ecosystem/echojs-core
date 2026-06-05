/**
 * Reserved extension points (not implemented yet).
 * - playground: implemented via `:::playground` + `widgets/package-playground`
 * - liveExamples: hot-reload demo iframes
 * - apiSearch: fuzzy index over exported symbols per package
 * - versioning: /v1/docs/... route prefix + version switcher
 * - i18n: locale-prefixed content paths (/en/docs, /ru/docs)
 */
export type DocsFutureFeature =
  | "playground"
  | "liveExamples"
  | "apiSearch"
  | "versioning"
  | "i18n";

export const DOCS_FUTURE_FEATURES: DocsFutureFeature[] = [
  "liveExamples",
  "apiSearch",
  "versioning",
  "i18n",
];
