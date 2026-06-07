export type CalloutVariant =
  | 'note'
  | 'info'
  | 'tip'
  | 'recommendation'
  | 'warning'
  | 'danger'
  | 'important'

const ALIASES: Record<string, CalloutVariant> = {
  note: 'note',
  info: 'info',
  tip: 'tip',
  recommendation: 'recommendation',
  recommended: 'recommendation',
  warn: 'warning',
  warning: 'warning',
  caution: 'warning',
  danger: 'danger',
  error: 'danger',
  important: 'important',
}

export const normalizeCalloutVariant = (raw: string): CalloutVariant =>
  ALIASES[raw.toLowerCase()] ?? 'note'

export const calloutDefaultTitle: Record<CalloutVariant, string> = {
  note: 'Note',
  info: 'Info',
  tip: 'Tip',
  recommendation: 'Recommendation',
  warning: 'Warning',
  danger: 'Danger',
  important: 'Important',
}

export const calloutIcon: Record<CalloutVariant, string> = {
  note: 'ℹ',
  info: 'i',
  tip: '✦',
  recommendation: '★',
  warning: '⚠',
  danger: '✕',
  important: '!',
}
