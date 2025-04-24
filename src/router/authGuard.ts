import { type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { type Router } from 'vue-router'

export const requireAuth = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  if (!authStore.account) {
    await authStore.initialize()
  }

  const isAuthenticated = authStore.isAuthenticated

  const requiredRoles = to.meta.requiredRoles as string[] | undefined
  let hasRequiredRoles = true

  if (requiredRoles && requiredRoles.length > 0) {
    hasRequiredRoles = requiredRoles.some((role) => authStore.hasRole(role))
  }

  if (isAuthenticated && hasRequiredRoles) {
    next()
  } else if (isAuthenticated && !hasRequiredRoles) {
    next({ name: 'unauthorized', query: { returnUrl: to.fullPath } })
  } else {
    next({ name: 'home', query: { returnUrl: to.fullPath } })
  }
}

export const requireNoAuth = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  await authStore.initialize()
  await authStore.handleRedirectCallback()

  if (authStore.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
}

export const setupAuthGuards = (router: Router) => {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      if (to.meta.requiresAuth) {
        await requireAuth(to, from, next)
      } else if (to.meta.requiresNoAuth) {
        await requireNoAuth(to, from, next)
      } else {
        next()
      }
    },
  )
}
