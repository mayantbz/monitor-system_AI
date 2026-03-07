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
}

