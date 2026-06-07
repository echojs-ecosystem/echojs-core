import { type Child, span } from '@echojs-ecosystem/framework/hyperdom'

const menuSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>`

export const MenuIcon = (): Child =>
  span({ class: 'inline-flex h-5 w-5 shrink-0', '.innerHTML': menuSvg })
