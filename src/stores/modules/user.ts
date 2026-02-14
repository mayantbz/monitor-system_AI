/**
 * 用户状态
 * 使用 pinia-plugin-persistedstate 持久化 token、userInfo
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { UserInfo } from '@/stores/types'
import { STORAGE_KEYS } from '@/stores/constants'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string | null>(null)
    const userInfo = ref<UserInfo | null>(null)

    const isLoggedIn = computed(() => !!token.value)

    function setToken(newToken: string | null) {
      token.value = newToken
    }

    function setUserInfo(info: UserInfo | null) {
      userInfo.value = info
    }

    function logout() {
      token.value = null
      userInfo.value = null
    }

    return {
      token,
      userInfo,
      isLoggedIn,
      setToken,
      setUserInfo,
      logout,
    }
  },
  {
    persist: {
      key: STORAGE_KEYS.USER,
      pick: ['token', 'userInfo'],
    },
  }
)
