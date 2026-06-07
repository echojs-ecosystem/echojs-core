import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: (string | undefined | false | null)[]): string =>
  twMerge(inputs.filter(Boolean).join(' '))
