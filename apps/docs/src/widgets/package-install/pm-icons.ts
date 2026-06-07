import { type Child, span } from '@echojs-ecosystem/framework/hyperdom'

import type { PackageManagerId } from '@widgets/package-install/constants/install-commands.js'

/** Package manager marks for install tabs. */
export const PackageManagerIcon = (id: PackageManagerId): Child => {
  switch (id) {
    case 'npm':
      return span({ class: 'inline-flex', 'aria-hidden': 'true' }, [
        span(
          {
            class:
              'flex h-[18px] w-[18px] items-center justify-center rounded-[3px] bg-[#cb3837] text-[8px] font-bold leading-none text-white',
          },
          'npm'
        ),
      ])
    case 'yarn':
      return span({ class: 'inline-flex', 'aria-hidden': 'true' }, [
        span(
          {
            class:
              'flex h-[18px] w-[18px] items-center justify-center rounded-[3px] bg-[#2c8ebb] text-[10px] font-bold leading-none text-white',
          },
          'Y'
        ),
      ])
    case 'pnpm':
      return span({ class: 'inline-flex', 'aria-hidden': 'true' }, [
        span(
          {
            class:
              'flex h-[18px] w-[18px] items-center justify-center rounded-[3px] bg-[#f9ad00] text-[7px] font-extrabold leading-none text-stone-950',
          },
          'pnpm'
        ),
      ])
    case 'bun':
      return span({ class: 'inline-flex', 'aria-hidden': 'true' }, [
        span(
          {
            class:
              'flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#3b2e2a] text-[9px] font-bold leading-none text-[#fbf0df]',
          },
          'bun'
        ),
      ])
    case 'deno':
      return span({ class: 'inline-flex', 'aria-hidden': 'true' }, [
        span(
          {
            class:
              'flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#70ffaf] text-[10px] font-bold leading-none text-[#232323]',
          },
          'd'
        ),
      ])
  }
}
