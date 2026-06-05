import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { span } from "@echojs-ecosystem/framework/hyperdom";

const searchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;

export const SearchIcon = (): Child =>
  span({ class: "inline-flex h-5 w-5 shrink-0", ".innerHTML": searchSvg });
