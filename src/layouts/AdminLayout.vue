<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { Monitor, WarningFilled, Close } from '@element-plus/icons-vue'
import { useLocaleStore, useTabsStore, useUserStore } from '@/stores'
import { elementPlusLocales } from '@/locale'
import { ROUTE_PATH } from '@/router/constants'

const route = useRoute()
const router = useRouter()
const localeStore = useLocaleStore()
const tabsStore = useTabsStore()
const userStore = useUserStore()

const adminMenus = [
  { path: ROUTE_PATH.ADMIN_BEHAVIORS, title: '行为监控', icon: Monitor },
  { path: ROUTE_PATH.ADMIN_ERRORS, title: '错误监控', icon: WarningFilled },
]

const elementLocale = computed(() => elementPlusLocales[localeStore.locale])

// 根据当前路由同步 Tab
watch(
  () => ({ path: route.path, name: route.name, meta: route.meta }),
  (to) => {
    if (to.path.startsWith(ROUTE_PATH.ADMIN) && to.path !== ROUTE_PATH.ADMIN && to.name && to.meta?.title) {
      tabsStore.addTab({
        path: to.path,
        title: (to.meta.title as string) || String(to.name),
        name: String(to.name),
      })
    }
  },
  { immediate: true }
)

// 面包屑：从 matched 生成，排除 noBreadcrumb
const breadcrumbs = computed(() => {
  return route.matched
    .filter((r) => r.meta?.title && !r.meta?.noBreadcrumb)
    .map((r) => ({ path: r.path, title: r.meta!.title as string }))
})

function handleMenuSelect(path: string) {
  router.push(path)
}

function handleTabClick(path: string) {
  tabsStore.setActive(path)
  router.push(path)
}

function handleTabClose(path: string) {
  const nextPath = tabsStore.removeTab(path)
  if (route.path === path) {
    router.push(nextPath || ROUTE_PATH.ADMIN_BEHAVIORS)
  }
}

function goHome() {
  router.push(ROUTE_PATH.ROOT)
}

function handleLogout() {
  userStore.logout()
  tabsStore.clearTabs()
  router.push('/login')
}

const cachedViews = computed(() => {
  return (route.matched
    .filter((r) => r.meta?.keepAlive && r.name)
    .map((r) => r.name as string) || []) as string[]
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <div class="admin-layout">
      <header class="admin-header">
        <div class="header-left">
          <span class="logo">前端监控 · 管理后台</span>
          <el-button type="primary" link @click="goHome">返回首页</el-button>
        </div>
        <div class="header-right">
          <el-button type="primary" link @click="localeStore.toggleLocale()">
            {{ localeStore.locale === 'zh-cn' ? 'English' : '中文' }}
          </el-button>
          <el-button type="danger" link @click="handleLogout">退出</el-button>
        </div>
      </header>
      <div class="admin-body">
        <aside class="admin-sidebar">
          <el-menu
            :default-active="route.path"
            :router="false"
            @select="handleMenuSelect"
          >
            <el-menu-item
              v-for="item in adminMenus"
              :key="item.path"
              :index="item.path"
            >
              <el-icon><component :is="item.icon" /></el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </el-menu>
        </aside>
        <div class="admin-main">
          <div class="admin-tabs" v-if="tabsStore.tabs.length">
            <div class="tabs-list">
              <div
                v-for="tab in tabsStore.tabs"
                :key="tab.path"
                class="tab-item"
                :class="{ active: tabsStore.activePath === tab.path }"
                @click="handleTabClick(tab.path)"
              >
                <span>{{ tab.title }}</span>
                <el-icon
                  v-if="tabsStore.tabs.length > 1"
                  class="tab-close"
                  @click.stop="handleTabClose(tab.path)"
                >
                  <Close />
                </el-icon>
              </div>
            </div>
          </div>
          <div class="admin-breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: ROUTE_PATH.ADMIN }">后台</el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(crumb, i) in breadcrumbs"
                :key="crumb.path"
                :to="i < breadcrumbs.length - 1 ? { path: crumb.path } : undefined"
              >
                {{ crumb.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="admin-content">
            <router-view v-slot="{ Component, route: r }">
              <keep-alive :include="['AdminBehaviors', 'AdminErrors']">
                <component :is="Component" :key="r.fullPath" />
              </keep-alive>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.admin-header {
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #001529;
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-right :deep(.el-button) {
  color: rgba(255, 255, 255, 0.85);
}
.header-right :deep(.el-button:hover) {
  color: #fff;
}

.admin-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.admin-sidebar {
  width: 220px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
}

.admin-sidebar :deep(.el-menu) {
  border-right: none;
}
.admin-sidebar :deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #f0f2f5;
}

.admin-tabs {
  background: #fff;
  padding: 0 16px;
  border-bottom: 1px solid #e8e8e8;
}

.tabs-list {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.tab-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  margin-top: 8px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
}

.tab-item:hover {
  color: #1890ff;
  background: #e6f7ff;
}

.tab-item.active {
  color: #1890ff;
  background: #e6f7ff;
  font-weight: 500;
}

.tab-close {
  font-size: 12px;
  opacity: 0.6;
}
.tab-close:hover {
  opacity: 1;
  color: #f5222d;
}

.admin-breadcrumb {
  padding: 12px 24px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.admin-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
  background: #fff;
  margin: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}
</style>
