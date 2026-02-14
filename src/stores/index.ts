/**
 * Store 统一入口
 *
 * 使用方式:
 * import { useLocaleStore } from '@/stores'
 * import { useLocaleStore } from '@/stores/modules'
 */

export * from './types'
export * from './constants'
export { persist } from './utils/persist'
export { useAppStore, useLocaleStore, useUserStore } from './modules'
