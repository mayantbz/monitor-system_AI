/**
 * 权限码常量
 * 与后端约定，用于菜单、按钮、路由级权限控制
 */

/** 权限码 */
export const PERMISSION = {
  /** 后台 - 行为监控 */
  ADMIN_BEHAVIORS: 'monitor:behaviors:view',
  /** 后台 - 错误监控 */
  ADMIN_ERRORS: 'monitor:errors:view',
  /** 后台 - 入口（有任一后台权限即可见「进入后台」） */
  ADMIN_ENTRY: 'monitor:admin:entry',
} as const

export type PermissionCode = (typeof PERMISSION)[keyof typeof PERMISSION]

/** 路由 path 与所需权限的映射（无则不需要权限） */
export const ROUTE_PERMISSIONS: Record<string, PermissionCode> = {
  '/admin/behaviors': PERMISSION.ADMIN_BEHAVIORS,
  '/admin/errors': PERMISSION.ADMIN_ERRORS,
}

/** 拥有任一权限即可进入后台 */
export const ADMIN_ENTRY_PERMISSIONS: PermissionCode[] = [
  PERMISSION.ADMIN_BEHAVIORS,
  PERMISSION.ADMIN_ERRORS,
]
