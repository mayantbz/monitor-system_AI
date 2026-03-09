<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { PERMISSION } from '@/constants/permission'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  try {
    userStore.setToken(`token-${Date.now()}`)
    userStore.setUserInfo({
      username: username.value || 'guest',
      nickname: username.value || '访客',
      permissions: Object.values(PERMISSION),
    })
    ElMessage.success(t('login.success'))
    const redirect = (route.query.redirect as string) || '/'
    await router.push(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="login-bg-gradient" />
      <div class="login-bg-grid" />
      <div class="login-bg-glow" />
    </div>

    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">{{ t('login.title') }}</h1>
        <p class="login-subtitle">{{ t('login.subtitle') }}</p>
      </div>

      <el-form class="login-form" @submit.prevent="handleLogin">
        <el-form-item>
          <el-input
            v-model="username"
            :placeholder="t('login.username')"
            size="large"
            :prefix-icon="User"
            autocomplete="username"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            :placeholder="t('login.password')"
            size="large"
            :prefix-icon="Lock"
            show-password
            autocomplete="current-password"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            {{ t('login.loginBtn') }}
          </el-button>
        </el-form-item>
      </el-form>

      <p class="login-tip">{{ t('login.tip') }}</p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  inset: 0;
  background: #0a0e1a;
}

.login-bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% -20%,
    rgba(59, 130, 246, 0.25),
    transparent
  );
}

.login-bg-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}

.login-bg-glow {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(
    ellipse,
    rgba(59, 130, 246, 0.15) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.login-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 48px 40px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.03em;
  margin: 0 0 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.login-form :deep(.el-input__wrapper) {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.15);
  box-shadow: none;
}

.login-form :deep(.el-input__wrapper:hover),
.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: rgba(59, 130, 246, 0.5);
}

.login-form :deep(.el-input__inner) {
  color: #f1f5f9;
}

.login-form :deep(.el-input__inner::placeholder) {
  color: #64748b;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
}

.login-tip {
  text-align: center;
  font-size: 12px;
  color: #64748b;
  margin: 16px 0 0;
}
</style>
