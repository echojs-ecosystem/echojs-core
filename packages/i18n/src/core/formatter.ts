export const formatNumber = (
  locale: string,
  value: number,
  options?: Intl.NumberFormatOptions,
): string => new Intl.NumberFormat(locale, options).format(value);

export const formatCurrency = (
  locale: string,
  value: number,
  currency: string,
  options?: Intl.NumberFormatOptions,
): string =>
  new Intl.NumberFormat(locale, {
    ...options,
    style: "currency",
    currency,
  }).format(value);

export const formatDate = (
  locale: string,
  value: Date,
  options?: Intl.DateTimeFormatOptions,
): string => new Intl.DateTimeFormat(locale, options).format(value);

export const formatRelativeTime = (
  locale: string,
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
): string => new Intl.RelativeTimeFormat(locale).format(value, unit);
