<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore, useUserStore } from '@/stores'
import { elementPlusLocales } from '@/locale'

const route = useRoute()
const router = useRouter()
const localeStore = useLocaleStore()
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  router.push('/login')
}

const elementLocale = computed(() => elementPlusLocales[localeStore.locale])

/** 需要缓存的页面 name 列表 */
const cachedViews = computed(() => {
  const names: string[] = []
  const addCached = (r: typeof route) => {
    if (r.meta?.keepAlive && r.name) {
      names.push(r.name as string)
    }
    r.matched.forEach((m) => {
      if (m.meta?.keepAlive && m.name) {
        names.push(m.name as string)
      }
    })
  }
  addCached(route)
  return [...new Set(names)]
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <div class="basic-layout">
      <header class="layout-header">
        <span class="layout-title">Monitor System</span>
        <div class="layout-actions">
          <el-button type="primary" link @click="localeStore.toggleLocale()">
            {{ localeStore.localeLabel }} / {{ localeStore.locale === 'zh-cn' ? 'English' : '中文' }}
          </el-button>
          <el-button type="danger" link @click="handleLogout">退出</el-button>
        </div>
      </header>
      <main class="layout-main">
        <router-view v-slot="{ Component, route: r }">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="r.fullPath" />
          </keep-alive>
        </router-view>
      </main>
    </div>
  </el-config-provider>
</template>

<style scoped>
.basic-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  backdrop-filter: blur(12px);
}

.layout-title {
  font-size: 18px;
  font-weight: 600;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.layout-main {
  flex: 1;
  padding: 24px;
  overflow: auto;
}
</style>
