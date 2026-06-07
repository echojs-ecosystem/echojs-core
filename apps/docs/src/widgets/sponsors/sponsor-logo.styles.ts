import { tv } from 'tailwind-variants'

export const sponsorLogoStyles = tv({
  slots: {
    root: 'inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-md ring-2 ring-white/10 transition duration-300 group-hover:scale-105 group-hover:ring-white/20',
    label: 'sr-only',
  },
  variants: {
    size: {
      gold: {
        root: 'h-16 w-16 text-base sm:h-[4.5rem] sm:w-[4.5rem] sm:text-lg',
      },
      silver: { root: 'h-11 w-11 text-xs sm:h-12 sm:w-12 sm:text-sm' },
      bronze: { root: 'h-9 w-9 text-[10px] sm:h-10 sm:w-10' },
    },
  },
  defaultVariants: { size: 'silver' },
})
