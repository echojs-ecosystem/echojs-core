import type { AnyPage } from '@echojs-ecosystem/framework/router'

export type ChangelogSection = {
  title: string
  items: string[]
}

export type ChangelogRelease = {
  slug: string
  version: string
  date: string
  title: string
  summary: string
  tags: string[]
  highlights: string[]
  sections: ChangelogSection[]
  packages: string[]
}

export type ChangelogIndexProps = {
  releases: ChangelogRelease[]
  releasePage: AnyPage
}

export type ChangelogReleaseProps = {
  slug: string
  indexPage: AnyPage
}

export type ChangelogIndexVM = {
  releases: ChangelogRelease[]
  releasePage: AnyPage
}

export type ChangelogReleaseVM = {
  release: ChangelogRelease | null
  slug: string
  indexPage: AnyPage
}
