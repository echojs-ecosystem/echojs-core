import { code, createView, div, h1, p, section, Show } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { appPermission } from '@core/permission/index.js'
import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

import type { DashboardVM } from '../model/dashboard.model'

const layout = adminLayoutStyles()

const Stat = (
  title: Child,
  value: () => Child,
  allowed: boolean,
  loading: () => boolean,
): Child =>
  section({ class: layout.statCard() }, [
    p({ class: layout.muted() }, title),
    p({ class: layout.statValue() }, () => (loading() ? '…' : value())),
    p(
      { class: layout.muted() },
      allowed ? i18n.t('permission.allowed') : i18n.t('permission.denied'),
    ),
  ])

export const DashboardView = createView((vm: DashboardVM): Child => {
  const { stats } = vm

  return div({ class: layout.page() }, [
    h1({ class: 'text-2xl font-bold text-fg' }, () => i18n.t('dashboard.title')),
    p({ class: layout.muted() }, () => i18n.t('dashboard.lead')),
    p({ class: layout.muted() }, () =>
      stats.isFetching()
        ? 'Loading stats from Elysia…'
        : `Server time: ${stats.data()?.serverTime ?? '—'}`,
    ),
    div({ class: `${layout.statGrid()} mt-6` }, [
      Stat(
        () => i18n.t('dashboard.orders'),
        () => String(stats.data()?.openOrders ?? 0),
        appPermission.check('order.read'),
        () => stats.isPending(),
      ),
      Stat(
        () => i18n.t('dashboard.users'),
        () => String(stats.data()?.activeUsers ?? 0),
        appPermission.check('user.read'),
        () => stats.isPending(),
      ),
      Show(
        () => appPermission.check('dashboard.view'),
        () =>
          Stat(
            () => i18n.t('dashboard.revenue'),
            () => `$${(stats.data()?.revenue ?? 0).toLocaleString()}`,
            true,
            () => stats.isPending(),
          ),
      ),
    ]),
    section({ class: `${layout.card()} mt-6` }, [
      p({ class: layout.cardTitle() }, 'EchoJS stack in this demo'),
      p({ class: layout.muted() }, [
        code({ class: layout.code() }, '@echojs-ecosystem/async'),
        ' → Elysia API • ',
        code({ class: layout.code() }, '@echojs-ecosystem/permission'),
        ' • ',
        code({ class: layout.code() }, '@echojs-ecosystem/url-state'),
        ' • ',
        code({ class: layout.code() }, '@echojs-ecosystem/router'),
      ]),
    ]),
  ])
}, 'DashboardView')
