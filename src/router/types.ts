/**
 * 路由类型定义
 * 扩展 vue-router 的 RouteMeta
 */

import type { RouteRecordRaw } from 'vue-router'

/** 路由元信息扩展 */
export interface RouteMetaConfig {
  /** 页面标题（用于面包屑、标签页、document.title） */
  title?: string
  /** 是否在侧边栏隐藏 */
  hidden?: boolean
  /** 图标 */
  icon?: string
  /** 是否缓存该页面（配合 keep-alive） */
  keepAlive?: boolean
  /** 所需权限/角色，空数组表示无需权限 */
  roles?: string[]
  /** 是否固定在标签栏 */
  affix?: boolean
  /** 激活的菜单路径（用于高亮） */
  activeMenu?: string
  /** 是否不显示在面包屑 */
  noBreadcrumb?: boolean
}

declare module 'vue-router' {
  interface RouteMeta extends RouteMetaConfig {}
}

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: RouteMetaConfig
  children?: AppRouteRecordRaw[]
}
