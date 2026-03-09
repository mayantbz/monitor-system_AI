/**
 * Store 共享类型定义
 */

export type LocaleType = 'zh-cn' | 'en'

/** 用户信息 */
export interface UserInfo {
  username: string
  nickname?: string
  avatar?: string
  roles?: string[]
  /** 权限码列表，与后端约定 */
  permissions?: string[]
}

