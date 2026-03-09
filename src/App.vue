<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore } from '@/stores'
import { elementPlusLocales } from '@/locale'

const localeStore = useLocaleStore()
</script>

<template>
  <el-config-provider :locale="elementPlusLocales[localeStore.locale]">
    <router-view />
  </el-config-provider>
</template>
