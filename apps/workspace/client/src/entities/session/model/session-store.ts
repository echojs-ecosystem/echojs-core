import { getQueryProvider } from '@echojs-ecosystem/query'
import { computed, effect, signal } from '@echojs-ecosystem/reactivity'
import { createStore } from '@echojs-ecosystem/store'
import { withLocalStorage } from '@echojs-ecosystem/persist'

export type WorkspaceRole = 'admin' | 'manager' | 'viewer'

export type SessionUser = {
  id: string
  email: string
  name: string
  role: WorkspaceRole
}

export const sessionStore = createStore<SessionUser | null>(null, { name: 'workspace-session' }).extend(
  withLocalStorage({ key: 'echojs-workspace-session' }),
)

export const $isLoggedIn = computed(() => sessionStore.value() != null)

export const $currentRole = signal<WorkspaceRole>(sessionStore.value()?.role ?? 'viewer')

export const $sessionUser = computed(() => sessionStore.value())

export const mockLogin = (input: { email: string; password: string; name?: string }): void => {
  const email = input.email.trim()
  sessionStore.set({
    id: `user-${email}`,
    email,
    name: input.name?.trim() || email.split('@')[0] || 'User',
    role: 'manager',
  })
  $currentRole.set('manager')
}

export const logout = (): void => {
  sessionStore.set(null)
  $currentRole.set('viewer')
}

export const setWorkspaceRole = (role: WorkspaceRole): void => {
  $currentRole.set(role)
  const user = sessionStore.value()
  if (user) {
    sessionStore.set({ ...user, role })
  }

  const queryClient = getQueryProvider()
  void queryClient?.invalidateQueries(['workspace', 'bootstrap'])
  void queryClient?.invalidateQueries(['workspace', 'dashboard-stats'])
}

effect(() => {
  const user = sessionStore.value()
  if (user && user.role !== $currentRole.peek()) {
    $currentRole.set(user.role)
  }
})
