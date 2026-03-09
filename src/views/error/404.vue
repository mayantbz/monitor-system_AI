<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">404</div>
      <h1 class="error-title">{{ t('error404.title') }}</h1>
      <p class="error-desc">{{ t('error404.desc') }}</p>
      <el-button type="primary" size="large" @click="goHome">{{ t('common.backHome') }}</el-button>
    </div>
    <div class="error-bg" />
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #0a0e1a;
}

.error-content {
  position: relative;
  text-align: center;
  z-index: 1;
}

.error-code {
  font-size: 120px;
  font-weight: 800;
  color: rgba(59, 130, 246, 0.2);
  line-height: 1;
  letter-spacing: -0.05em;
}

.error-title {
  font-size: 24px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 16px 0 8px;
}

.error-desc {
  font-size: 14px;
  color: #94a3b8;
  margin: 0 0 24px;
}

.error-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 40% at 50% 80%,
    rgba(59, 130, 246, 0.08),
    transparent
  );
  pointer-events: none;
}
</style>
