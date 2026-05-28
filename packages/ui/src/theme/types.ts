/** Global UI theme configuration. */
export type UITheme = {
  /** Prefix for generated ids (e.g. `echo`). */
  prefix?: string;

  /** When true, components skip visual classes globally. */
  headless?: boolean;

  /** Per-component theme overrides. */
  components?: Record<string, ComponentThemeConfig>;
};

/** Theme slice for a single component kind (e.g. `button`). */
export type ComponentThemeConfig = {
  baseClass?: string;
  className?: string;
  defaultProps?: Record<string, unknown>;
  defaultVariants?: Record<string, string | boolean>;
  variants?: Record<string, unknown>;
};
