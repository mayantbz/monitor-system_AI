/**
 * 根据 i18n 生成 document.title，供路由守卫等非组件环境使用
 */
import { i18n } from './i18n'

export function getDocumentTitle(titleKey?: string): string {
  // vue-i18n 类型实例过深，用 any 规避 TS2589
  const g = (i18n as unknown as { global: { t: (k: string) => string } }).global
  const appName = g.t('app.name')
  return titleKey ? `${g.t(titleKey)} | ${appName}` : appName
}
