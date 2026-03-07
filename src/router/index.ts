/**
 * 路由入口
 * 创建路由实例、注册守卫
 */

import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupRouterGuards(router)

export default router
