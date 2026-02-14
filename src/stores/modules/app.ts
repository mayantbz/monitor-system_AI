/**
 * 应用级 UI 状态
 * 侧边栏、加载状态、主题等全局 UI 配置
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const loading = ref(false)

  const isSidebarCollapsed = computed(() => sidebarCollapsed.value)

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setLoading(loadingState: boolean) {
    loading.value = loadingState
  }

  return {
    sidebarCollapsed,
    loading,
    isSidebarCollapsed,
    toggleSidebar,
    setLoading,
  }
})
