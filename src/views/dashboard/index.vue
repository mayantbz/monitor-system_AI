<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores'
import { ROUTE_NAME } from '@/router/constants'

defineOptions({ name: ROUTE_NAME.DASHBOARD })

const { t } = useI18n()
const userStore = useUserStore()

const displayName = computed(
  () => userStore.userInfo?.nickname || userStore.userInfo?.username || t('dashboard.defaultUser')
)
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-welcome">
      <h1>{{ t('dashboard.welcome', { name: displayName }) }}</h1>
      <p>{{ t('dashboard.desc') }}</p>
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
