/**
 * 路由守卫
 * 权限校验、白名单、登录态检查
 */

import type { Router } from 'vue-router'
import { useUserStore } from '@/stores'
import { ROUTE_PATH, WHITELIST_PATHS } from '@/router/constants'

const TITLE_SUFFIX = ' | Monitor System'

export function setupRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    const userStore = useUserStore()

    // 设置页面标题
    const title = to.meta?.title as string | undefined
    if (title) {
      document.title = `${title}${TITLE_SUFFIX}`
    } else {
      document.title = `Monitor System${TITLE_SUFFIX}`
    }

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

    // 权限校验（可选：按 roles 扩展）
    const roles = to.meta?.roles as string[] | undefined
    if (roles?.length) {
      const userRoles = userStore.userInfo?.roles ?? []
      const hasPermission = roles.some((role) => userRoles.includes(role))
      if (!hasPermission) {
        next({ path: ROUTE_PATH.NOT_FOUND, replace: true })
        return
      }
    }

    next()
  })
}
