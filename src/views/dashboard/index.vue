<script setup lang="ts">
import { useUserStore } from '@/stores'
import { ROUTE_NAME } from '@/router/constants'

defineOptions({ name: ROUTE_NAME.DASHBOARD })

const userStore = useUserStore()
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-welcome">
      <h1>欢迎回来，{{ userStore.userInfo?.nickname || userStore.userInfo?.username || '用户' }}</h1>
      <p>Monitor System 前端监控系统</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 24px 0;
}

.dashboard-welcome h1 {
  font-size: 24px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 8px;
}

.dashboard-welcome p {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}
</style>
