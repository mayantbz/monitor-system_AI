/**
 * 仪表盘/首页路由
 */

import type { AppRouteRecordRaw } from '@/router/types'
import { ROUTE_NAME, ROUTE_PATH } from '@/router/constants'

const dashboardRoutes: AppRouteRecordRaw[] = [
  {
    path: ROUTE_PATH.ROOT,
    name: ROUTE_NAME.DASHBOARD,
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: 'route.dashboard',
      icon: 'HomeFilled',
      keepAlive: true,
      affix: true,
    },
  },
]

export default dashboardRoutes
