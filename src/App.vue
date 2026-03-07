<script setup lang="ts">
import { watch } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore } from '@/stores'
import { elementPlusLocales, setDayjsLocale } from '@/locale'

const localeStore = useLocaleStore()

watch(
  () => localeStore.locale,
  (locale) => {
    setDayjsLocale(locale)
  },
  { immediate: true }
)
</script>

<template>
  <el-config-provider :locale="elementPlusLocales[localeStore.locale]">
    <router-view />
  </el-config-provider>
</template>
