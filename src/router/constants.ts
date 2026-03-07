/**
 * 路由常量定义
 * 统一管理路由路径、名称，避免硬编码
 */

/** 路由路径 */
export const ROUTE_PATH = {
  /** 根路径 */
  ROOT: '/',
  /** 登录页 */
  LOGIN: '/login',
  /** 404 */
  NOT_FOUND: '/404',
  /** 重定向到首页的路径（用于未知路径） */
  REDIRECT: '/redirect',
} as const

/** 路由名称 */
export const ROUTE_NAME = {
  /** 根布局 */
  ROOT: 'Root',
  /** 登录 */
  LOGIN: 'Login',
  /** 404 */
  NOT_FOUND: 'NotFound',
  /** 重定向 */
  REDIRECT: 'Redirect',
  /** 首页/仪表盘 */
  DASHBOARD: 'Dashboard',
} as const

/** 白名单路径 - 无需登录即可访问 */
export const WHITELIST_PATHS: string[] = [ROUTE_PATH.LOGIN, ROUTE_PATH.NOT_FOUND]
