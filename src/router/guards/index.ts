/**
 * 路由守卫
 * 权限校验、白名单、登录态检查、国际化标题
 */

import type { Router } from 'vue-router'
import { useUserStore } from '@/stores'
import { ROUTE_PATH, WHITELIST_PATHS } from '@/router/constants'
import { ROUTE_PERMISSIONS } from '@/constants/permission'

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore()

    // 设置页面标题（使用 i18n）
    const titleKey = to.meta?.title as string | undefined
    const { getDocumentTitle } = await import('@/locale/documentTitle')
    document.title = getDocumentTitle(titleKey)

    // 白名单：无需登录
    if (WHITELIST_PATHS.includes(to.path)) {
      // 已登录用户访问登录页时重定向到首页
      if (to.path === ROUTE_PATH.LOGIN && userStore.isLoggedIn) {
        next({ path: ROUTE_PATH.ROOT, replace: true })
      } else {
        next()
      }
      return
    }

    // 需要登录
    if (!userStore.isLoggedIn) {
      next({
        path: ROUTE_PATH.LOGIN,
        query: { redirect: to.fullPath },
        replace: true,
      })
      return
    }

    // 角色校验（meta.roles）
    const roles = to.meta?.roles as string[] | undefined
    if (roles?.length) {
      const userRoles = userStore.userInfo?.roles ?? []
      const hasRole = roles.some((role) => userRoles.includes(role))
      if (!hasRole) {
        next({ path: ROUTE_PATH.NOT_FOUND, replace: true })
        return
      }
    }

    // 权限码校验（与后端约定：按 path 所需权限）
    const requiredPermission = ROUTE_PERMISSIONS[to.path]
    if (requiredPermission) {
      const userPermissions = userStore.userInfo?.permissions ?? []
      if (userPermissions.length > 0 && !userPermissions.includes(requiredPermission)) {
        next({ path: ROUTE_PATH.NOT_FOUND, replace: true })
        return
      }
    }

    next()
  })
}
