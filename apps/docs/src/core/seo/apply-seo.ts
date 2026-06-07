const SITE_ORIGIN = 'https://echojs.dev'

const setMeta = (
  name: string,
  content: string,
  attr: 'name' | 'property' = 'name'
): void => {
  let el = document.querySelector(
    `meta[${attr}="${name}"]`
  ) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}

const setLink = (rel: string, href: string): void => {
  let el = document.querySelector(
    `link[rel="${rel}"]`
  ) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export type SeoOptions = {
  title: string
  description?: string
  path?: string
  noindex?: boolean
}

export const applySeo = (options: SeoOptions): void => {
  const title = options.title.includes('EchoJS')
    ? options.title
    : `${options.title} · EchoJS`
  const description =
    options.description ??
    'Official EchoJS documentation — signal-first framework for scalable web applications.'
  const path = options.path ?? window.location.pathname
  const url = `${SITE_ORIGIN}${path}`

  document.title = title
  setMeta('description', description)
  setMeta('og:title', title, 'property')
  setMeta('og:description', description, 'property')
  setMeta('og:url', url, 'property')
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', title)
  setMeta('twitter:description', description)
  setLink('canonical', url)
  setMeta('robots', options.noindex ? 'noindex, nofollow' : 'index, follow')
}
