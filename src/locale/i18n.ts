/**
 * 国际化入口
 * 与 locale store 同步：store 使用 zh-cn | en，i18n 使用 zh-CN | en
 */

import { createI18n } from 'vue-i18n'
import type { LocaleType } from '@/stores/types'
import zhCN from './langs/zh-CN'
import en from './langs/en'

export const i18nLocales: Record<LocaleType, string> = {
  'zh-cn': 'zh-CN',
  en: 'en',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    en,
  },
} as any)

/** 将 store 的 locale 转为 i18n 的 locale */
export function storeLocaleToI18n(locale: LocaleType): string {
  return i18nLocales[locale]
}
