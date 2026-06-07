/** Brand marks for comparison sidebar links (24×24, fill-based). */
const brandWrap = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-full" aria-hidden="true">${body}</svg>`

export const FRAMEWORK_NAV_ICON_SVGS = {
  'fw-react': brandWrap(
    [
      '<circle cx="12" cy="12" r="2.2" fill="currentColor"/>',
      '<g fill="none" stroke="currentColor" stroke-width="1.35">',
      '<ellipse cx="12" cy="12" rx="9.5" ry="3.6"/>',
      '<ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)"/>',
      '<ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(120 12 12)"/>',
      '</g>',
    ].join('')
  ),
  'fw-vue': brandWrap(
    '<path fill="currentColor" d="M12.1 3 3.2 19.2h3.3l1.5-2.6L12 8.4l5 8.2 1.5 2.6h3.3L12.1 3zm-1 11.2-2.2 3.8h-2.9l5.1-8.8 5.1 8.8h-2.9l-2.2-3.8z"/>'
  ),
  'fw-angular': brandWrap(
    '<path fill="currentColor" d="M12 2.2 4.5 4.8 2 18.5l10 5.3 10-5.3-2.5-13.7L12 2.2zm0 2.4 6.2 1.7 1.9 10.5L12 18.6 5.9 17.3 7.8 6.3 12 4.6zm-1.1 4.5h2.2l.3 4.2 2.4-4.2h2.1L12.6 16h-1.3l1.3-7.9z"/>'
  ),
  'fw-solid': brandWrap(
    '<path fill="currentColor" d="M12 2.5c-2.2 0-4 .9-5.2 2.4L12 12l6.5-5.6C17.3 4.8 14.7 2.5 12 2.5zm-7 4.2C3.8 8.6 3 10.2 3 12s.8 3.4 2 5.3L12 12 5 6.7zm14 0L12 12l7 5.3c1.2-1.9 2-3.7 2-5.3s-.8-3.4-2-5.3zM12 21.5c2.2 0 4-.9 5.2-2.4L12 12l-6.5 5.6c1.3 1.7 3.9 3.9 6.5 3.9z"/>'
  ),
  'fw-svelte': brandWrap(
    '<path fill="currentColor" d="M14.8 20.5c-1.9 1.5-4.4 1.6-6.5.2-2.4-1.6-3.1-4.5-2.2-7l.6-1.8c.3-.9.1-1.9-.6-2.5-.9-.7-2.1-.8-3.1-.2l1.1 1.7c.4.6 1.1.7 1.7.4.6-.4.8-1.1.5-1.7l-.9-1.4c2.1-1.2 4.8-.9 6.6 1 2.4 1.9 2.9 5.1 1.4 7.6l-.7 1.1c-.5.8-.3 1.9.5 2.5.8.6 1.9.5 2.6-.2l-1.2-1.5c-.5-.6-1.3-.7-1.9-.3-.6.4-.8 1.2-.4 1.8l.8 1.1z"/>'
  ),
} as const

export type FrameworkNavIconId = keyof typeof FRAMEWORK_NAV_ICON_SVGS
