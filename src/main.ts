import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { i18n, storeLocaleToI18n, setDayjsLocale } from './locale'
import { useLocaleStore } from './stores'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(i18n)

const localeStore = useLocaleStore()
const nextLocale = storeLocaleToI18n(localeStore.locale)
const g = i18n.global as { locale: { value: string } | string }
if (typeof g.locale === 'object' && g.locale && 'value' in g.locale) {
  g.locale.value = nextLocale
} else {
  ;(i18n.global as { locale: string }).locale = nextLocale
}
document.documentElement.lang = localeStore.locale === 'zh-cn' ? 'zh-CN' : 'en'
setDayjsLocale(localeStore.locale)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
