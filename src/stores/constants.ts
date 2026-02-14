/**
 * Store 常量定义
 * 统一管理 Storage Key、默认值等
 */

export const STORAGE_KEYS = {
  /** 语言偏好 persist key */
  LOCALE: 'app-locale',
  /** 用户 store 持久化 key（含 token、userInfo） */
  USER: 'app-user',
} as const

export const DEFAULT_LOCALE = 'zh-cn' as const
