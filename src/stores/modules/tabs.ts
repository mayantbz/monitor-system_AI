/**
 * 后台管理 - 多标签页状态
 * 与路由联动，支持可关闭的 Tab
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface TabItem {
  path: string
  title: string
  name: string
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([])
  const activePath = ref('')

  const activeTab = computed(() => tabs.value.find((t) => t.path === activePath.value))

  function addTab(item: TabItem) {
    if (tabs.value.some((t) => t.path === item.path)) {
      activePath.value = item.path
      return
    }
    tabs.value.push(item)
    activePath.value = item.path
  }

  function removeTab(path: string): string | undefined {
    const idx = tabs.value.findIndex((t) => t.path === path)
    if (idx === -1) return undefined
    tabs.value.splice(idx, 1)
    if (activePath.value === path && tabs.value.length > 0) {
      const next = tabs.value[Math.min(idx, tabs.value.length - 1)]
      if (next) {
        activePath.value = next.path
        return next.path
      }
    }
    return activePath.value || undefined
  }

  function setActive(path: string) {
    if (tabs.value.some((t) => t.path === path)) {
      activePath.value = path
    }
  }

  function clearTabs() {
    tabs.value = []
    activePath.value = ''
  }

  return {
    tabs,
    activePath,
    activeTab,
    addTab,
    removeTab,
    setActive,
    clearTabs,
  }
})
