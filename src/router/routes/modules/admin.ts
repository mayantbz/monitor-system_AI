/**
 * 后台管理路由
 * 行为监控、错误监控等
 */

import type { AppRouteRecordRaw } from '@/router/types'
import { ROUTE_NAME, ROUTE_PATH } from '@/router/constants'

const adminRoutes: AppRouteRecordRaw[] = [
  {
    path: ROUTE_PATH.ADMIN_BEHAVIORS,
    name: ROUTE_NAME.ADMIN_BEHAVIORS,
    component: () => import('@/views/admin/behaviors/index.vue'),
    meta: {
      title: '行为监控',
      icon: 'Monitor',
      keepAlive: true,
    },
  },
  {
    path: ROUTE_PATH.ADMIN_ERRORS,
    name: ROUTE_NAME.ADMIN_ERRORS,
    component: () => import('@/views/admin/errors/index.vue'),
    meta: {
      title: '错误监控',
      icon: 'WarningFilled',
      keepAlive: true,
    },
  },
]

export default adminRoutes
