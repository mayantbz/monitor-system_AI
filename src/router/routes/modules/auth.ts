/**
 * 认证相关路由（登录、404 等）
 * 无需登录即可访问
 */

import type { AppRouteRecordRaw } from '@/router/types'
import { ROUTE_NAME, ROUTE_PATH } from '@/router/constants'

const authRoutes: AppRouteRecordRaw[] = [
  {
    path: ROUTE_PATH.LOGIN,
    name: ROUTE_NAME.LOGIN,
    component: () => import('@/views/auth/login/index.vue'),
    meta: {
      title: 'route.login',
      hidden: true,
      keepAlive: false,
      noBreadcrumb: true,
    },
  },
  {
    path: ROUTE_PATH.NOT_FOUND,
    name: ROUTE_NAME.NOT_FOUND,
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: 'route.notFound',
      hidden: true,
      keepAlive: false,
      noBreadcrumb: true,
    },
  },
]

export default authRoutes
