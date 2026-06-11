import { effect, signal, untrack } from '@echojs-ecosystem/framework/reactivity'

import { appRouter } from '@app/router/router'
import { packageIdFromPathname } from '@core/content/package-nav'

export type SidebarDrillFrame =
  | { type: 'root' }
  | { type: 'package'; packageId: string }

const initialStack = (): SidebarDrillFrame[] => [{ type: 'root' }]

export const $sidebarDrillStack = signal<SidebarDrillFrame[]>(initialStack())

/** When false, user chose root while still on a package doc — do not auto-drill. */
const $drillFollowRoute = signal(true)

let sidebarNavEl: HTMLElement | null = null

export const bindSidebarNavEl = (el: HTMLElement | null): void => {
  sidebarNavEl = el
}

const scrollSidebarToTop = (): void => {
  sidebarNavEl?.scrollTo({ top: 0, behavior: 'instant' })
}

export const sidebarDrillFrameKey = (): string => {
  const frame = $sidebarDrillStack.value().at(-1)
  if (!frame) return 'root'
  return frame.type === 'root' ? 'root' : `package:${frame.packageId}`
}

export const sidebarDrillBack = (): void => {
  const stack = $sidebarDrillStack.value()
  if (stack.length <= 1) return
  $sidebarDrillStack.set(stack.slice(0, -1))
  scrollSidebarToTop()
  if (packageIdFromPathname(appRouter.$path.value())) {
    $drillFollowRoute.set(false)
  }
}

/** Open package drill menu without leaving the current doc. */
export const sidebarDrillOpenPackage = (packageId: string): void => {
  $drillFollowRoute.set(true)
  $sidebarDrillStack.set([{ type: 'root' }, { type: 'package', packageId }])
  scrollSidebarToTop()
}

/** Keep sidebar at root when navigating to a package overview page. */
export const sidebarPreparePackageOverviewNav = (): void => {
  $drillFollowRoute.set(false)
  $sidebarDrillStack.set(initialStack())
}

let routeSyncStarted = false

/** Register route sync once — call from sidebar render, not at module load. */
export const ensureSidebarDrillRouteSync = (): void => {
  if (routeSyncStarted) return
  routeSyncStarted = true
  effect(() => {
    const pkgId = packageIdFromPathname(appRouter.$path.value())

    // Only react to route changes — stack reads must not re-trigger this effect.
    untrack(() => {
      if (!pkgId) {
        $drillFollowRoute.set(true)
        if ($sidebarDrillStack.value().length > 1) {
          $sidebarDrillStack.set(initialStack())
          scrollSidebarToTop()
        }
        return
      }

      const stack = $sidebarDrillStack.value()
      const openPkg = stack.find(
        (frame): frame is Extract<SidebarDrillFrame, { type: 'package' }> =>
          frame.type === 'package'
      )
      if (openPkg?.packageId !== pkgId) {
        $drillFollowRoute.set(true)
      }
      if ($drillFollowRoute.value()) {
        const wasDifferent =
          openPkg?.packageId !== pkgId || stack.length === 1
        $sidebarDrillStack.set([
          { type: 'root' },
          { type: 'package', packageId: pkgId },
        ])
        if (wasDifferent) scrollSidebarToTop()
      }
    })
  })
}
