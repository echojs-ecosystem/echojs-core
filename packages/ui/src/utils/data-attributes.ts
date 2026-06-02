export type DataAttributeProps = Record<`data-${string}`, string | number | boolean | undefined>;

/** `data-state` helper for styling hooks. */
export const dataState = (value: string): DataAttributeProps => ({
  "data-state": value,
});

/** `data-disabled` — present when disabled. */
export const dataDisabled = (disabled?: boolean): DataAttributeProps =>
  disabled ? { "data-disabled": "" } : {};

/** `data-invalid` — present when invalid. */
export const dataInvalid = (invalid?: boolean): DataAttributeProps =>
  invalid ? { "data-invalid": "" } : {};

/** `data-pending` — present while async action is in progress (HeroUI-style). */
export const dataPending = (pending?: boolean): DataAttributeProps =>
  pending ? { "data-pending": "" } : {};
