/**
 * Store 共享类型定义
 */

export type LocaleType = 'zh-cn' | 'en'

export interface UserInfo {
  id: string
  name: string
  avatar?: string
  [key: string]: unknown
}
