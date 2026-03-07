/**
 * 路由聚合
 * 按模块导入并合并所有路由
 */

import type { AppRouteRecordRaw } from '@/router/types'
import { ROUTE_NAME, ROUTE_PATH } from '@/router/constants'

import authRoutes from './modules/auth'
import dashboardRoutes from './modules/dashboard'

/** 主布局路由 - 需要登录后访问 */
const layoutRoute: AppRouteRecordRaw = {
  path: '/',
  name: ROUTE_NAME.ROOT,
  component: () => import('@/layouts/BasicLayout.vue'),
  redirect: ROUTE_PATH.ROOT,
  children: [...dashboardRoutes],
}

/** 所有路由 */
const routes: AppRouteRecordRaw[] = [
  ...authRoutes,
  layoutRoute,
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTE_PATH.NOT_FOUND,
    name: ROUTE_NAME.REDIRECT,
    meta: { hidden: true, noBreadcrumb: true },
  },
]

export default routes
