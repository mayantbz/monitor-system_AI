/**
 * 统一 HTTP 请求
 * 自动附加语言参数，与后端约定：接口根据语言返回对应文案
 */

import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { useLocaleStore } from '@/stores'
import { storeLocaleToI18n } from '@/locale'

/** 与后端约定的语言传参方式：Header + Query 双写，后端取其一即可 */
const LOCALE_HEADER = 'X-Locale'
const LOCALE_QUERY_KEY = 'lang'

function getLocaleForRequest(): string {
  try {
    const store = useLocaleStore()
    return storeLocaleToI18n(store.locale)
  } catch {
    return 'zh-CN'
  }
}

function injectLocale(config: InternalAxiosRequestConfig) {
  const locale = getLocaleForRequest()
  config.headers.set(LOCALE_HEADER, locale)
  config.headers.set('Accept-Language', locale)
  if (!config.params) config.params = {}
  config.params[LOCALE_QUERY_KEY] = locale
  return config
}

export const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 15000,
})

request.interceptors.request.use(injectLocale, (err) => Promise.reject(err))

request.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
)

export default request
