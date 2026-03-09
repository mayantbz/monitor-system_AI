/**
 * 权限 composable
 * 用于菜单、按钮、路由的权限判断
 */

import { computed } from 'vue'
import { useUserStore } from '@/stores'
import type { PermissionCode } from '@/constants/permission'
import { ADMIN_ENTRY_PERMISSIONS } from '@/constants/permission'

export function usePermission() {
  const userStore = useUserStore()

  const permissions = computed(() => userStore.userInfo?.permissions ?? [])

  function hasPermission(code: PermissionCode | string): boolean {
    const list = userStore.userInfo?.permissions ?? []
    if (list.length === 0) return true
    return list.includes(code)
  }

  function hasAnyPermission(codes: PermissionCode[]): boolean {
    if (codes.length === 0) return true
    return codes.some((code) => hasPermission(code))
  }

  const canEnterAdmin = computed(() => hasAnyPermission(ADMIN_ENTRY_PERMISSIONS))

  return { permissions, hasPermission, hasAnyPermission, canEnterAdmin }
}
